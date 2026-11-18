import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { useMemo, useState } from "react";
import { ArrowRight, ShieldAlert } from "lucide-react";
import { AppShell } from "@/components/layout/app-shell";
import { StageBadge } from "@/components/books/stage-badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toNum } from "@/lib/books";
import { formatMoney, quoteTotals } from "@/lib/pricing";
import { myRolesQuery } from "@/lib/roles";
import { STAGES, type Stage } from "@/lib/stages";
import { allBooksQuery } from "@/lib/workspace";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/_authenticated/staff")({
  head: () => ({
    meta: [
      { title: "Team board — Publish Plug" },
      { name: "description", content: "Every book in progress at Publish Plug, by stage." },
      { property: "og:title", content: "Team board — Publish Plug" },
      { property: "og:description", content: "Every book in progress at Publish Plug, by stage." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: StaffBoard,
});

function StaffBoard() {
  const roles = useQuery(myRolesQuery);
  const isStaff = !!roles.data?.some((r) => r === "staff" || r === "admin");
  const books = useQuery({ ...allBooksQuery, enabled: isStaff });
  const [filter, setFilter] = useState<Stage | "all">("all");
  const [q, setQ] = useState("");

  const rows = useMemo(
    () =>
      (books.data ?? []).filter(
        (b) =>
          (filter === "all" || b.stage === filter) &&
          (!q || `${b.title} ${b.author_name ?? ""}`.toLowerCase().includes(q.toLowerCase())),
      ),
    [books.data, filter, q],
  );

  if (roles.isLoading) return <AppShell><p className="text-muted-foreground">Loading…</p></AppShell>;
  if (!isStaff) {
    return (
      <AppShell>
        <div className="mx-auto max-w-md rounded-3xl border border-border bg-card p-8 text-center shadow-soft">
          <ShieldAlert className="mx-auto h-8 w-8 text-brand-deep" />
          <h1 className="mt-4 text-2xl font-medium">Team only</h1>
          <p className="mt-2 text-sm text-muted-foreground">This board is for the Publish Plug team.</p>
          <Button variant="outline" className="mt-6" asChild><Link to="/dashboard">Back to my books</Link></Button>
        </div>
      </AppShell>
    );
  }

  const counts = Object.fromEntries(STAGES.map((s) => [s.key, (books.data ?? []).filter((b) => b.stage === s.key).length]));

  return (
    <AppShell>
      <p className="eyebrow">Team board</p>
      <h1 className="mt-2 text-4xl font-medium md:text-5xl">Books in progress</h1>
      <div className="mt-6 flex flex-wrap gap-2">
        <Chip active={filter === "all"} onClick={() => setFilter("all")}>All · {books.data?.length ?? 0}</Chip>
        {STAGES.filter((s) => s.key !== "draft").map((s) => (
          <Chip key={s.key} active={filter === s.key} onClick={() => setFilter(s.key)}>
            {s.label} · {counts[s.key] ?? 0}
          </Chip>
        ))}
      </div>
      <Input className="mt-4 max-w-sm" placeholder="Search title or author" value={q} onChange={(e) => setQ(e.target.value)} aria-label="Search books" />
      <ul className="mt-6 space-y-3">
        {books.isLoading && <li className="text-muted-foreground">Loading books…</li>}
        {!books.isLoading && rows.length === 0 && (
          <li className="rounded-2xl border border-dashed border-border p-8 text-center text-sm text-muted-foreground">No books here yet.</li>
        )}
        {rows.map((b) => {
          const t = quoteTotals((b.orders ?? []).map((o) => ({ price: toNum(o.price) })));
          return (
            <li key={b.id}>
              <Link
                to="/books/$bookId"
                params={{ bookId: b.id }}
                className="group flex flex-col gap-3 rounded-2xl border border-border bg-card p-5 shadow-soft transition-all hover:-translate-y-0.5 hover:shadow-lift sm:flex-row sm:items-center sm:justify-between"
              >
                <div className="min-w-0">
                  <StageBadge stage={b.stage} />
                  <p className="mt-2 truncate font-display text-xl font-semibold">{b.title}</p>
                  <p className="text-sm text-muted-foreground">
                    {b.author_name || "Author"} · updated {new Date(b.updated_at).toLocaleDateString(undefined, { dateStyle: "medium" })}
                  </p>
                </div>
                <div className="flex items-center gap-4 text-sm">
                  {t.pendingQuotes > 0 && <span className="font-semibold text-flame">Needs a quote</span>}
                  <span className="font-semibold tabular-nums">{formatMoney(t.total)}</span>
                  <ArrowRight className="h-4 w-4 text-muted-foreground transition-transform group-hover:translate-x-1" />
                </div>
              </Link>
            </li>
          );
        })}
      </ul>
    </AppShell>
  );
}

function Chip({ active, onClick, children }: { active: boolean; onClick: () => void; children: React.ReactNode }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={cn(
        "rounded-full border px-3 py-1.5 text-xs font-semibold transition-colors",
        active ? "border-brand bg-primary text-primary-foreground" : "border-border bg-card hover:border-brand/60",
      )}
    >
      {children}
    </button>
  );
}
