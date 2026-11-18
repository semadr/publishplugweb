import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useQueryClient, useSuspenseQuery } from "@tanstack/react-query";
import { useMemo, useState, type ReactNode } from "react";
import { z } from "zod";
import { toast } from "sonner";
import { ArrowLeft, ArrowRight, Check, Info, Loader2, Save, Sparkles } from "lucide-react";
import { AppShell } from "@/components/layout/app-shell";
import { QuoteTable } from "@/components/books/quote-table";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { bookQuery, draftFromBook, emptyDraft, saveBook, type BookDraft } from "@/lib/books";
import { GENRES, MODULE_LABELS, SOURCE_OPTIONS, TRIM_SIZES } from "@/lib/catalog";
import {
  AUDIO_ADDON,
  AUDIO_ADDON_DELIVERABLES,
  PACKAGES,
  SOURCE_SERVICE,
  TIERS,
  buildQuoteLines,
  estimatePageCount,
  formatMoney,
  formatRange,
  formatUnitPrice,
  packagePrice,
  tierPrice,
  type PackageCode,
  type Service,
  type Tier,
} from "@/lib/pricing";
import { servicesQuery } from "@/lib/queries";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/_authenticated/books/new")({
  validateSearch: z.object({ draft: z.string().uuid().optional() }),
  loaderDeps: ({ search }) => ({ draft: search.draft }),
  loader: async ({ context, deps }) => {
    await context.queryClient.ensureQueryData(servicesQuery);
    if (deps.draft) await context.queryClient.ensureQueryData(bookQuery(deps.draft));
  },
  head: () => ({
    meta: [
      { title: "New book — Publish Plug" },
      { name: "description", content: "Set up your book, choose services and get an instant quote." },
      { property: "og:title", content: "New book — Publish Plug" },
      { property: "og:description", content: "Set up your book, choose services and get an instant quote." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: NewBookPage,
});

const STEPS = ["Book details", "Starting point", "Services", "Review & quote"];
const TRANSFORM_CODES = new Set(["transform_audio", "transform_interview", "transform_monograph"]);

function NewBookPage() {
  const { draft: draftId } = Route.useSearch();
  if (draftId) return <EditDraft id={draftId} />;
  return <Wizard initial={emptyDraft()} />;
}

function EditDraft({ id }: { id: string }) {
  const { data } = useSuspenseQuery(bookQuery(id));
  if (!data.project) {
    return (
      <AppShell>
        <p className="text-muted-foreground">This book could not be found.</p>
      </AppShell>
    );
  }
  if (!["draft", "quoted"].includes(data.project.stage)) {
    return (
      <AppShell>
        <p className="text-muted-foreground">This order has been placed and can no longer be edited.</p>
        <Button variant="outline" className="mt-4" asChild>
          <Link to="/books/$bookId" params={{ bookId: id }}>Back to book</Link>
        </Button>
      </AppShell>
    );
  }
  return <Wizard id={id} initial={draftFromBook(data.project, data.orders)} />;
}

function Wizard({ id, initial }: { id?: string; initial: BookDraft }) {
  const { data: catalog } = useSuspenseQuery(servicesQuery);
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [step, setStep] = useState(0);
  const [d, setD] = useState<BookDraft>(initial);
  const [saving, setSaving] = useState<null | "draft" | "quoted">(null);

  const set = <K extends keyof BookDraft>(k: K, v: BookDraft[K]) => setD((p) => ({ ...p, [k]: v }));
  const toggleExtra = (code: string, on: boolean) =>
    setD((p) => ({ ...p, extras: on ? [...p.extras.filter((c) => c !== code), code] : p.extras.filter((c) => c !== code) }));
  const setTier = (code: string, t: Tier) => setD((p) => ({ ...p, tiers: { ...p.tiers, [code]: t } }));
  const pageCount = estimatePageCount(d.word_count);
  const needsHours = d.source_type === "audio" || d.source_type === "interview";

  const lines = useMemo(
    () =>
      buildQuoteLines({
        catalog,
        wordCount: d.word_count,
        audioHours: d.audio_hours,
        sourceType: d.source_type,
        packageCode: d.package,
        packageTier: d.packageTier,
        extras: d.extras,
        tiers: d.tiers,
        isbnCount: d.isbnCount,
        storeCount: d.storeCount,
      }),
    [catalog, d],
  );

  const stepError = (() => {
    if (step === 0 && !d.title.trim()) return "Give your book a working title.";
    if (step === 1 && needsHours && !(d.audio_hours > 0)) return "Tell us roughly how many hours of audio you have.";
    if (step === 2 && lines.length === 0) return "Choose a package or at least one service.";
    return null;
  })();

  function next() {
    if (stepError) {
      toast.error(stepError);
      return;
    }
    setStep((s) => Math.min(STEPS.length - 1, s + 1));
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  async function save(stage: "draft" | "quoted") {
    if (!d.title.trim()) {
      toast.error("Give your book a working title first.");
      setStep(0);
      return;
    }
    if (stage === "quoted" && lines.length === 0) {
      toast.error("Choose a package or at least one service.");
      setStep(2);
      return;
    }
    setSaving(stage);
    try {
      const bookId = await saveBook({ id, draft: d, lines, pageCount, stage });
      await queryClient.invalidateQueries({ queryKey: ["books"] });
      await queryClient.invalidateQueries({ queryKey: ["book", bookId] });
      toast.success(stage === "draft" ? "Draft saved" : "Your quote is ready");
      navigate({ to: "/books/$bookId", params: { bookId } });
    } catch (e) {
      toast.error(e instanceof Error ? e.message : "Could not save your book");
    } finally {
      setSaving(null);
    }
  }

  const extrasByModule = useMemo(() => {
    const auto = SOURCE_SERVICE[d.source_type];
    const g: Record<string, typeof catalog> = {};
    for (const s of catalog) {
      if (TRANSFORM_CODES.has(s.code) || s.code === auto || s.module === "P") continue;
      (g[s.module] ??= []).push(s);
    }
    return g;
  }, [catalog, d.source_type]);

  const inPackage = new Set(d.package ? PACKAGES[d.package].includes : []);
  const audioSvc = catalog.find((s) => s.code === AUDIO_ADDON);
  const autoCode = SOURCE_SERVICE[d.source_type];
  const autoSvc = catalog.find((s) => s.code === autoCode);

  return (
    <AppShell>
      <div className="mx-auto max-w-4xl">
        <Link to="/dashboard" className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground">
          <ArrowLeft className="h-4 w-4" /> My books
        </Link>
        <h1 className="mt-4 text-4xl font-medium md:text-5xl">{id ? "Edit your book" : "Let's set up your book"}</h1>

        {/* Stepper */}
        <ol className="mt-8 grid grid-cols-4 gap-2" aria-label="Steps">
          {STEPS.map((label, i) => (
            <li key={label}>
              <button
                type="button"
                onClick={() => (i < step ? setStep(i) : undefined)}
                disabled={i > step}
                aria-current={i === step ? "step" : undefined}
                className="w-full text-left disabled:cursor-default"
              >
                <span className={cn("block h-1 rounded-full", i <= step ? "bg-gradient-brand" : "bg-border")} />
                <span className={cn("mt-2 hidden text-xs font-semibold sm:block", i === step ? "text-foreground" : "text-muted-foreground")}>
                  {i + 1}. {label}
                </span>
              </button>
            </li>
          ))}
        </ol>

        <div className="mt-8 rounded-3xl border border-border bg-card p-6 shadow-soft md:p-10">
          {step === 0 && (
            <div className="space-y-8">
              <Heading title="Tell us about your book" sub="You can change any of this later." />
              <div className="grid gap-5 md:grid-cols-2">
                <Field label="Working title" htmlFor="title" className="md:col-span-2">
                  <Input id="title" value={d.title} onChange={(e) => set("title", e.target.value)} placeholder="e.g. A Calmer Mind" required />
                </Field>
                <Field label="Subtitle" htmlFor="subtitle" optional>
                  <Input id="subtitle" value={d.subtitle} onChange={(e) => set("subtitle", e.target.value)} />
                </Field>
                <Field label="Author name on the cover" htmlFor="author" optional>
                  <Input id="author" value={d.author_name} onChange={(e) => set("author_name", e.target.value)} />
                </Field>
                <Field label="Genre" htmlFor="genre">
                  <Select value={d.genre} onValueChange={(v) => set("genre", v)}>
                    <SelectTrigger id="genre"><SelectValue placeholder="Choose a genre" /></SelectTrigger>
                    <SelectContent>{GENRES.map((g) => <SelectItem key={g} value={g}>{g}</SelectItem>)}</SelectContent>
                  </Select>
                </Field>
                <Field label="Language" htmlFor="language">
                  <Input id="language" value={d.language} onChange={(e) => set("language", e.target.value)} />
                </Field>
                <Field label={d.source_type === "idea" ? "How many words should the finished book be?" : "Approximate word count"} htmlFor="words" hint={d.source_type === "idea" ? `Ghostwriting is priced per word of the finished book${pageCount ? ` · ≈ ${pageCount} printed pages` : ""}.` : pageCount ? `≈ ${pageCount} printed pages (you can adjust this later)` : "Your best estimate is fine."}>
                  <Input
                    id="words"
                    type="number"
                    min={0}
                    step={500}
                    value={Number.isFinite(d.word_count) ? d.word_count : 0}
                    onChange={(e) => set("word_count", Math.max(0, Number(e.target.value) || 0))}
                  />
                </Field>
                <Field label="Trim size" htmlFor="trim">
                  <Select value={d.trim_size} onValueChange={(v) => set("trim_size", v)}>
                    <SelectTrigger id="trim"><SelectValue /></SelectTrigger>
                    <SelectContent>{TRIM_SIZES.map((t) => <SelectItem key={t.value} value={t.value}>{t.label}</SelectItem>)}</SelectContent>
                  </Select>
                </Field>
                <Field label="Binding">
                  <Segmented value={d.binding} onChange={(v) => set("binding", v)} options={[{ value: "paperback", label: "Paperback" }, { value: "hardcover", label: "Hardcover" }]} />
                </Field>
                <Field label="Paper">
                  <Segmented value={d.paper} onChange={(v) => set("paper", v)} options={[{ value: "white", label: "White" }, { value: "cream", label: "Cream" }]} />
                </Field>
              </div>
              <div className="flex items-start justify-between gap-4 rounded-2xl bg-paper p-5">
                <div>
                  <Label htmlFor="ai" className="text-base font-semibold">AI-assisted drafting</Label>
                  <p className="mt-1 text-sm text-muted-foreground">
                    Has AI been used to draft any of the text? Some stores require you to declare it, so we note it on your publish checklist.
                  </p>
                </div>
                <Switch id="ai" checked={d.ai_assisted} onCheckedChange={(v) => set("ai_assisted", v)} />
              </div>
            </div>
          )}

          {step === 1 && (
            <div className="space-y-8">
              <Heading title="Where are you starting from?" sub="This decides which files we'll need and how we transform your material." />
              <div className="grid gap-3 sm:grid-cols-2" role="radiogroup" aria-label="Starting point">
                {SOURCE_OPTIONS.map((o) => {
                  const active = d.source_type === o.value;
                  return (
                    <button
                      key={o.value}
                      type="button"
                      role="radio"
                      aria-checked={active}
                      onClick={() => set("source_type", o.value)}
                      className={cn(
                        "relative rounded-2xl border p-5 text-left transition-all",
                        active ? "border-brand bg-accent shadow-brand" : "border-border hover:border-brand/60",
                      )}
                    >
                      {active && <Check className="absolute right-4 top-4 h-5 w-5 text-brand-deep" />}
                      <p className="font-display text-xl">{o.label}</p>
                      <p className="mt-1 text-sm text-muted-foreground">{o.blurb}</p>
                    </button>
                  );
                })}
              </div>
              <div className="flex gap-3 rounded-2xl bg-paper p-5 text-sm">
                <Info className="mt-0.5 h-4 w-4 shrink-0 text-brand-deep" />
                <p>{SOURCE_OPTIONS.find((o) => o.value === d.source_type)?.needs}</p>
              </div>
              {needsHours && (
                <Field label="Total audio length (hours)" htmlFor="hours" className="max-w-xs">
                  <Input id="hours" type="number" min={0} step={0.5} value={d.audio_hours} onChange={(e) => set("audio_hours", Math.max(0, Number(e.target.value) || 0))} />
                </Field>
              )}
              {d.source_type === "monograph" && (
                <label className="flex items-start gap-3 rounded-2xl border border-border p-5">
                  <Checkbox checked={d.rights_confirmed} onCheckedChange={(v) => set("rights_confirmed", v === true)} className="mt-0.5" />
                  <span className="text-sm">
                    <span className="font-semibold">I confirm I hold the rights to this monograph.</span>
                    <span className="block text-muted-foreground">If a university press or journal published it before, check your contract first. We can't place the order without this.</span>
                  </span>
                </label>
              )}
            </div>
          )}

          {step === 2 && (
            <div className="space-y-10">
              <Heading title="Pick a package or build your own" sub="Packages are all-in-one, with a Standard or Premium price. Add anything else on top." />

              <div className="space-y-4">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <p className="eyebrow">Packages</p>
                  {d.package && (
                    <div className="w-56">
                      <Segmented value={d.packageTier} onChange={(v) => set("packageTier", v)} options={TIERS} />
                    </div>
                  )}
                </div>
                <div className="grid gap-3 md:grid-cols-3">
                  {(Object.keys(PACKAGES) as PackageCode[]).map((code) => {
                    const active = d.package === code;
                    const svc = catalog.find((s) => s.code === PACKAGES[code].serviceCode);
                    const price = packagePrice(catalog, code, active ? d.packageTier : "standard");
                    return (
                      <button
                        key={code}
                        type="button"
                        aria-pressed={active}
                        onClick={() => set("package", code)}
                        className={cn("relative rounded-2xl border p-5 text-left transition-all", active ? "border-brand bg-accent shadow-brand" : "border-border hover:border-brand/60")}
                      >
                        {active && <Check className="absolute right-4 top-4 h-5 w-5 text-brand-deep" />}
                        <p className="font-display text-lg font-semibold">{PACKAGES[code].name}</p>
                        <p className="mt-3 font-display text-2xl font-semibold">{price == null ? "—" : formatMoney(price)}</p>
                        <p className="mt-1 text-xs text-muted-foreground">
                          {active ? `${d.packageTier === "premium" ? "Premium" : "Standard"} · ` : ""}
                          {svc ? formatRange(svc) : ""}
                        </p>
                        <ul className="mt-3 space-y-1 text-xs text-muted-foreground">
                          {PACKAGES[code].deliverables.map((x) => <li key={x}>· {x}</li>)}
                        </ul>
                      </button>
                    );
                  })}
                  <button
                    type="button"
                    aria-pressed={d.package === null}
                    onClick={() => set("package", null)}
                    className={cn("rounded-2xl border border-dashed p-5 text-left transition-all", d.package === null ? "border-brand bg-accent" : "border-border hover:border-brand/60")}
                  >
                    <p className="font-display text-lg font-semibold">No package</p>
                    <p className="mt-3 text-sm text-muted-foreground">Pick individual services below.</p>
                  </button>
                </div>

                {audioSvc && (
                  <TieredOption
                    svc={audioSvc}
                    checked={d.extras.includes(AUDIO_ADDON)}
                    tier={d.tiers[AUDIO_ADDON] ?? d.packageTier}
                    onToggle={(v) => toggleExtra(AUDIO_ADDON, v)}
                    onTier={(t) => setTier(AUDIO_ADDON, t)}
                    note={AUDIO_ADDON_DELIVERABLES.join(" · ")}
                  />
                )}
              </div>

              {autoSvc && (
                <div className="flex items-start gap-3 rounded-2xl border border-brand/40 bg-accent/60 p-5">
                  <Sparkles className="mt-0.5 h-5 w-5 shrink-0 text-brand-deep" />
                  <div className="text-sm">
                    <p className="font-semibold">{autoSvc.name} is included automatically</p>
                    <p className="text-muted-foreground">Because you're starting from {SOURCE_OPTIONS.find((o) => o.value === d.source_type)?.label.toLowerCase()}. {formatUnitPrice(autoSvc)}.</p>
                  </div>
                </div>
              )}

              <div className="space-y-8">
                {Object.entries(extrasByModule).map(([mod, services]) => (
                  <fieldset key={mod}>
                    <legend className="eyebrow">{MODULE_LABELS[mod]?.name}</legend>
                    <div className="mt-3 grid gap-2 sm:grid-cols-2">
                      {services.map((s) => {
                        const included = inPackage.has(s.code);
                        const checked = included || d.extras.includes(s.code);
                        if (s.pricing_type === "tiered" && !included) {
                          return (
                            <TieredOption
                              key={s.code}
                              svc={s}
                              checked={checked}
                              tier={d.tiers[s.code] ?? "standard"}
                              onToggle={(v) => toggleExtra(s.code, v)}
                              onTier={(t) => setTier(s.code, t)}
                            />
                          );
                        }
                        return (
                          <div key={s.code} className={cn("rounded-xl border p-4", checked ? "border-brand/60 bg-accent/40" : "border-border")}>
                            <label className="flex cursor-pointer items-start gap-3">
                              <Checkbox
                                checked={checked}
                                disabled={included}
                                onCheckedChange={(v) => toggleExtra(s.code, v === true)}
                                className="mt-0.5"
                              />
                              <span className="flex-1">
                                <span className="flex items-baseline justify-between gap-2">
                                  <span className="text-sm font-semibold">{s.name}</span>
                                  <span className="shrink-0 text-xs font-semibold text-brand-deep">{included ? "In package" : formatUnitPrice(s)}</span>
                                </span>
                                {s.description && <span className="mt-0.5 block text-xs text-muted-foreground">{s.description}</span>}
                              </span>
                            </label>
                            {!included && d.extras.includes(s.code) && s.code === "isbn_setup" && (
                              <CountInput label="Formats (print, ebook, audio)" value={d.isbnCount} max={3} onChange={(v) => set("isbnCount", v)} />
                            )}
                            {!included && d.extras.includes(s.code) && s.code === "distribution_setup" && (
                              <CountInput label="Number of stores" value={d.storeCount} max={6} onChange={(v) => set("storeCount", v)} />
                            )}
                          </div>
                        );
                      })}
                    </div>
                  </fieldset>
                ))}
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-8">
              <Heading title="Your quote" sub="Itemised from today's prices. Save it as a draft or request your quote to move forward." />
              <div className="grid gap-8 md:grid-cols-[1.4fr_1fr]">
                <QuoteTable
                  packageName={d.package ? `${PACKAGES[d.package].name} package` : null}
                  lines={lines.map((l) => ({ ...l, key: l.code }))}
                />
                <div className="space-y-5">
                  <div className="rounded-2xl bg-paper p-5 text-sm">
                    <p className="font-display text-lg">{d.title || "Untitled book"}</p>
                    {d.subtitle && <p className="text-muted-foreground">{d.subtitle}</p>}
                    <dl className="mt-4 grid grid-cols-2 gap-y-2 text-xs">
                      <dt className="text-muted-foreground">Starting point</dt><dd>{SOURCE_OPTIONS.find((o) => o.value === d.source_type)?.label}</dd>
                      <dt className="text-muted-foreground">Words</dt><dd>{d.word_count.toLocaleString()}</dd>
                      <dt className="text-muted-foreground">Pages (est.)</dt><dd>{pageCount || "—"}</dd>
                      <dt className="text-muted-foreground">Format</dt><dd className="capitalize">{d.trim_size.replace("x", " × ")} in · {d.binding}</dd>
                      <dt className="text-muted-foreground">AI-assisted</dt><dd>{d.ai_assisted ? "Yes" : "No"}</dd>
                    </dl>
                  </div>
                  <Field label="Anything we should know?" htmlFor="notes" optional>
                    <Textarea id="notes" rows={4} value={d.notes} onChange={(e) => set("notes", e.target.value)} placeholder="Deadlines, style references, audience…" />
                  </Field>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Nav */}
        <div className="mt-6 flex flex-wrap items-center justify-between gap-3">
          <Button variant="ghost" onClick={() => setStep((s) => Math.max(0, s - 1))} disabled={step === 0}>
            <ArrowLeft /> Back
          </Button>
          <div className="flex flex-wrap gap-2">
            <Button variant="outline" onClick={() => save("draft")} disabled={saving !== null}>
              {saving === "draft" ? <Loader2 className="animate-spin" /> : <Save />} Save draft
            </Button>
            {step < STEPS.length - 1 ? (
              <Button variant="brand" onClick={next}>
                Next <ArrowRight />
              </Button>
            ) : (
              <Button variant="brand" onClick={() => save("quoted")} disabled={saving !== null}>
                {saving === "quoted" && <Loader2 className="animate-spin" />} Get my quote <ArrowRight />
              </Button>
            )}
          </div>
        </div>
      </div>
    </AppShell>
  );
}

function Heading({ title, sub }: { title: string; sub: string }) {
  return (
    <div>
      <h2 className="text-3xl font-medium">{title}</h2>
      <p className="mt-1 text-muted-foreground">{sub}</p>
    </div>
  );
}

function Field({
  label,
  htmlFor,
  hint,
  optional,
  className,
  children,
}: {
  label: string;
  htmlFor?: string;
  hint?: string;
  optional?: boolean;
  className?: string;
  children: ReactNode;
}) {
  return (
    <div className={cn("space-y-1.5", className)}>
      <Label htmlFor={htmlFor} className="font-semibold">
        {label} {optional && <span className="font-normal text-muted-foreground">(optional)</span>}
      </Label>
      {children}
      {hint && <p className="text-xs text-muted-foreground">{hint}</p>}
    </div>
  );
}

function Segmented<T extends string>({ value, onChange, options }: { value: T; onChange: (v: T) => void; options: { value: T; label: string }[] }) {
  return (
    <div className="grid grid-cols-2 gap-1 rounded-lg bg-muted p-1" role="radiogroup">
      {options.map((o) => (
        <button
          key={o.value}
          type="button"
          role="radio"
          aria-checked={value === o.value}
          onClick={() => onChange(o.value)}
          className={cn("rounded-md px-3 py-1.5 text-sm font-semibold transition-all", value === o.value ? "bg-card shadow-soft" : "text-muted-foreground hover:text-foreground")}
        >
          {o.label}
        </button>
      ))}
    </div>
  );
}

function TieredOption({
  svc,
  checked,
  tier,
  onToggle,
  onTier,
  note,
}: {
  svc: Service;
  checked: boolean;
  tier: Tier;
  onToggle: (v: boolean) => void;
  onTier: (t: Tier) => void;
  note?: string;
}) {
  const price = tierPrice(svc, tier);
  return (
    <div className={cn("rounded-xl border p-4", checked ? "border-brand/60 bg-accent/40" : "border-border")}>
      <label className="flex cursor-pointer items-start gap-3">
        <Checkbox checked={checked} onCheckedChange={(v) => onToggle(v === true)} className="mt-0.5" />
        <span className="flex-1">
          <span className="flex items-baseline justify-between gap-2">
            <span className="text-sm font-semibold">{svc.name}</span>
            <span className="shrink-0 text-xs font-semibold text-brand-deep">
              {checked && price != null ? formatMoney(price) : formatUnitPrice(svc)}
            </span>
          </span>
          {svc.description && <span className="mt-0.5 block text-xs text-muted-foreground">{svc.description}</span>}
          {note && <span className="mt-0.5 block text-xs text-muted-foreground">{note}</span>}
        </span>
      </label>
      {checked && (
        <div className="mt-3 border-t border-border pt-3 pl-7">
          <Segmented value={tier} onChange={onTier} options={TIERS} />
        </div>
      )}
    </div>
  );
}

function CountInput({ label, value, max, onChange }: { label: string; value: number; max: number; onChange: (v: number) => void }) {
  return (
    <div className="mt-3 flex items-center justify-between gap-3 border-t border-border pt-3 pl-7">
      <span className="text-xs text-muted-foreground">{label}</span>
      <Input type="number" min={1} max={max} value={value} onChange={(e) => onChange(Math.min(max, Math.max(1, Number(e.target.value) || 1)))} className="h-8 w-20" aria-label={label} />
    </div>
  );
}
