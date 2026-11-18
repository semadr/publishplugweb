import { createFileRoute, Link } from "@tanstack/react-router";
import { useSuspenseQuery } from "@tanstack/react-query";
import {
  ArrowRight,
  BookOpen,
  Check,
  FileText,
  Feather,
  GraduationCap,
  Lightbulb,
  Megaphone,
  Mic,
  Palette,
  ShieldCheck,
  Sparkles,
  Users,
  Library,
} from "lucide-react";
import heroImg from "@/assets/hero-books.jpg";
import { SiteHeader } from "@/components/layout/site-header";
import { SiteFooter } from "@/components/layout/site-footer";
import { Button } from "@/components/ui/button";
import { servicesQuery } from "@/lib/queries";
import { AUDIO_ADDON, AUDIO_ADDON_DELIVERABLES, PACKAGES, formatRange, type PackageCode } from "@/lib/pricing";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Publish Plug — From idea to every bookshelf" },
      {
        name: "description",
        content:
          "Publish Plug takes authors from first idea to a published book in print, ebook and audio — writing, editing, design, ISBN, launch and distribution in one place.",
      },
      { property: "og:title", content: "Publish Plug — From idea to every bookshelf" },
      {
        property: "og:description",
        content:
          "Writing, editing, design, ISBN, launch and distribution in one place. You keep your rights.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  loader: ({ context }) => context.queryClient.ensureQueryData(servicesQuery),
  component: Landing,
});

const PILLARS = [
  {
    icon: Feather,
    name: "Create",
    copy: "Ghostwriting, every tier of editing, and turning recordings, interviews or research into a book.",
    items: ["Ghostwriting", "Developmental, line & copy editing", "Proofreading", "Transformations"],
  },
  {
    icon: Palette,
    name: "Design",
    copy: "A cover and interior that look like they came from a major publisher — print-ready everywhere.",
    items: ["Cover design", "Interior typesetting", "Ebook (EPUB)", "Print-ready PDF"],
  },
  {
    icon: BookOpen,
    name: "Publish",
    copy: "Your book in the formats readers want, built to the strictest store specifications.",
    items: ["E-Book package", "Print Book package", "Audio Add-On", "Print-ready & EPUB files"],
  },
  {
    icon: Megaphone,
    name: "Launch & distribute",
    copy: "ISBN paperwork, store listings, a launch plan, a book website and digital marketing.",
    items: ["ISBN set-up", "Multi-store distribution", "Launch plan & website", "Digital marketing"],
  },
];

const STARTS = [
  { icon: Lightbulb, label: "An idea" },
  { icon: FileText, label: "A manuscript" },
  { icon: Mic, label: "A voice recording" },
  { icon: GraduationCap, label: "A monograph" },
  { icon: Users, label: "An interview" },
];

const WHY = [
  { icon: Sparkles, title: "One team, whole journey", copy: "No juggling five vendors. Writers, editors, designers and launch specialists under one roof." },
  { icon: Mic, title: "Start from anything", copy: "We turn audio, interviews and academic monographs into books — something printers don't offer." },
  { icon: Library, title: "Global reach through partners", copy: "We work with established printers and distributors, so your book reaches stores worldwide." },
  { icon: ShieldCheck, title: "Your rights, always", copy: "You stay the author and publisher of record. Clear packages, no surprises." },
];

