import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useQueryClient, useSuspenseQuery } from "@tanstack/react-query";
import { useRef, useState } from "react";
import { toast } from "sonner";
import {
  ArrowLeft,
  CheckCircle2,
  CreditCard,
  FileUp,
  Loader2,
  Lock,
  Paperclip,
  Pencil,
  Send,
  Trash2,
} from "lucide-react";
import { AppShell } from "@/components/layout/app-shell";
import { QuoteTable } from "@/components/books/quote-table";
import { StageBadge } from "@/components/books/stage-badge";
import { StageBar } from "@/components/books/stage-bar";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { CheckoutDialog } from "@/components/books/checkout-dialog";
import { MessageThread } from "@/components/books/message-thread";
import { ProjectFiles } from "@/components/books/project-files";
import { StaffControls } from "@/components/books/staff-controls";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useIsStaff } from "@/lib/roles";
import { supabase } from "@/integrations/supabase/client";
import { bookQuery, toNum, type Project, type ProjectFile } from "@/lib/books";
import { SOURCE_OPTIONS, TRIM_SIZES } from "@/lib/catalog";
import { PACKAGES, formatMoney, quoteTotals, type PackageCode } from "@/lib/pricing";
import { stageIndex, stageInfo } from "@/lib/stages";

export const Route = createFileRoute("/_authenticated/books/$bookId")({
  loader: ({ context, params }) => context.queryClient.ensureQueryData(bookQuery(params.bookId)),
  head: () => ({
    meta: [
      { title: "Your book — Publish Plug" },
      { name: "description", content: "Quote, order and progress for your book." },
      { property: "og:title", content: "Your book — Publish Plug" },
      { property: "og:description", content: "Quote, order and progress for your book." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: BookPage,
});

function BookPage() {
  const { bookId } = Route.useParams();
  const { data } = useSuspenseQuery(bookQuery(bookId));
  const { user } = Route.useRouteContext();
  const isStaff = useIsStaff();
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const [payOpen, setPayOpen] = useState(false);
  const [busy, setBusy] = useState<string | null>(null);

  const { project, orders, files, payment } = data;
  if (!project) {
    return (
      <AppShell>
        <h1 className="text-3xl font-medium">Book not found</h1>
        <p className="mt-2 text-muted-foreground">It may have been deleted, or it belongs to another account.</p>
        <Button variant="outline" className="mt-6" asChild><Link to="/dashboard">Back to my books</Link></Button>
      </AppShell>
    );
  }

  const refresh = () =>
    Promise.all([
      queryClient.invalidateQueries({ queryKey: ["book", bookId] }),
      queryClient.invalidateQueries({ queryKey: ["books"] }),
    ]);

  const lines = orders.map((o) => ({
    key: o.id,
    name: o.services?.name ?? o.service_code,
    pricingType: o.services?.pricing_type ?? "flat",
    quantity: Number(o.quantity),
    tier: o.tier,
    unitPrice: toNum(o.unit_price),
    price: toNum(o.price),
    inPackage: o.in_package,
  }));
  const totals = quoteTotals(lines);
  const editable = project.stage === "draft" || project.stage === "quoted";
  const ordered = stageIndex(project.stage) >= stageIndex("ordered");
  const consentFiles = files.filter((f) => f.kind === "consent");

  const gates = [
    project.source_type === "monograph" && {
      ok: project.rights_confirmed,
      label: "Rights to the monograph confirmed",
    },
    project.source_type === "interview" && {
      ok: consentFiles.length > 0,
      label: "Consent form uploaded for each interviewee",
    },
    totals.pendingQuotes > 0 && {
      ok: false,
      label: "Custom quote from our team for every service",
    },
  ].filter(Boolean) as { ok: boolean; label: string }[];
  const canOrder = project.stage === "quoted" && orders.length > 0 && gates.every((g) => g.ok);

  async function updateProject(patch: Partial<Project>, key: string, success?: string) {
    setBusy(key);
    const { error } = await supabase.from("projects").update(patch).eq("id", bookId);
    setBusy(null);
    if (error) {
      toast.error(error.message);
      return false;
    }
    if (success) toast.success(success);
    await refresh();
    return true;
  }

  async function deleteBook() {
    if (!window.confirm("Delete this book and its quote? This can't be undone.")) return;
    setBusy("delete");
    const { error } = await supabase.from("projects").delete().eq("id", bookId);
    setBusy(null);
    if (error) {
      toast.error(error.message);
      return;
    }
    await queryClient.invalidateQueries({ queryKey: ["books"] });
    toast.success("Book deleted");
    navigate({ to: "/dashboard" });
  }

  return (
    <AppShell>
      <Link to="/dashboard" className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground">
        <ArrowLeft className="h-4 w-4" /> My books
      </Link>

      <div className="mt-4 flex flex-col justify-between gap-4 md:flex-row md:items-end">
        <div>
          <StageBadge stage={project.stage} />
          <h1 className="mt-3 text-4xl font-medium md:text-5xl">{project.title}</h1>
          {project.subtitle && <p className="mt-1 text-lg text-muted-foreground">{project.subtitle}</p>}
        </div>
        {editable && (
          <div className="flex gap-2">
            <Button variant="outline" asChild>
              <Link to="/books/new" search={{ draft: project.id }}><Pencil /> Edit</Link>
            </Button>
            <Button variant="ghost" size="icon" onClick={deleteBook} disabled={busy === "delete"} aria-label="Delete book">
              <Trash2 />
            </Button>
          </div>
        )}
      </div>

      <section className="mt-8 rounded-3xl border border-border bg-card p-6 shadow-soft md:p-8">
        <StageBar stage={project.stage} />
        <p className="mt-6 rounded-xl bg-paper px-4 py-3 text-sm">
          <span className="font-semibold">Next step: </span>
          <span className="text-muted-foreground">{stageInfo(project.stage).next}</span>
        </p>
      </section>

      <div className="mt-6 grid gap-6 lg:grid-cols-[1.5fr_1fr]">
        {/* Quote */}
        <section className="rounded-3xl border border-border bg-card p-6 shadow-soft md:p-8">
          <div className="flex items-baseline justify-between gap-4">
            <h2 className="text-2xl font-medium">{ordered ? "Your order" : "Quote & order summary"}</h2>
            {ordered && <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-success"><CheckCircle2 className="h-4 w-4" /> Paid</span>}
          </div>
          <div className="mt-6">
            <QuoteTable
              lines={lines}
              packageName={project.package ? `${PACKAGES[project.package as PackageCode].name} package` : null}
            />
          </div>

          {payment && (
            <div className="mt-6 flex flex-wrap items-center justify-between gap-3 rounded-2xl bg-paper px-5 py-4 text-sm">
              <span className="flex items-center gap-2">
                <CreditCard className="h-4 w-4 text-brand-deep" />
                Paid {formatMoney(Number(payment.amount), 2)} with {payment.card_brand} •••• {payment.card_last4}
              </span>
              <span className="text-muted-foreground">
                {new Date(payment.created_at).toLocaleDateString(undefined, { dateStyle: "medium" })} · <span className="font-mono">{payment.reference}</span>
                {payment.test_mode && " · test"}
              </span>
            </div>
          )}

          {project.stage === "draft" && (
            <div className="mt-8 flex flex-col gap-3 rounded-2xl bg-paper p-5 sm:flex-row sm:items-center sm:justify-between">
              <p className="text-sm text-muted-foreground">This is a draft. Request your quote when you're happy with it.</p>
              <Button variant="brand" onClick={() => updateProject({ stage: "quoted" }, "quote", "Your quote is ready")} disabled={busy === "quote" || orders.length === 0}>
                {busy === "quote" ? <Loader2 className="animate-spin" /> : <Send />} Request quote
              </Button>
            </div>
          )}

          {project.stage === "quoted" && (
            <div className="mt-8 space-y-4">
              {gates.length > 0 && (
                <ul className="space-y-2 rounded-2xl border border-border p-5 text-sm">
                  <li className="eyebrow mb-1">Before you order</li>
                  {gates.map((g) => (
                    <li key={g.label} className="flex items-center gap-2">
                      {g.ok ? <CheckCircle2 className="h-4 w-4 text-success" /> : <Lock className="h-4 w-4 text-muted-foreground" />}
                      <span className={g.ok ? "" : "text-muted-foreground"}>{g.label}</span>
                    </li>
                  ))}
                </ul>
              )}
              {project.source_type === "monograph" && (
                <label className="flex items-start gap-3 rounded-2xl bg-paper p-5 text-sm">
                  <Checkbox
                    checked={project.rights_confirmed}
                    disabled={busy === "rights"}
                    onCheckedChange={(v) => updateProject({ rights_confirmed: v === true }, "rights")}
                    className="mt-0.5"
                  />
                  <span><span className="font-semibold">I confirm I hold the rights to this monograph.</span> If it was published by a university press or journal, check your contract first.</span>
                </label>
              )}
              <Button variant="brand" size="xl" className="w-full" disabled={!canOrder} onClick={() => setPayOpen(true)}>
                <CreditCard /> Accept quote & place order
              </Button>
            </div>
          )}
        </section>

        {/* Side */}
        <div className="space-y-6">
          {isStaff && <StaffControls key={project.stage} project={project} orders={orders} onChange={refresh} />}
          <section className="rounded-3xl border border-border bg-card p-6 shadow-soft">
            <h2 className="text-xl font-medium">Book details</h2>
            <dl className="mt-4 grid grid-cols-[auto_1fr] gap-x-6 gap-y-2.5 text-sm">
              <Detail k="Starting point" v={SOURCE_OPTIONS.find((o) => o.value === project.source_type)?.label} />
              <Detail k="Author" v={project.author_name} />
              <Detail k="Genre" v={project.genre} />
              <Detail k="Language" v={project.language} />
              <Detail k="Words" v={project.word_count.toLocaleString()} />
              {Number(project.audio_hours) > 0 && <Detail k="Audio" v={`${Number(project.audio_hours)} hours`} />}
              <Detail k="Pages (est.)" v={project.page_count_est?.toString()} />
              <Detail k="Trim size" v={TRIM_SIZES.find((t) => t.value === project.trim_size)?.label} />
              <Detail k="Binding" v={project.binding} />
              <Detail k="Paper" v={project.paper} />
              <Detail k="AI-assisted" v={project.ai_assisted ? "Yes — will be declared to stores" : "No"} />
            </dl>
            {project.notes && <p className="mt-4 rounded-xl bg-paper p-3 text-sm text-muted-foreground">{project.notes}</p>}
          </section>

          {project.source_type === "interview" && (
            <ConsentFiles projectId={project.id} files={consentFiles} canEdit={!ordered} onChange={refresh} />
          )}
        </div>
      </div>

      {project.stage !== "draft" && (
        <section className="mt-6 rounded-3xl border border-border bg-card p-6 shadow-soft md:p-8">
          <div className="flex flex-col justify-between gap-2 sm:flex-row sm:items-baseline">
            <h2 className="text-2xl font-medium">Book workspace</h2>
            <p className="text-sm text-muted-foreground">
              {ordered ? "Share files and talk to the team working on your book." : "Questions about your quote? Message the team."}
            </p>
          </div>
          <Tabs key={ordered ? "ordered" : "quoted"} defaultValue={ordered ? "files" : "messages"} className="mt-6">
            <TabsList>
              {ordered && <TabsTrigger value="files">Files</TabsTrigger>}
              <TabsTrigger value="messages">Messages</TabsTrigger>
            </TabsList>
            {ordered && (
              <TabsContent value="files" className="mt-6">
                <ProjectFiles projectId={project.id} files={files} userId={user.id} isStaff={isStaff} onChange={refresh} />
              </TabsContent>
            )}
            <TabsContent value="messages" className="mt-6">
              <MessageThread
                projectId={project.id}
                userId={user.id}
                ownerId={project.owner_id}
                authorLabel={project.author_name || "Author"}
              />
            </TabsContent>
          </Tabs>
        </section>
      )}

      <CheckoutDialog
        open={payOpen}
        onOpenChange={setPayOpen}
        projectId={project.id}
        title={project.title}
        total={totals.total}
        onPaid={refresh}
      />
    </AppShell>
  );
}

function Detail({ k, v }: { k: string; v?: string | null | undefined }) {
  return (
    <>
      <dt className="text-muted-foreground">{k}</dt>
      <dd className="first-letter:uppercase">{v || "—"}</dd>
    </>
  );
}

const CONSENT_TYPES = ".pdf,.docx,.jpg,.jpeg,.png";

function ConsentFiles({
  projectId,
  files,
  canEdit,
  onChange,
}: {
  projectId: string;
  files: ProjectFile[];
  canEdit: boolean;
  onChange: () => Promise<unknown>;
}) {
  const input = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);

  async function upload(list: FileList | null) {
    if (!list?.length) return;
    setUploading(true);
    try {
      for (const file of Array.from(list)) {
        if (file.size > 200 * 1024 * 1024) throw new Error(`${file.name} is larger than 200 MB`);
        const path = `${projectId}/consent/${Date.now()}-${file.name.replace(/[^\w.-]+/g, "_")}`;
        const up = await supabase.storage.from("project-files").upload(path, file);
        if (up.error) throw up.error;
        const ins = await supabase.from("project_files").insert({
          project_id: projectId,
          kind: "consent",
          name: file.name,
          storage_path: path,
          size_bytes: file.size,
        });
        if (ins.error) throw ins.error;
      }
      toast.success("Consent form uploaded");
      await onChange();
    } catch (e) {
      toast.error(e instanceof Error ? e.message : "Upload failed");
    } finally {
      setUploading(false);
      if (input.current) input.current.value = "";
    }
  }

  async function remove(f: ProjectFile) {
    await supabase.storage.from("project-files").remove([f.storage_path]);
    const { error } = await supabase.from("project_files").delete().eq("id", f.id);
    if (error) {
      toast.error(error.message);
      return;
    }
    await onChange();
  }

  return (
    <section className="rounded-3xl border border-border bg-card p-6 shadow-soft">
      <h2 className="text-xl font-medium">Interviewee consent</h2>
      <p className="mt-1 text-sm text-muted-foreground">Upload a signed release form for every person interviewed.</p>
      <ul className="mt-4 space-y-2">
        {files.map((f) => (
          <li key={f.id} className="flex items-center justify-between gap-3 rounded-xl bg-paper px-3 py-2 text-sm">
            <span className="flex min-w-0 items-center gap-2"><Paperclip className="h-4 w-4 shrink-0 text-brand-deep" /><span className="truncate">{f.name}</span></span>
            {canEdit && (
              <Button variant="ghost" size="icon" className="h-7 w-7" onClick={() => remove(f)} aria-label={`Remove ${f.name}`}>
                <Trash2 />
              </Button>
            )}
          </li>
        ))}
        {files.length === 0 && <li className="text-sm text-muted-foreground">No consent forms yet.</li>}
      </ul>
      {canEdit && (
        <>
          <input ref={input} type="file" accept={CONSENT_TYPES} multiple className="sr-only" onChange={(e) => upload(e.target.files)} aria-label="Upload consent forms" />
          <Button variant="outline" className="mt-4 w-full" onClick={() => input.current?.click()} disabled={uploading}>
            {uploading ? <Loader2 className="animate-spin" /> : <FileUp />} Upload consent forms
          </Button>
        </>
      )}
    </section>
  );
}
