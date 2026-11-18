import { createFileRoute, Link } from "@tanstack/react-router";
import { useSuspenseQuery } from "@tanstack/react-query";
import { ArrowRight, BookPlus, Plus } from "lucide-react";
import { AppShell } from "@/components/layout/app-shell";
import { StageBadge } from "@/components/books/stage-badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { myBooksQuery, toNum } from "@/lib/books";
import { formatMoney, quoteTotals } from "@/lib/pricing";
import { stageInfo, stageProgress } from "@/lib/stages";

export const Route = createFileRoute("/_authenticated/dashboard")({
  head: () => ({
    meta: [
      { title: "My books — Publish Plug" },
      { name: "description", content: "Track every book you're publishing with Publish Plug." },
      { property: "og:title", content: "My books — Publish Plug" },
      { property: "og:description", content: "Track every book you're publishing with Publish Plug." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  loader: ({ context }) => context.queryClient.ensureQueryData(myBooksQuery),
  component: Dashboard,
});

function Dashboard() {
  const { data: books } = useSuspenseQuery(myBooksQuery);
  const { user } = Route.useRouteContext();
  const name = (user.user_metadata?.["full_name"] as string | undefined)?.split(" ")[0];

  return (
    <AppShell>
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
        <div>
          <p className="eyebrow">Author dashboard</p>
          <h1 className="mt-2 text-4xl font-medium md:text-5xl">{name ? `Welcome, ${name}.` : "Your books"}</h1>
          <p className="mt-2 text-muted-foreground">Every book you're working on, and what happens next.</p>
        </div>
        <Button variant="brand" size="lg" asChild>
          <Link to="/books/new"><Plus /> New book</Link>
        </Button>
      </div>

      {books.length === 0 ? (
        <div className="mt-12 flex flex-col items-center rounded-3xl border border-dashed border-brand/50 bg-card px-6 py-16 text-center shadow-soft">
          <span className="grid h-16 w-16 place-items-center rounded-2xl bg-accent">
            <BookPlus className="h-8 w-8 text-brand-deep" />
          </span>
          <h2 className="mt-6 text-3xl font-medium">Let's start your first book</h2>
          <p className="mt-2 max-w-md text-muted-foreground">
            Tell us about your book and where you're starting from. You'll get an itemised quote in a few minutes.
          </p>
          <Button variant="brand" size="xl" className="mt-8" asChild>
            <Link to="/books/new">Create a book <ArrowRight /></Link>
          </Button>
        </div>
      ) : (
        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {books.map((b) => {
            const totals = quoteTotals(b.orders.map((o) => ({ price: toNum(o.price), inPackage: o.in_package })));
            const pct = stageProgress(b.stage);
            return (
              <Link
                key={b.id}
                to="/books/$bookId"
                params={{ bookId: b.id }}
                className="group flex flex-col rounded-2xl border border-border bg-card p-5 shadow-soft transition-all hover:-translate-y-1 hover:border-brand/60 hover:shadow-lift"
              >
                <div className="flex gap-4">
                  <div className="relative h-24 w-[4.25rem] shrink-0 overflow-hidden rounded-md bg-gradient-brand shadow-brand">
                    <span className="absolute inset-y-0 left-0 w-1.5 bg-ink/15" />
                    <span className="absolute inset-x-2 bottom-2 line-clamp-3 font-display text-[10px] font-semibold leading-tight text-primary-foreground">
                      {b.title}
                    </span>
                  </div>
                  <div className="min-w-0 flex-1">
                    <StageBadge stage={b.stage} />
                    <h2 className="mt-2 truncate text-xl font-medium group-hover:text-brand-deep">{b.title}</h2>
                    {b.subtitle && <p className="truncate text-sm text-muted-foreground">{b.subtitle}</p>}
                  </div>
                </div>
                <p className="mt-5 text-sm"><span className="font-semibold">Next: </span><span className="text-muted-foreground">{stageInfo(b.stage).next}</span></p>
                <div className="mt-4 space-y-1.5">
                  <div className="flex justify-between text-xs text-muted-foreground">
                    <span>{pct}% complete</span>
                    {totals.total > 0 && <span className="font-semibold text-foreground">{formatMoney(totals.total)}</span>}
                  </div>
                  <Progress value={pct} className="h-1.5" />
                </div>
              </Link>
            );
          })}
        </div>
      )}
    </AppShell>
  );
}
