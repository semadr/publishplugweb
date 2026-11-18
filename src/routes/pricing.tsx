import { createFileRoute, Link } from "@tanstack/react-router";
import { useSuspenseQuery } from "@tanstack/react-query";
import { useMemo, useState } from "react";
import { ArrowRight } from "lucide-react";
import { SiteHeader } from "@/components/layout/site-header";
import { SiteFooter } from "@/components/layout/site-footer";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { servicesQuery } from "@/lib/queries";
import { MODULE_LABELS } from "@/lib/catalog";
import {
  AUDIO_ADDON,
  PACKAGES,
  TIERS,
  formatMoney,
  formatUnitPrice,
  packagePrice,
  tierPrice,
  type PackageCode,
  type Tier,
} from "@/lib/pricing";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/pricing")({
  head: () => ({
    meta: [
      { title: "Pricing — Publish Plug" },
      {
        name: "description",
        content:
          "Transparent prices for editing, design, ISBN, distribution and launch services, plus a quick package calculator.",
      },
      { property: "og:title", content: "Pricing — Publish Plug" },
      {
        property: "og:description",
        content: "Every Publish Plug service and package, priced clearly. Try the quick calculator.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  loader: ({ context }) => context.queryClient.ensureQueryData(servicesQuery),
  component: PricingPage,
});

function PricingPage() {
  const { data: catalog } = useSuspenseQuery(servicesQuery);
  const [pkg, setPkg] = useState<PackageCode>("print");
  const [tier, setTier] = useState<Tier>("standard");
  const [withAudio, setWithAudio] = useState(false);

  const grouped = useMemo(() => {
    const g: Record<string, typeof catalog> = {};
    for (const s of catalog) (g[s.module] ??= []).push(s);
    return g;
  }, [catalog]);

  const audio = catalog.find((s) => s.code === AUDIO_ADDON);
  const audioPrice = audio ? (tierPrice(audio, tier) ?? 0) : 0;
  const total = (packagePrice(catalog, pkg, tier) ?? 0) + (withAudio ? audioPrice : 0);

  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />
      <section className="bg-gradient-paper">
        <div className="mx-auto max-w-6xl px-5 pb-16 pt-16">
          <p className="eyebrow">Pricing</p>
          <h1 className="mt-3 max-w-2xl text-5xl font-medium md:text-6xl">Clear prices. No surprises.</h1>
          <p className="mt-4 max-w-xl text-lg text-muted-foreground">
            Pick an all-in-one package or build your own. Editing is charged on your book's word count.
          </p>

          {/* Calculator */}
          <div className="mt-12 grid gap-8 rounded-3xl border border-border bg-card p-8 shadow-lift md:grid-cols-[1.3fr_1fr]">
            <div className="space-y-8">
              <div>
                <p className="text-sm font-semibold">Package</p>
                <div className="mt-3 grid grid-cols-2 gap-2">
                  {(Object.keys(PACKAGES) as PackageCode[]).map((code) => (
                    <button
                      key={code}
                      type="button"
                      onClick={() => setPkg(code)}
                      aria-pressed={pkg === code}
                      className={cn(
                        "rounded-xl border px-3 py-3 text-sm font-semibold transition-all",
                        pkg === code ? "border-brand bg-accent shadow-brand" : "border-border hover:border-brand/60",
                      )}
                    >
                      {PACKAGES[code].name}
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <p className="text-sm font-semibold">Option</p>
                <div className="mt-3 grid grid-cols-2 gap-2">
                  {TIERS.map((t) => (
                    <button
                      key={t.value}
                      type="button"
                      onClick={() => setTier(t.value)}
                      aria-pressed={tier === t.value}
                      className={cn(
                        "rounded-xl border px-3 py-3 text-sm font-semibold transition-all",
                        tier === t.value ? "border-brand bg-accent shadow-brand" : "border-border hover:border-brand/60",
                      )}
                    >
                      {t.label}
                    </button>
                  ))}
                </div>
              </div>
              {audio && (
                <label className="flex cursor-pointer items-center gap-3 rounded-xl border border-border p-4">
                  <Checkbox checked={withAudio} onCheckedChange={(v) => setWithAudio(v === true)} />
                  <span className="flex-1 text-sm font-semibold">Add {audio.name}</span>
                  <span className="text-sm font-semibold text-brand-deep">+{formatMoney(audioPrice)}</span>
                </label>
              )}
            </div>
            <div className="flex flex-col justify-between rounded-2xl bg-paper p-6">
              <div>
                <p className="text-sm text-muted-foreground">
                  {PACKAGES[pkg].name} · {tier === "premium" ? "Premium" : "Standard"}
                  {withAudio ? " + audio" : ""}
                </p>
                <p className="mt-2 font-display text-5xl font-medium">{formatMoney(total)}</p>
                <p className="mt-1 text-xs text-muted-foreground">One price for the whole package</p>
              </div>
              <Button variant="brand" size="lg" className="mt-6" asChild>
                <Link to="/auth" search={{ mode: "signup" }}>Get my exact quote <ArrowRight /></Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 py-20">
        <h2 className="text-3xl font-medium">Every service</h2>
        <div className="mt-10 grid gap-8 md:grid-cols-2">
          {Object.entries(grouped).map(([mod, services]) => (
            <div key={mod} className="rounded-2xl border border-border bg-card p-6 shadow-soft">
              <p className="eyebrow">{MODULE_LABELS[mod]?.pillar}</p>
              <h3 className="mt-1 text-2xl font-medium">{MODULE_LABELS[mod]?.name}</h3>
              <ul className="mt-5 divide-y divide-border">
                {services.map((s) => (
                  <li key={s.code} className="flex items-start justify-between gap-4 py-3">
                    <div>
                      <p className="font-semibold">{s.name}</p>
                      {s.description && <p className="text-sm text-muted-foreground">{s.description}</p>}
                    </div>
                    <p className="shrink-0 text-right text-sm font-semibold text-brand-deep">{formatUnitPrice(s)}</p>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <p className="mt-8 text-xs text-muted-foreground">
          All prices in Naira (₦). Prices are confirmed in your personal quote. Digital marketing excludes ad spend.
        </p>
      </section>
      <SiteFooter />
    </div>
  );
}
