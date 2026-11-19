import { r as __toESM } from "../_runtime.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { y as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { p as require_jsx_runtime } from "../_libs/@radix-ui/react-checkbox+[...].mjs";
import { r as cn, t as Button } from "./button-DUhiRPbF.mjs";
import { I as ArrowRight } from "../_libs/lucide-react.mjs";
import { a as TIERS, c as formatMoney, d as packagePrice, p as tierPrice, r as PACKAGES, t as AUDIO_ADDON, u as formatUnitPrice } from "./pricing-BHybgAyD.mjs";
import { n as useSuspenseQuery } from "../_libs/tanstack__react-query.mjs";
import { t as SiteHeader } from "./site-header-DJyOXzU_.mjs";
import { r as MODULE_LABELS, t as Checkbox } from "./catalog-DW4dqtam.mjs";
import { t as servicesQuery } from "./queries-D_GdtI3f.mjs";
import { t as SiteFooter } from "./site-footer-CqO5Zi0_.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/pricing-BK92qJhV.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function PricingPage() {
	const { data: catalog } = useSuspenseQuery(servicesQuery);
	const [pkg, setPkg] = (0, import_react.useState)("print");
	const [tier, setTier] = (0, import_react.useState)("standard");
	const [withAudio, setWithAudio] = (0, import_react.useState)(false);
	const grouped = (0, import_react.useMemo)(() => {
		const g = {};
		for (const s of catalog) (g[s.module] ??= []).push(s);
		return g;
	}, [catalog]);
	const audio = catalog.find((s) => s.code === AUDIO_ADDON);
	const audioPrice = audio ? tierPrice(audio, tier) ?? 0 : 0;
	const total = (packagePrice(catalog, pkg, tier) ?? 0) + (withAudio ? audioPrice : 0);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "min-h-screen bg-background",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SiteHeader, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
				className: "bg-gradient-paper",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mx-auto max-w-6xl px-5 pb-16 pt-16",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "eyebrow",
							children: "Pricing"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
							className: "mt-3 max-w-2xl text-5xl font-medium md:text-6xl",
							children: "Clear prices. No surprises."
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-4 max-w-xl text-lg text-muted-foreground",
							children: "Pick an all-in-one package or build your own. Editing is charged on your book's word count."
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-12 grid gap-8 rounded-3xl border border-border bg-card p-8 shadow-lift md:grid-cols-[1.3fr_1fr]",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "space-y-8",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "text-sm font-semibold",
										children: "Package"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "mt-3 grid grid-cols-2 gap-2",
										children: Object.keys(PACKAGES).map((code) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
											type: "button",
											onClick: () => setPkg(code),
											"aria-pressed": pkg === code,
											className: cn("rounded-xl border px-3 py-3 text-sm font-semibold transition-all", pkg === code ? "border-brand bg-accent shadow-brand" : "border-border hover:border-brand/60"),
											children: PACKAGES[code].name
										}, code))
									})] }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "text-sm font-semibold",
										children: "Option"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "mt-3 grid grid-cols-2 gap-2",
										children: TIERS.map((t) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
											type: "button",
											onClick: () => setTier(t.value),
											"aria-pressed": tier === t.value,
											className: cn("rounded-xl border px-3 py-3 text-sm font-semibold transition-all", tier === t.value ? "border-brand bg-accent shadow-brand" : "border-border hover:border-brand/60"),
											children: t.label
										}, t.value))
									})] }),
									audio && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
										className: "flex cursor-pointer items-center gap-3 rounded-xl border border-border p-4",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Checkbox, {
												checked: withAudio,
												onCheckedChange: (v) => setWithAudio(v === true)
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
												className: "flex-1 text-sm font-semibold",
												children: ["Add ", audio.name]
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
												className: "text-sm font-semibold text-brand-deep",
												children: ["+", formatMoney(audioPrice)]
											})
										]
									})
								]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex flex-col justify-between rounded-2xl bg-paper p-6",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
										className: "text-sm text-muted-foreground",
										children: [
											PACKAGES[pkg].name,
											" · ",
											tier === "premium" ? "Premium" : "Standard",
											withAudio ? " + audio" : ""
										]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "mt-2 font-display text-5xl font-medium",
										children: formatMoney(total)
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "mt-1 text-xs text-muted-foreground",
										children: "One price for the whole package"
									})
								] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
									variant: "brand",
									size: "lg",
									className: "mt-6",
									asChild: true,
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
										to: "/auth",
										search: { mode: "signup" },
										children: ["Get my exact quote ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, {})]
									})
								})]
							})]
						})
					]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "mx-auto max-w-6xl px-5 py-20",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "text-3xl font-medium",
						children: "Every service"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mt-10 grid gap-8 md:grid-cols-2",
						children: Object.entries(grouped).map(([mod, services]) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "rounded-2xl border border-border bg-card p-6 shadow-soft",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "eyebrow",
									children: MODULE_LABELS[mod]?.pillar
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
									className: "mt-1 text-2xl font-medium",
									children: MODULE_LABELS[mod]?.name
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
									className: "mt-5 divide-y divide-border",
									children: services.map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
										className: "flex items-start justify-between gap-4 py-3",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "font-semibold",
											children: s.name
										}), s.description && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "text-sm text-muted-foreground",
											children: s.description
										})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "shrink-0 text-right text-sm font-semibold text-brand-deep",
											children: formatUnitPrice(s)
										})]
									}, s.code))
								})
							]
						}, mod))
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-8 text-xs text-muted-foreground",
						children: "All prices in Naira (₦). Prices are confirmed in your personal quote. Digital marketing excludes ad spend."
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SiteFooter, {})
		]
	});
}
//#endregion
export { PricingPage as component };