function Landing() {
  const { data: catalog } = useSuspenseQuery(servicesQuery);
  const audio = catalog.find((s) => s.code === AUDIO_ADDON);

  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />

      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-paper">
        <div className="mx-auto grid max-w-6xl items-center gap-12 px-5 pb-20 pt-14 md:grid-cols-[1.05fr_1fr] md:pb-28 md:pt-20">
          <div className="animate-rise space-y-7">
            <p className="eyebrow">All-in-one self-publishing</p>
            <h1 className="text-5xl font-medium leading-[1.04] text-foreground md:text-7xl">
              Your story,
              <br />
              <span className="italic text-gradient-brand">published.</span>
            </h1>
            <p className="max-w-lg text-lg leading-relaxed text-muted-foreground">
              Publish Plug takes you from first idea to a finished book in print, ebook and audio —
              then gets it onto bookshelves around the world. You keep every right.
            </p>
            <div className="flex flex-wrap items-center gap-3">
              <Button variant="brand" size="xl" asChild>
                <Link to="/auth" search={{ mode: "signup" }}>
                  Start your book <ArrowRight />
                </Link>
              </Button>
              <Button variant="outline" size="xl" asChild>
                <a href="#packages">View packages</a>
              </Button>
            </div>
            <ul className="flex flex-wrap gap-x-6 gap-y-2 pt-2 text-sm text-muted-foreground">
              {["You keep 100% of your rights", "Print, ebook & audio", "Track every step online"].map((t) => (
                <li key={t} className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-brand-deep" /> {t}
                </li>
              ))}
            </ul>
          </div>
          <div className="relative animate-rise [animation-delay:150ms]">
            <div className="absolute -inset-4 rounded-[2rem] bg-gradient-brand opacity-25 blur-2xl" aria-hidden="true" />
            <img
              src={heroImg}
              alt="Golden hardcover books and an open book on white linen"
              width={1600}
              height={1104}
              className="relative aspect-[4/3] w-full rounded-[1.75rem] object-cover shadow-lift ring-1 ring-border"
            />
            <div className="absolute -bottom-6 left-6 rounded-2xl border border-border bg-card px-5 py-4 shadow-lift">
              <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Idea → Bookshelf</p>
              <p className="font-display text-lg">8 clear stages, one dashboard</p>
            </div>
          </div>
        </div>
      </section>

      {/* Start from anything */}
      <section className="border-y border-border bg-card">
        <div className="mx-auto flex max-w-6xl flex-col items-center gap-6 px-5 py-10 md:flex-row md:justify-between">
          <p className="font-display text-xl">Start with whatever you have:</p>
          <ul className="flex flex-wrap justify-center gap-3">
            {STARTS.map(({ icon: Icon, label }) => (
              <li key={label} className="flex items-center gap-2 rounded-full border border-border bg-paper px-4 py-2 text-sm font-medium">
                <Icon className="h-4 w-4 text-brand-deep" /> {label}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Pillars */}
      <section id="services" className="mx-auto max-w-6xl scroll-mt-20 px-5 py-24">
        <div className="max-w-2xl space-y-4">
          <p className="eyebrow">What we do</p>
          <h2 className="text-4xl font-medium md:text-5xl">From idea to every bookshelf.</h2>
          <p className="text-lg text-muted-foreground">
            Printers give you a press. Distributors give you reach. We give you the whole journey —
            and pick only the services you need.
          </p>
        </div>
        <div className="mt-14 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
          {PILLARS.map(({ icon: Icon, name, copy, items }, i) => (
            <article key={name} className="group relative flex flex-col rounded-2xl border border-border bg-card p-6 shadow-soft transition-all hover:-translate-y-1 hover:shadow-lift">
              <span className="font-display text-sm text-brand-deep">0{i + 1}</span>
              <span className="mt-4 grid h-11 w-11 place-items-center rounded-xl bg-accent">
                <Icon className="h-5 w-5 text-brand-deep" />
              </span>
              <h3 className="mt-5 text-2xl font-medium">{name}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{copy}</p>
              <ul className="mt-5 space-y-2 border-t border-border pt-5 text-sm">
                {items.map((it) => (
                  <li key={it} className="flex items-start gap-2">
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-brand-deep" /> {it}
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </section>

      {/* Packages */}
      <section id="packages" className="scroll-mt-20 bg-paper">
        <div className="mx-auto max-w-6xl px-5 py-24">
          <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <div className="max-w-xl space-y-4">
              <p className="eyebrow">Packages</p>
              <h2 className="text-4xl font-medium md:text-5xl">Choose your book.</h2>
              <p className="text-muted-foreground">
                All-in-one packages, each with a Standard and a Premium option. Add audio to either one.
              </p>
            </div>
            <Button variant="outline" asChild>
              <Link to="/pricing">See the full price list <ArrowRight /></Link>
            </Button>
          </div>
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {(Object.keys(PACKAGES) as PackageCode[]).map((code) => {
              const pkg = PACKAGES[code];
              const featured = code === "print";
              const svc = catalog.find((s) => s.code === pkg.serviceCode);
              return (
                <article
                  key={code}
                  className={cn(
                    "relative flex flex-col rounded-3xl border bg-card p-8 shadow-soft",
                    featured ? "border-brand shadow-brand md:-translate-y-3" : "border-border",
                  )}
                >
                  {featured && (
                    <span className="absolute -top-3 left-8 rounded-full bg-gradient-brand px-3 py-1 text-xs font-bold uppercase tracking-wider text-primary-foreground">
                      Most chosen
                    </span>
                  )}
                  <h3 className="text-2xl font-medium">{pkg.name}</h3>
                  <p className="mt-1 text-sm text-muted-foreground">{pkg.tagline}</p>
                  <p className="mt-6 font-display text-3xl font-semibold">{svc ? formatRange(svc) : "—"}</p>
                  <p className="text-xs text-muted-foreground">Standard – Premium</p>
                  <ul className="mt-6 flex-1 space-y-2.5 border-t border-border pt-6 text-sm">
                    {pkg.deliverables.map((d) => (
                      <li key={d} className="flex items-start gap-2">
                        <Check className="mt-0.5 h-4 w-4 shrink-0 text-brand-deep" /> {d}
                      </li>
                    ))}
                  </ul>
                  <Button variant={featured ? "brand" : "outline"} size="lg" className="mt-8" asChild>
                    <Link to="/auth" search={{ mode: "signup" }}>Start with {pkg.name}</Link>
                  </Button>
                </article>
              );
            })}
            {audio && (
              <article className="relative flex flex-col rounded-3xl border border-dashed border-flame/60 bg-card p-8 shadow-soft">
                <span className="absolute -top-3 left-8 rounded-full bg-gradient-flame px-3 py-1 text-xs font-bold uppercase tracking-wider text-primary-foreground">
                  Add-on
                </span>
                <h3 className="text-2xl font-medium">{audio.name}</h3>
                <p className="mt-1 text-sm text-muted-foreground">{audio.description}</p>
                <p className="mt-6 font-display text-3xl font-semibold">{formatRange(audio)}</p>
                <p className="text-xs text-muted-foreground">Standard – Premium · added to any package</p>
                <ul className="mt-6 flex-1 space-y-2.5 border-t border-border pt-6 text-sm">
                  {AUDIO_ADDON_DELIVERABLES.map((d) => (
                    <li key={d} className="flex items-start gap-2">
                      <Check className="mt-0.5 h-4 w-4 shrink-0 text-flame" /> {d}
                    </li>
                  ))}
                </ul>
                <Button variant="outline" size="lg" className="mt-8" asChild>
                  <Link to="/auth" search={{ mode: "signup" }}>Add audio to my book</Link>
                </Button>
              </article>
            )}
          </div>
        </div>
      </section>

      {/* Why */}
      <section className="mx-auto max-w-6xl px-5 py-24">
        <div className="grid gap-12 md:grid-cols-[1fr_1.4fr]">
          <div className="space-y-4">
            <p className="eyebrow">Why Publish Plug</p>
            <h2 className="text-4xl font-medium md:text-5xl">The front half and the back half — done for you.</h2>
            <div className="brand-rule" />
          </div>
          <div className="grid gap-8 sm:grid-cols-2">
            {WHY.map(({ icon: Icon, title, copy }) => (
              <div key={title} className="space-y-3">
                <Icon className="h-6 w-6 text-brand-deep" />
                <h3 className="text-xl font-medium">{title}</h3>
                <p className="text-sm leading-relaxed text-muted-foreground">{copy}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="px-5 pb-24">
        <div className="relative mx-auto max-w-6xl overflow-hidden rounded-[2rem] bg-gradient-ink px-8 py-16 text-center text-ink-foreground md:px-16">
          <div className="absolute -right-24 -top-24 h-72 w-72 rounded-full bg-gradient-brand opacity-30 blur-3xl" aria-hidden="true" />
          <h2 className="relative text-4xl font-medium md:text-5xl">
            Ready to see your name <span className="italic text-gradient-brand">on the cover?</span>
          </h2>
          <p className="relative mx-auto mt-4 max-w-xl text-ink-foreground/70">
            Create a free account, tell us about your book and get an itemised quote in minutes.
          </p>
          <Button variant="brand" size="xl" className="relative mt-8" asChild>
            <Link to="/auth" search={{ mode: "signup" }}>Start your book <ArrowRight /></Link>
          </Button>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}
