import { y as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { p as require_jsx_runtime } from "../_libs/@radix-ui/react-checkbox+[...].mjs";
import { r as cn, t as Button } from "./button-DUhiRPbF.mjs";
import { t as publish_plug_hero_book_jpg_asset_default } from "./publish-plug-hero-book.jpg.asset-9K-ssNED.mjs";
import { D as Feather, E as FileText, F as BookOpen, I as ArrowRight, N as Check, a as ShieldCheck, b as Lightbulb, f as Palette, h as Megaphone, i as Sparkles, n as Users, p as Mic, w as GraduationCap, x as Library } from "../_libs/lucide-react.mjs";
import { l as formatRange, n as AUDIO_ADDON_DELIVERABLES, r as PACKAGES, t as AUDIO_ADDON } from "./pricing-BHybgAyD.mjs";
import { n as useSuspenseQuery } from "../_libs/tanstack__react-query.mjs";
import { t as SiteHeader } from "./site-header-DJyOXzU_.mjs";
import { t as servicesQuery } from "./queries-D_GdtI3f.mjs";
import { t as SiteFooter } from "./site-footer-CqO5Zi0_.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/routes-gbuWuEOp.js
var import_jsx_runtime = require_jsx_runtime();
var PILLARS = [
	{
		icon: Feather,
		name: "Create",
		copy: "Ghostwriting, every tier of editing, and turning recordings, interviews or research into a book.",
		items: [
			"Ghostwriting",
			"Developmental, line & copy editing",
			"Proofreading",
			"Transformations"
		]
	},
	{
		icon: Palette,
		name: "Design",
		copy: "A cover and interior that look like they came from a major publisher — print-ready everywhere.",
		items: [
			"Cover design",
			"Interior typesetting",
			"Ebook (EPUB)",
			"Print-ready PDF"
		]
	},
	{
		icon: BookOpen,
		name: "Publish",
		copy: "Your book in the formats readers want, built to the strictest store specifications.",
		items: [
			"E-Book package",
			"Print Book package",
			"Audio Add-On",
			"Print-ready & EPUB files"
		]
	},
	{
		icon: Megaphone,
		name: "Launch & distribute",
		copy: "ISBN paperwork, store listings, a launch plan, a book website and digital marketing.",
		items: [
			"ISBN set-up",
			"Multi-store distribution",
			"Launch plan & website",
			"Digital marketing"
		]
	}
];
var STARTS = [
	{
		icon: Lightbulb,
		label: "An idea"
	},
	{
		icon: FileText,
		label: "A manuscript"
	},
	{
		icon: Mic,
		label: "A voice recording"
	},
	{
		icon: GraduationCap,
		label: "A monograph"
	},
	{
		icon: Users,
		label: "An interview"
	}
];
var WHY = [
	{
		icon: Sparkles,
		title: "One team, whole journey",
		copy: "No juggling five vendors. Writers, editors, designers and launch specialists under one roof."
	},
	{
		icon: Mic,
		title: "Start from anything",
		copy: "We turn audio, interviews and academic monographs into books — something printers don't offer."
	},
	{
		icon: Library,
		title: "Global reach through partners",
		copy: "We work with established printers and distributors, so your book reaches stores worldwide."
	},
	{
		icon: ShieldCheck,
		title: "Your rights, always",
		copy: "You stay the author and publisher of record. Clear packages, no surprises."
	}
];
function Landing() {
	const { data: catalog } = useSuspenseQuery(servicesQuery);
	const audio = catalog.find((s) => s.code === AUDIO_ADDON);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "min-h-screen bg-background",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SiteHeader, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
				className: "relative overflow-hidden bg-gradient-paper",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mx-auto grid max-w-6xl items-center gap-12 px-5 pb-20 pt-14 md:grid-cols-[1.05fr_1fr] md:pb-28 md:pt-20",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "animate-rise space-y-7",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "eyebrow",
								children: "All-in-one self-publishing"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h1", {
								className: "text-5xl font-medium leading-[1.04] text-foreground md:text-7xl",
								children: [
									"Your story,",
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("br", {}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "italic text-gradient-brand",
										children: "published."
									})
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "max-w-lg text-lg leading-relaxed text-muted-foreground",
								children: "Publish Plug takes you from first idea to a finished book in print, ebook and audio — then gets it onto bookshelves around the world. You keep every right."
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex flex-wrap items-center gap-3",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
									variant: "brand",
									size: "xl",
									asChild: true,
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
										to: "/auth",
										search: { mode: "signup" },
										children: ["Start your book ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, {})]
									})
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
									variant: "outline",
									size: "xl",
									asChild: true,
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
										href: "#packages",
										children: "View packages"
									})
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
								className: "flex flex-wrap gap-x-6 gap-y-2 pt-2 text-sm text-muted-foreground",
								children: [
									"You keep 100% of your rights",
									"Print, ebook & audio",
									"Track every step online"
								].map((t) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
									className: "flex items-center gap-2",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, { className: "h-4 w-4 text-brand-deep" }),
										" ",
										t
									]
								}, t))
							})
						]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "relative animate-rise [animation-delay:150ms]",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "absolute -inset-4 rounded-[2rem] bg-gradient-brand opacity-25 blur-2xl",
								"aria-hidden": "true"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
								src: publish_plug_hero_book_jpg_asset_default.url,
								alt: "Two copies of a published purple paperback standing upright on cream linen, beside a cup of pens and a straw hat",
								width: 800,
								height: 977,
								className: "relative aspect-[4/5] w-full rounded-[1.75rem] object-cover object-center shadow-lift ring-1 ring-border"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "absolute -bottom-6 left-6 rounded-2xl border border-border bg-card px-5 py-4 shadow-lift",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-xs font-semibold uppercase tracking-wider text-muted-foreground",
									children: "Idea → Bookshelf"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "font-display text-lg",
									children: "8 clear stages, one dashboard"
								})]
							})
						]
					})]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
				className: "border-y border-border bg-card",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mx-auto flex max-w-6xl flex-col items-center gap-6 px-5 py-10 md:flex-row md:justify-between",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "font-display text-xl",
						children: "Start with whatever you have:"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
						className: "flex flex-wrap justify-center gap-3",
						children: STARTS.map(({ icon: Icon, label }) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
							className: "flex items-center gap-2 rounded-full border border-border bg-paper px-4 py-2 text-sm font-medium",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { className: "h-4 w-4 text-brand-deep" }),
								" ",
								label
							]
						}, label))
					})]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				id: "services",
				className: "mx-auto max-w-6xl scroll-mt-20 px-5 py-24",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "max-w-2xl space-y-4",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "eyebrow",
							children: "What we do"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "text-4xl font-medium md:text-5xl",
							children: "From idea to every bookshelf."
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-lg text-muted-foreground",
							children: "Printers give you a press. Distributors give you reach. We give you the whole journey — and pick only the services you need."
						})
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-14 grid gap-5 md:grid-cols-2 lg:grid-cols-4",
					children: PILLARS.map(({ icon: Icon, name, copy, items }, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
						className: "group relative flex flex-col rounded-2xl border border-border bg-card p-6 shadow-soft transition-all hover:-translate-y-1 hover:shadow-lift",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "font-display text-sm text-brand-deep",
								children: ["0", i + 1]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "mt-4 grid h-11 w-11 place-items-center rounded-xl bg-accent",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { className: "h-5 w-5 text-brand-deep" })
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
								className: "mt-5 text-2xl font-medium",
								children: name
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-2 text-sm leading-relaxed text-muted-foreground",
								children: copy
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
								className: "mt-5 space-y-2 border-t border-border pt-5 text-sm",
								children: items.map((it) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
									className: "flex items-start gap-2",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, { className: "mt-0.5 h-4 w-4 shrink-0 text-brand-deep" }),
										" ",
										it
									]
								}, it))
							})
						]
					}, name))
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
				id: "packages",
				className: "scroll-mt-20 bg-paper",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mx-auto max-w-6xl px-5 py-24",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex flex-col justify-between gap-6 md:flex-row md:items-end",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "max-w-xl space-y-4",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "eyebrow",
									children: "Packages"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
									className: "text-4xl font-medium md:text-5xl",
									children: "Choose your book."
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-muted-foreground",
									children: "All-in-one packages, each with a Standard and a Premium option. Add audio to either one."
								})
							]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							variant: "outline",
							asChild: true,
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
								to: "/pricing",
								children: ["See the full price list ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, {})]
							})
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-12 grid gap-6 md:grid-cols-3",
						children: [Object.keys(PACKAGES).map((code) => {
							const pkg = PACKAGES[code];
							const featured = code === "print";
							const svc = catalog.find((s) => s.code === pkg.serviceCode);
							return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
								className: cn("relative flex flex-col rounded-3xl border bg-card p-8 shadow-soft", featured ? "border-brand shadow-brand md:-translate-y-3" : "border-border"),
								children: [
									featured && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "absolute -top-3 left-8 rounded-full bg-gradient-brand px-3 py-1 text-xs font-bold uppercase tracking-wider text-primary-foreground",
										children: "Most chosen"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
										className: "text-2xl font-medium",
										children: pkg.name
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "mt-1 text-sm text-muted-foreground",
										children: pkg.tagline
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "mt-6 font-display text-3xl font-semibold",
										children: svc ? formatRange(svc) : "—"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "text-xs text-muted-foreground",
										children: "Standard – Premium"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
										className: "mt-6 flex-1 space-y-2.5 border-t border-border pt-6 text-sm",
										children: pkg.deliverables.map((d) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
											className: "flex items-start gap-2",
											children: [
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, { className: "mt-0.5 h-4 w-4 shrink-0 text-brand-deep" }),
												" ",
												d
											]
										}, d))
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
										variant: featured ? "brand" : "outline",
										size: "lg",
										className: "mt-8",
										asChild: true,
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
											to: "/auth",
											search: { mode: "signup" },
											children: ["Start with ", pkg.name]
										})
									})
								]
							}, code);
						}), audio && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
							className: "relative flex flex-col rounded-3xl border border-dashed border-flame/60 bg-card p-8 shadow-soft",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "absolute -top-3 left-8 rounded-full bg-gradient-flame px-3 py-1 text-xs font-bold uppercase tracking-wider text-primary-foreground",
									children: "Add-on"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
									className: "text-2xl font-medium",
									children: audio.name
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "mt-1 text-sm text-muted-foreground",
									children: audio.description
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "mt-6 font-display text-3xl font-semibold",
									children: formatRange(audio)
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-xs text-muted-foreground",
									children: "Standard – Premium · added to any package"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
									className: "mt-6 flex-1 space-y-2.5 border-t border-border pt-6 text-sm",
									children: AUDIO_ADDON_DELIVERABLES.map((d) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
										className: "flex items-start gap-2",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, { className: "mt-0.5 h-4 w-4 shrink-0 text-flame" }),
											" ",
											d
										]
									}, d))
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
									variant: "outline",
									size: "lg",
									className: "mt-8",
									asChild: true,
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
										to: "/auth",
										search: { mode: "signup" },
										children: "Add audio to my book"
									})
								})
							]
						})]
					})]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
				className: "mx-auto max-w-6xl px-5 py-24",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "grid gap-12 md:grid-cols-[1fr_1.4fr]",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "space-y-4",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "eyebrow",
								children: "Why Publish Plug"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
								className: "text-4xl font-medium md:text-5xl",
								children: "The front half and the back half — done for you."
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "brand-rule" })
						]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "grid gap-8 sm:grid-cols-2",
						children: WHY.map(({ icon: Icon, title, copy }) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "space-y-3",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { className: "h-6 w-6 text-brand-deep" }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
									className: "text-xl font-medium",
									children: title
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-sm leading-relaxed text-muted-foreground",
									children: copy
								})
							]
						}, title))
					})]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
				className: "px-5 pb-24",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "relative mx-auto max-w-6xl overflow-hidden rounded-[2rem] bg-gradient-ink px-8 py-16 text-center text-ink-foreground md:px-16",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "absolute -right-24 -top-24 h-72 w-72 rounded-full bg-gradient-brand opacity-30 blur-3xl",
							"aria-hidden": "true"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h2", {
							className: "relative text-4xl font-medium md:text-5xl",
							children: ["Ready to see your name ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "italic text-gradient-brand",
								children: "on the cover?"
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "relative mx-auto mt-4 max-w-xl text-ink-foreground/70",
							children: "Create a free account, tell us about your book and get an itemised quote in minutes."
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							variant: "brand",
							size: "xl",
							className: "relative mt-8",
							asChild: true,
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
								to: "/auth",
								search: { mode: "signup" },
								children: ["Start your book ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, {})]
							})
						})
					]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SiteFooter, {})
		]
	});
}
//#endregion
export { Landing as component };
