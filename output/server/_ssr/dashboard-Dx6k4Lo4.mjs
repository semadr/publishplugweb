import { r as __toESM } from "../_runtime.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { y as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { p as require_jsx_runtime } from "../_libs/@radix-ui/react-checkbox+[...].mjs";
import { r as cn, t as Button } from "./button-DUhiRPbF.mjs";
import { I as ArrowRight, P as BookPlus, l as Plus } from "../_libs/lucide-react.mjs";
import { c as formatMoney, f as quoteTotals } from "./pricing-BHybgAyD.mjs";
import { n as useSuspenseQuery } from "../_libs/tanstack__react-query.mjs";
import { i as myBooksQuery, o as toNum } from "./books-B56HsLFq.mjs";
import { t as AppShell } from "./app-shell-BQ9BywkR.mjs";
import { a as stageProgress, i as stageInfo, n as StageBadge } from "./stage-badge-CEa1zLIp.mjs";
import { t as Route } from "./dashboard-XO1F0cKI.mjs";
import { n as ProgressIndicator, t as Progress$1 } from "../_libs/radix-ui__react-progress.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/dashboard-Dx6k4Lo4.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var Progress = import_react.forwardRef(({ className, value, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Progress$1, {
	ref,
	className: cn("relative h-2 w-full overflow-hidden rounded-full bg-primary/20", className),
	...props,
	children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ProgressIndicator, {
		className: "h-full w-full flex-1 bg-primary transition-all",
		style: { transform: `translateX(-${100 - (value || 0)}%)` }
	})
}));
Progress.displayName = Progress$1.displayName;
function Dashboard() {
	const { data: books } = useSuspenseQuery(myBooksQuery);
	const { user } = Route.useRouteContext();
	const name = (user.user_metadata?.["full_name"])?.split(" ")[0];
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AppShell, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex flex-col justify-between gap-4 sm:flex-row sm:items-end",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "eyebrow",
				children: "Author dashboard"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "mt-2 text-4xl font-medium md:text-5xl",
				children: name ? `Welcome, ${name}.` : "Your books"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-2 text-muted-foreground",
				children: "Every book you're working on, and what happens next."
			})
		] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
			variant: "brand",
			size: "lg",
			asChild: true,
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
				to: "/books/new",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, {}), " New book"]
			})
		})]
	}), books.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mt-12 flex flex-col items-center rounded-3xl border border-dashed border-brand/50 bg-card px-6 py-16 text-center shadow-soft",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "grid h-16 w-16 place-items-center rounded-2xl bg-accent",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(BookPlus, { className: "h-8 w-8 text-brand-deep" })
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "mt-6 text-3xl font-medium",
				children: "Let's start your first book"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-2 max-w-md text-muted-foreground",
				children: "Tell us about your book and where you're starting from. You'll get an itemised quote in a few minutes."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
				variant: "brand",
				size: "xl",
				className: "mt-8",
				asChild: true,
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
					to: "/books/new",
					children: ["Create a book ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, {})]
				})
			})
		]
	}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3",
		children: books.map((b) => {
			const totals = quoteTotals(b.orders.map((o) => ({
				price: toNum(o.price),
				inPackage: o.in_package
			})));
			const pct = stageProgress(b.stage);
			return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
				to: "/books/$bookId",
				params: { bookId: b.id },
				className: "group flex flex-col rounded-2xl border border-border bg-card p-5 shadow-soft transition-all hover:-translate-y-1 hover:border-brand/60 hover:shadow-lift",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex gap-4",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "relative h-24 w-[4.25rem] shrink-0 overflow-hidden rounded-md bg-gradient-brand shadow-brand",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "absolute inset-y-0 left-0 w-1.5 bg-ink/15" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "absolute inset-x-2 bottom-2 line-clamp-3 font-display text-[10px] font-semibold leading-tight text-primary-foreground",
								children: b.title
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "min-w-0 flex-1",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StageBadge, { stage: b.stage }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
									className: "mt-2 truncate text-xl font-medium group-hover:text-brand-deep",
									children: b.title
								}),
								b.subtitle && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "truncate text-sm text-muted-foreground",
									children: b.subtitle
								})
							]
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "mt-5 text-sm",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "font-semibold",
							children: "Next: "
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-muted-foreground",
							children: stageInfo(b.stage).next
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-4 space-y-1.5",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex justify-between text-xs text-muted-foreground",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [pct, "% complete"] }), totals.total > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "font-semibold text-foreground",
								children: formatMoney(totals.total)
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Progress, {
							value: pct,
							className: "h-1.5"
						})]
					})
				]
			}, b.id);
		})
	})] });
}
//#endregion
export { Dashboard as component };
