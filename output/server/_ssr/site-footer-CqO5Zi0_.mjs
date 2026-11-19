import { y as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { p as require_jsx_runtime } from "../_libs/@radix-ui/react-checkbox+[...].mjs";
import { n as Logo } from "./button-DUhiRPbF.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/site-footer-CqO5Zi0_.js
var import_jsx_runtime = require_jsx_runtime();
function SiteFooter() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("footer", {
		className: "bg-gradient-ink text-ink-foreground",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mx-auto grid max-w-6xl gap-10 px-5 py-14 md:grid-cols-[1.4fr_1fr_1fr]",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "space-y-4",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Logo, { inverted: true }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "max-w-sm text-sm leading-relaxed text-ink-foreground/70",
						children: "An all-in-one self-publishing company. We help you create, publish and distribute your book — and you keep full ownership of your work."
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "space-y-3 text-sm",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "eyebrow",
							children: "Explore"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
							href: "/#services",
							className: "block text-ink-foreground/80 hover:text-brand",
							children: "Services"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
							href: "/#packages",
							className: "block text-ink-foreground/80 hover:text-brand",
							children: "Packages"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/pricing",
							className: "block text-ink-foreground/80 hover:text-brand",
							children: "Pricing"
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "space-y-3 text-sm",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "eyebrow",
							children: "Authors"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/auth",
							search: { mode: "signup" },
							className: "block text-ink-foreground/80 hover:text-brand",
							children: "Start your book"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/auth",
							className: "block text-ink-foreground/80 hover:text-brand",
							children: "Sign in"
						})
					]
				})
			]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "border-t border-ink-foreground/10",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "mx-auto max-w-6xl px-5 py-5 text-xs text-ink-foreground/50",
				children: [
					"© ",
					(/* @__PURE__ */ new Date()).getFullYear(),
					" Publish Plug. Your story, published."
				]
			})
		})]
	});
}
//#endregion
export { SiteFooter as t };
