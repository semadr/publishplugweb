import { r as __toESM } from "../_runtime.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { y as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { p as require_jsx_runtime } from "../_libs/@radix-ui/react-checkbox+[...].mjs";
import { r as cn, t as Button } from "./button-DUhiRPbF.mjs";
import { t as Input } from "./input-CEWjXqu_.mjs";
import { I as ArrowRight, o as ShieldAlert } from "../_libs/lucide-react.mjs";
import { c as formatMoney, f as quoteTotals } from "./pricing-BHybgAyD.mjs";
import { r as useQuery } from "../_libs/tanstack__react-query.mjs";
import { o as toNum } from "./books-B56HsLFq.mjs";
import { n as myRolesQuery } from "./site-header-DJyOXzU_.mjs";
import { t as AppShell } from "./app-shell-BQ9BywkR.mjs";
import { n as StageBadge, t as STAGES } from "./stage-badge-CEa1zLIp.mjs";
import { i as allBooksQuery } from "./workspace-Dkjw7wG6.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/staff-Bdf0p5Rf.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function StaffBoard() {
	const roles = useQuery(myRolesQuery);
	const isStaff = !!roles.data?.some((r) => r === "staff" || r === "admin");
	const books = useQuery({
		...allBooksQuery,
		enabled: isStaff
	});
	const [filter, setFilter] = (0, import_react.useState)("all");
	const [q, setQ] = (0, import_react.useState)("");
	const rows = (0, import_react.useMemo)(() => (books.data ?? []).filter((b) => (filter === "all" || b.stage === filter) && (!q || `${b.title} ${b.author_name ?? ""}`.toLowerCase().includes(q.toLowerCase()))), [
		books.data,
		filter,
		q
	]);
	if (roles.isLoading) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AppShell, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
		className: "text-muted-foreground",
		children: "Loading…"
	}) });
	if (!isStaff) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AppShell, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mx-auto max-w-md rounded-3xl border border-border bg-card p-8 text-center shadow-soft",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShieldAlert, { className: "mx-auto h-8 w-8 text-brand-deep" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "mt-4 text-2xl font-medium",
				children: "Team only"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-2 text-sm text-muted-foreground",
				children: "This board is for the Publish Plug team."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
				variant: "outline",
				className: "mt-6",
				asChild: true,
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to: "/dashboard",
					children: "Back to my books"
				})
			})
		]
	}) });
	const counts = Object.fromEntries(STAGES.map((s) => [s.key, (books.data ?? []).filter((b) => b.stage === s.key).length]));
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AppShell, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "eyebrow",
			children: "Team board"
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
			className: "mt-2 text-4xl font-medium md:text-5xl",
			children: "Books in progress"
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mt-6 flex flex-wrap gap-2",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Chip, {
				active: filter === "all",
				onClick: () => setFilter("all"),
				children: ["All · ", books.data?.length ?? 0]
			}), STAGES.filter((s) => s.key !== "draft").map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Chip, {
				active: filter === s.key,
				onClick: () => setFilter(s.key),
				children: [
					s.label,
					" · ",
					counts[s.key] ?? 0
				]
			}, s.key))]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
			className: "mt-4 max-w-sm",
			placeholder: "Search title or author",
			value: q,
			onChange: (e) => setQ(e.target.value),
			"aria-label": "Search books"
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("ul", {
			className: "mt-6 space-y-3",
			children: [
				books.isLoading && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", {
					className: "text-muted-foreground",
					children: "Loading books…"
				}),
				!books.isLoading && rows.length === 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", {
					className: "rounded-2xl border border-dashed border-border p-8 text-center text-sm text-muted-foreground",
					children: "No books here yet."
				}),
				rows.map((b) => {
					const t = quoteTotals((b.orders ?? []).map((o) => ({ price: toNum(o.price) })));
					return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
						to: "/books/$bookId",
						params: { bookId: b.id },
						className: "group flex flex-col gap-3 rounded-2xl border border-border bg-card p-5 shadow-soft transition-all hover:-translate-y-0.5 hover:shadow-lift sm:flex-row sm:items-center sm:justify-between",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "min-w-0",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StageBadge, { stage: b.stage }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "mt-2 truncate font-display text-xl font-semibold",
									children: b.title
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
									className: "text-sm text-muted-foreground",
									children: [
										b.author_name || "Author",
										" · updated ",
										new Date(b.updated_at).toLocaleDateString(void 0, { dateStyle: "medium" })
									]
								})
							]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center gap-4 text-sm",
							children: [
								t.pendingQuotes > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "font-semibold text-flame",
									children: "Needs a quote"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "font-semibold tabular-nums",
									children: formatMoney(t.total)
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, { className: "h-4 w-4 text-muted-foreground transition-transform group-hover:translate-x-1" })
							]
						})]
					}) }, b.id);
				})
			]
		})
	] });
}
function Chip({ active, onClick, children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
		type: "button",
		onClick,
		"aria-pressed": active,
		className: cn("rounded-full border px-3 py-1.5 text-xs font-semibold transition-colors", active ? "border-brand bg-primary text-primary-foreground" : "border-border bg-card hover:border-brand/60"),
		children
	});
}
//#endregion
export { StaffBoard as component };
