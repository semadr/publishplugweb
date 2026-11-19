import { r as __toESM } from "../_runtime.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { b as useNavigate, y as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { p as require_jsx_runtime } from "../_libs/@radix-ui/react-checkbox+[...].mjs";
import { r as cn, t as Button } from "./button-DUhiRPbF.mjs";
import { t as Input } from "./input-CEWjXqu_.mjs";
import { t as Label } from "./label-CQLTf2jI.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { C as Info, I as ArrowRight, L as ArrowLeft, N as Check, c as Save, i as Sparkles, y as LoaderCircle } from "../_libs/lucide-react.mjs";
import { a as TIERS, c as formatMoney, d as packagePrice, i as SOURCE_SERVICE, l as formatRange, n as AUDIO_ADDON_DELIVERABLES, o as buildQuoteLines, p as tierPrice, r as PACKAGES, s as estimatePageCount, t as AUDIO_ADDON, u as formatUnitPrice } from "./pricing-BHybgAyD.mjs";
import { a as useQueryClient, n as useSuspenseQuery } from "../_libs/tanstack__react-query.mjs";
import { a as saveBook, n as draftFromBook, r as emptyDraft, t as bookQuery } from "./books-B56HsLFq.mjs";
import { t as AppShell } from "./app-shell-BQ9BywkR.mjs";
import { a as SelectTrigger, i as SelectItem, n as Select, o as SelectValue, r as SelectContent, s as Textarea, t as QuoteTable } from "./select-C45ioakc.mjs";
import { a as TRIM_SIZES, i as SOURCE_OPTIONS, n as GENRES, r as MODULE_LABELS, t as Checkbox } from "./catalog-DW4dqtam.mjs";
import { t as servicesQuery } from "./queries-D_GdtI3f.mjs";
import { t as Route } from "./books.new-BmJApmvS.mjs";
import { n as SwitchThumb, t as Switch$1 } from "../_libs/radix-ui__react-switch.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/books.new-ClQQqslp.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var Switch = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Switch$1, {
	className: cn("peer inline-flex h-5 w-9 shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-primary data-[state=unchecked]:bg-input", className),
	...props,
	ref,
	children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SwitchThumb, { className: cn("pointer-events-none block h-4 w-4 rounded-full bg-background shadow-lg ring-0 transition-transform data-[state=checked]:translate-x-4 data-[state=unchecked]:translate-x-0") })
}));
Switch.displayName = Switch$1.displayName;
var STEPS = [
	"Book details",
	"Starting point",
	"Services",
	"Review & quote"
];
var TRANSFORM_CODES = /* @__PURE__ */ new Set([
	"transform_audio",
	"transform_interview",
	"transform_monograph"
]);
function NewBookPage() {
	const { draft: draftId } = Route.useSearch();
	if (draftId) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EditDraft, { id: draftId });
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Wizard, { initial: emptyDraft() });
}
function EditDraft({ id }) {
	const { data } = useSuspenseQuery(bookQuery(id));
	if (!data.project) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AppShell, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
		className: "text-muted-foreground",
		children: "This book could not be found."
	}) });
	if (!["draft", "quoted"].includes(data.project.stage)) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AppShell, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
		className: "text-muted-foreground",
		children: "This order has been placed and can no longer be edited."
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
		variant: "outline",
		className: "mt-4",
		asChild: true,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
			to: "/books/$bookId",
			params: { bookId: id },
			children: "Back to book"
		})
	})] });
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Wizard, {
		id,
		initial: draftFromBook(data.project, data.orders)
	});
}
function Wizard({ id, initial }) {
	const { data: catalog } = useSuspenseQuery(servicesQuery);
	const navigate = useNavigate();
	const queryClient = useQueryClient();
	const [step, setStep] = (0, import_react.useState)(0);
	const [d, setD] = (0, import_react.useState)(initial);
	const [saving, setSaving] = (0, import_react.useState)(null);
	const set = (k, v) => setD((p) => ({
		...p,
		[k]: v
	}));
	const toggleExtra = (code, on) => setD((p) => ({
		...p,
		extras: on ? [...p.extras.filter((c) => c !== code), code] : p.extras.filter((c) => c !== code)
	}));
	const setTier = (code, t) => setD((p) => ({
		...p,
		tiers: {
			...p.tiers,
			[code]: t
		}
	}));
	const pageCount = estimatePageCount(d.word_count);
	const needsHours = d.source_type === "audio" || d.source_type === "interview";
	const lines = (0, import_react.useMemo)(() => buildQuoteLines({
		catalog,
		wordCount: d.word_count,
		audioHours: d.audio_hours,
		sourceType: d.source_type,
		packageCode: d.package,
		packageTier: d.packageTier,
		extras: d.extras,
		tiers: d.tiers,
		isbnCount: d.isbnCount,
		storeCount: d.storeCount
	}), [catalog, d]);
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
		window.scrollTo({
			top: 0,
			behavior: "smooth"
		});
	}
	async function save(stage) {
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
			const bookId = await saveBook({
				id,
				draft: d,
				lines,
				pageCount,
				stage
			});
			await queryClient.invalidateQueries({ queryKey: ["books"] });
			await queryClient.invalidateQueries({ queryKey: ["book", bookId] });
			toast.success(stage === "draft" ? "Draft saved" : "Your quote is ready");
			navigate({
				to: "/books/$bookId",
				params: { bookId }
			});
		} catch (e) {
			toast.error(e instanceof Error ? e.message : "Could not save your book");
		} finally {
			setSaving(null);
		}
	}
	const extrasByModule = (0, import_react.useMemo)(() => {
		const auto = SOURCE_SERVICE[d.source_type];
		const g = {};
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
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AppShell, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mx-auto max-w-4xl",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
				to: "/dashboard",
				className: "inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowLeft, { className: "h-4 w-4" }), " My books"]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "mt-4 text-4xl font-medium md:text-5xl",
				children: id ? "Edit your book" : "Let's set up your book"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ol", {
				className: "mt-8 grid grid-cols-4 gap-2",
				"aria-label": "Steps",
				children: STEPS.map((label, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
					type: "button",
					onClick: () => i < step ? setStep(i) : void 0,
					disabled: i > step,
					"aria-current": i === step ? "step" : void 0,
					className: "w-full text-left disabled:cursor-default",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: cn("block h-1 rounded-full", i <= step ? "bg-gradient-brand" : "bg-border") }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: cn("mt-2 hidden text-xs font-semibold sm:block", i === step ? "text-foreground" : "text-muted-foreground"),
						children: [
							i + 1,
							". ",
							label
						]
					})]
				}) }, label))
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-8 rounded-3xl border border-border bg-card p-6 shadow-soft md:p-10",
				children: [
					step === 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "space-y-8",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Heading, {
								title: "Tell us about your book",
								sub: "You can change any of this later."
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "grid gap-5 md:grid-cols-2",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
										label: "Working title",
										htmlFor: "title",
										className: "md:col-span-2",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
											id: "title",
											value: d.title,
											onChange: (e) => set("title", e.target.value),
											placeholder: "e.g. A Calmer Mind",
											required: true
										})
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
										label: "Subtitle",
										htmlFor: "subtitle",
										optional: true,
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
											id: "subtitle",
											value: d.subtitle,
											onChange: (e) => set("subtitle", e.target.value)
										})
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
										label: "Author name on the cover",
										htmlFor: "author",
										optional: true,
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
											id: "author",
											value: d.author_name,
											onChange: (e) => set("author_name", e.target.value)
										})
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
										label: "Genre",
										htmlFor: "genre",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
											value: d.genre,
											onValueChange: (v) => set("genre", v),
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectTrigger, {
												id: "genre",
												children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectValue, { placeholder: "Choose a genre" })
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectContent, { children: GENRES.map((g) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
												value: g,
												children: g
											}, g)) })]
										})
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
										label: "Language",
										htmlFor: "language",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
											id: "language",
											value: d.language,
											onChange: (e) => set("language", e.target.value)
										})
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
										label: d.source_type === "idea" ? "How many words should the finished book be?" : "Approximate word count",
										htmlFor: "words",
										hint: d.source_type === "idea" ? `Ghostwriting is priced per word of the finished book${pageCount ? ` · ≈ ${pageCount} printed pages` : ""}.` : pageCount ? `≈ ${pageCount} printed pages (you can adjust this later)` : "Your best estimate is fine.",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
											id: "words",
											type: "number",
											min: 0,
											step: 500,
											value: Number.isFinite(d.word_count) ? d.word_count : 0,
											onChange: (e) => set("word_count", Math.max(0, Number(e.target.value) || 0))
										})
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
										label: "Trim size",
										htmlFor: "trim",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
											value: d.trim_size,
											onValueChange: (v) => set("trim_size", v),
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectTrigger, {
												id: "trim",
												children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectValue, {})
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectContent, { children: TRIM_SIZES.map((t) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
												value: t.value,
												children: t.label
											}, t.value)) })]
										})
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
										label: "Binding",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Segmented, {
											value: d.binding,
											onChange: (v) => set("binding", v),
											options: [{
												value: "paperback",
												label: "Paperback"
											}, {
												value: "hardcover",
												label: "Hardcover"
											}]
										})
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
										label: "Paper",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Segmented, {
											value: d.paper,
											onChange: (v) => set("paper", v),
											options: [{
												value: "white",
												label: "White"
											}, {
												value: "cream",
												label: "Cream"
											}]
										})
									})
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-start justify-between gap-4 rounded-2xl bg-paper p-5",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
									htmlFor: "ai",
									className: "text-base font-semibold",
									children: "AI-assisted drafting"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "mt-1 text-sm text-muted-foreground",
									children: "Has AI been used to draft any of the text? Some stores require you to declare it, so we note it on your publish checklist."
								})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Switch, {
									id: "ai",
									checked: d.ai_assisted,
									onCheckedChange: (v) => set("ai_assisted", v)
								})]
							})
						]
					}),
					step === 1 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "space-y-8",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Heading, {
								title: "Where are you starting from?",
								sub: "This decides which files we'll need and how we transform your material."
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "grid gap-3 sm:grid-cols-2",
								role: "radiogroup",
								"aria-label": "Starting point",
								children: SOURCE_OPTIONS.map((o) => {
									const active = d.source_type === o.value;
									return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
										type: "button",
										role: "radio",
										"aria-checked": active,
										onClick: () => set("source_type", o.value),
										className: cn("relative rounded-2xl border p-5 text-left transition-all", active ? "border-brand bg-accent shadow-brand" : "border-border hover:border-brand/60"),
										children: [
											active && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, { className: "absolute right-4 top-4 h-5 w-5 text-brand-deep" }),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
												className: "font-display text-xl",
												children: o.label
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
												className: "mt-1 text-sm text-muted-foreground",
												children: o.blurb
											})
										]
									}, o.value);
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex gap-3 rounded-2xl bg-paper p-5 text-sm",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Info, { className: "mt-0.5 h-4 w-4 shrink-0 text-brand-deep" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: SOURCE_OPTIONS.find((o) => o.value === d.source_type)?.needs })]
							}),
							needsHours && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
								label: "Total audio length (hours)",
								htmlFor: "hours",
								className: "max-w-xs",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
									id: "hours",
									type: "number",
									min: 0,
									step: .5,
									value: d.audio_hours,
									onChange: (e) => set("audio_hours", Math.max(0, Number(e.target.value) || 0))
								})
							}),
							d.source_type === "monograph" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
								className: "flex items-start gap-3 rounded-2xl border border-border p-5",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Checkbox, {
									checked: d.rights_confirmed,
									onCheckedChange: (v) => set("rights_confirmed", v === true),
									className: "mt-0.5"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "text-sm",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "font-semibold",
										children: "I confirm I hold the rights to this monograph."
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "block text-muted-foreground",
										children: "If a university press or journal published it before, check your contract first. We can't place the order without this."
									})]
								})]
							})
						]
					}),
					step === 2 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "space-y-10",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Heading, {
								title: "Pick a package or build your own",
								sub: "Packages are all-in-one, with a Standard or Premium price. Add anything else on top."
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "space-y-4",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex flex-wrap items-center justify-between gap-3",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "eyebrow",
											children: "Packages"
										}), d.package && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											className: "w-56",
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Segmented, {
												value: d.packageTier,
												onChange: (v) => set("packageTier", v),
												options: TIERS
											})
										})]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "grid gap-3 md:grid-cols-3",
										children: [Object.keys(PACKAGES).map((code) => {
											const active = d.package === code;
											const svc = catalog.find((s) => s.code === PACKAGES[code].serviceCode);
											const price = packagePrice(catalog, code, active ? d.packageTier : "standard");
											return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
												type: "button",
												"aria-pressed": active,
												onClick: () => set("package", code),
												className: cn("relative rounded-2xl border p-5 text-left transition-all", active ? "border-brand bg-accent shadow-brand" : "border-border hover:border-brand/60"),
												children: [
													active && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, { className: "absolute right-4 top-4 h-5 w-5 text-brand-deep" }),
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
														className: "font-display text-lg font-semibold",
														children: PACKAGES[code].name
													}),
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
														className: "mt-3 font-display text-2xl font-semibold",
														children: price == null ? "—" : formatMoney(price)
													}),
													/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
														className: "mt-1 text-xs text-muted-foreground",
														children: [active ? `${d.packageTier === "premium" ? "Premium" : "Standard"} · ` : "", svc ? formatRange(svc) : ""]
													}),
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
														className: "mt-3 space-y-1 text-xs text-muted-foreground",
														children: PACKAGES[code].deliverables.map((x) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", { children: ["· ", x] }, x))
													})
												]
											}, code);
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
											type: "button",
											"aria-pressed": d.package === null,
											onClick: () => set("package", null),
											className: cn("rounded-2xl border border-dashed p-5 text-left transition-all", d.package === null ? "border-brand bg-accent" : "border-border hover:border-brand/60"),
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
												className: "font-display text-lg font-semibold",
												children: "No package"
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
												className: "mt-3 text-sm text-muted-foreground",
												children: "Pick individual services below."
											})]
										})]
									}),
									audioSvc && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TieredOption, {
										svc: audioSvc,
										checked: d.extras.includes("pkg_audio"),
										tier: d.tiers["pkg_audio"] ?? d.packageTier,
										onToggle: (v) => toggleExtra("pkg_audio", v),
										onTier: (t) => setTier("pkg_audio", t),
										note: AUDIO_ADDON_DELIVERABLES.join(" · ")
									})
								]
							}),
							autoSvc && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-start gap-3 rounded-2xl border border-brand/40 bg-accent/60 p-5",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sparkles, { className: "mt-0.5 h-5 w-5 shrink-0 text-brand-deep" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "text-sm",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
										className: "font-semibold",
										children: [autoSvc.name, " is included automatically"]
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
										className: "text-muted-foreground",
										children: [
											"Because you're starting from ",
											SOURCE_OPTIONS.find((o) => o.value === d.source_type)?.label.toLowerCase(),
											". ",
											formatUnitPrice(autoSvc),
											"."
										]
									})]
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "space-y-8",
								children: Object.entries(extrasByModule).map(([mod, services]) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("fieldset", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("legend", {
									className: "eyebrow",
									children: MODULE_LABELS[mod]?.name
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "mt-3 grid gap-2 sm:grid-cols-2",
									children: services.map((s) => {
										const included = inPackage.has(s.code);
										const checked = included || d.extras.includes(s.code);
										if (s.pricing_type === "tiered" && !included) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TieredOption, {
											svc: s,
											checked,
											tier: d.tiers[s.code] ?? "standard",
											onToggle: (v) => toggleExtra(s.code, v),
											onTier: (t) => setTier(s.code, t)
										}, s.code);
										return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: cn("rounded-xl border p-4", checked ? "border-brand/60 bg-accent/40" : "border-border"),
											children: [
												/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
													className: "flex cursor-pointer items-start gap-3",
													children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Checkbox, {
														checked,
														disabled: included,
														onCheckedChange: (v) => toggleExtra(s.code, v === true),
														className: "mt-0.5"
													}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
														className: "flex-1",
														children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
															className: "flex items-baseline justify-between gap-2",
															children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
																className: "text-sm font-semibold",
																children: s.name
															}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
																className: "shrink-0 text-xs font-semibold text-brand-deep",
																children: included ? "In package" : formatUnitPrice(s)
															})]
														}), s.description && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
															className: "mt-0.5 block text-xs text-muted-foreground",
															children: s.description
														})]
													})]
												}),
												!included && d.extras.includes(s.code) && s.code === "isbn_setup" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CountInput, {
													label: "Formats (print, ebook, audio)",
													value: d.isbnCount,
													max: 3,
													onChange: (v) => set("isbnCount", v)
												}),
												!included && d.extras.includes(s.code) && s.code === "distribution_setup" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CountInput, {
													label: "Number of stores",
													value: d.storeCount,
													max: 6,
													onChange: (v) => set("storeCount", v)
												})
											]
										}, s.code);
									})
								})] }, mod))
							})
						]
					}),
					step === 3 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "space-y-8",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Heading, {
							title: "Your quote",
							sub: "Itemised from today's prices. Save it as a draft or request your quote to move forward."
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "grid gap-8 md:grid-cols-[1.4fr_1fr]",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(QuoteTable, {
								packageName: d.package ? `${PACKAGES[d.package].name} package` : null,
								lines: lines.map((l) => ({
									...l,
									key: l.code
								}))
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "space-y-5",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "rounded-2xl bg-paper p-5 text-sm",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "font-display text-lg",
											children: d.title || "Untitled book"
										}),
										d.subtitle && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "text-muted-foreground",
											children: d.subtitle
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("dl", {
											className: "mt-4 grid grid-cols-2 gap-y-2 text-xs",
											children: [
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
													className: "text-muted-foreground",
													children: "Starting point"
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", { children: SOURCE_OPTIONS.find((o) => o.value === d.source_type)?.label }),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
													className: "text-muted-foreground",
													children: "Words"
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", { children: d.word_count.toLocaleString() }),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
													className: "text-muted-foreground",
													children: "Pages (est.)"
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", { children: pageCount || "—" }),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
													className: "text-muted-foreground",
													children: "Format"
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("dd", {
													className: "capitalize",
													children: [
														d.trim_size.replace("x", " × "),
														" in · ",
														d.binding
													]
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
													className: "text-muted-foreground",
													children: "AI-assisted"
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", { children: d.ai_assisted ? "Yes" : "No" })
											]
										})
									]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
									label: "Anything we should know?",
									htmlFor: "notes",
									optional: true,
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Textarea, {
										id: "notes",
										rows: 4,
										value: d.notes,
										onChange: (e) => set("notes", e.target.value),
										placeholder: "Deadlines, style references, audience…"
									})
								})]
							})]
						})]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-6 flex flex-wrap items-center justify-between gap-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
					variant: "ghost",
					onClick: () => setStep((s) => Math.max(0, s - 1)),
					disabled: step === 0,
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowLeft, {}), " Back"]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex flex-wrap gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
						variant: "outline",
						onClick: () => save("draft"),
						disabled: saving !== null,
						children: [saving === "draft" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "animate-spin" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Save, {}), " Save draft"]
					}), step < STEPS.length - 1 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
						variant: "brand",
						onClick: next,
						children: ["Next ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, {})]
					}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
						variant: "brand",
						onClick: () => save("quoted"),
						disabled: saving !== null,
						children: [
							saving === "quoted" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "animate-spin" }),
							" Get my quote ",
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, {})
						]
					})]
				})]
			})
		]
	}) });
}
function Heading({ title, sub }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
		className: "text-3xl font-medium",
		children: title
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
		className: "mt-1 text-muted-foreground",
		children: sub
	})] });
}
function Field({ label, htmlFor, hint, optional, className, children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: cn("space-y-1.5", className),
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Label, {
				htmlFor,
				className: "font-semibold",
				children: [
					label,
					" ",
					optional && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "font-normal text-muted-foreground",
						children: "(optional)"
					})
				]
			}),
			children,
			hint && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-xs text-muted-foreground",
				children: hint
			})
		]
	});
}
function Segmented({ value, onChange, options }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "grid grid-cols-2 gap-1 rounded-lg bg-muted p-1",
		role: "radiogroup",
		children: options.map((o) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
			type: "button",
			role: "radio",
			"aria-checked": value === o.value,
			onClick: () => onChange(o.value),
			className: cn("rounded-md px-3 py-1.5 text-sm font-semibold transition-all", value === o.value ? "bg-card shadow-soft" : "text-muted-foreground hover:text-foreground"),
			children: o.label
		}, o.value))
	});
}
function TieredOption({ svc, checked, tier, onToggle, onTier, note }) {
	const price = tierPrice(svc, tier);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: cn("rounded-xl border p-4", checked ? "border-brand/60 bg-accent/40" : "border-border"),
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
			className: "flex cursor-pointer items-start gap-3",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Checkbox, {
				checked,
				onCheckedChange: (v) => onToggle(v === true),
				className: "mt-0.5"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
				className: "flex-1",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: "flex items-baseline justify-between gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-sm font-semibold",
							children: svc.name
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "shrink-0 text-xs font-semibold text-brand-deep",
							children: checked && price != null ? formatMoney(price) : formatUnitPrice(svc)
						})]
					}),
					svc.description && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "mt-0.5 block text-xs text-muted-foreground",
						children: svc.description
					}),
					note && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "mt-0.5 block text-xs text-muted-foreground",
						children: note
					})
				]
			})]
		}), checked && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "mt-3 border-t border-border pt-3 pl-7",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Segmented, {
				value: tier,
				onChange: onTier,
				options: TIERS
			})
		})]
	});
}
function CountInput({ label, value, max, onChange }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mt-3 flex items-center justify-between gap-3 border-t border-border pt-3 pl-7",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "text-xs text-muted-foreground",
			children: label
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
			type: "number",
			min: 1,
			max,
			value,
			onChange: (e) => onChange(Math.min(max, Math.max(1, Number(e.target.value) || 1))),
			className: "h-8 w-20",
			"aria-label": label
		})]
	});
}
//#endregion
export { NewBookPage as component };
