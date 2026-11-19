import { r as __toESM } from "../_runtime.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { y as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { p as require_jsx_runtime, u as Slot } from "../_libs/@radix-ui/react-checkbox+[...].mjs";
import { n as clsx, t as cva } from "../_libs/class-variance-authority+clsx.mjs";
import { t as twMerge } from "../_libs/tailwind-merge.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/button-DUhiRPbF.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var publish_plug_logo_png_asset_default = {
	version: 1,
	asset_id: "5570e00e-2b1f-4a02-b9c9-f39ef23bc9ea",
	project_id: "32b86e61-64bf-4c02-8197-1b6792fffa31",
	url: "/img/publish-plug-logo-main.png",
	r2_key: "a/v1/32b86e61-64bf-4c02-8197-1b6792fffa31/5570e00e-2b1f-4a02-b9c9-f39ef23bc9ea/publish-plug-logo.png",
	original_filename: "publish-plug-logo.png",
	size: 253508,
	content_type: "image/png",
	created_at: "2026-11-18T14:29:26Z"
};
var publish_plug_logo_white_png_asset_default = {
	version: 1,
	asset_id: "45edefac-e06c-4b5d-9ea9-985c499c55b1",
	project_id: "32b86e61-64bf-4c02-8197-1b6792fffa31",
	url: "/img/publish-plug-logo-white.png",
	r2_key: "a/v1/32b86e61-64bf-4c02-8197-1b6792fffa31/45edefac-e06c-4b5d-9ea9-985c499c55b1/publish-plug-logo-white.png",
	original_filename: "publish-plug-logo-white.png",
	size: 202109,
	content_type: "image/png",
	created_at: "2026-11-18T14:29:27Z"
};
function cn(...inputs) {
	return twMerge(clsx(inputs));
}
function Logo({ className, inverted = false }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
		to: "/",
		className: cn("inline-flex items-center", className),
		"aria-label": "Publish Plug home",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
			src: inverted ? publish_plug_logo_white_png_asset_default.url : publish_plug_logo_png_asset_default.url,
			alt: "Publish Plug",
			width: 1020,
			height: 196,
			className: "h-7 w-auto md:h-8"
		})
	});
}
var buttonVariants = cva("inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-semibold cursor-pointer transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 disabled:cursor-not-allowed [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0", {
	variants: {
		variant: {
			default: "bg-primary text-primary-foreground shadow-sm hover:bg-primary/90",
			brand: "bg-gradient-brand text-primary-foreground font-semibold shadow-brand hover:brightness-105 hover:-translate-y-px transition-all",
			ink: "bg-ink text-ink-foreground shadow-sm hover:bg-ink/90",
			soft: "bg-accent text-accent-foreground hover:bg-accent/80",
			provider: "border border-provider-border bg-provider text-provider-foreground font-medium hover:brightness-95",
			destructive: "bg-destructive text-destructive-foreground shadow-sm hover:bg-destructive/90",
			outline: "border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground",
			secondary: "bg-secondary text-secondary-foreground shadow-sm hover:bg-secondary/80",
			ghost: "hover:bg-accent hover:text-accent-foreground",
			link: "text-primary underline-offset-4 hover:underline"
		},
		size: {
			default: "h-9 px-4 py-2",
			sm: "h-8 rounded-md px-3 text-xs",
			lg: "h-11 rounded-lg px-7 text-[0.95rem]",
			xl: "h-13 rounded-xl px-8 text-base",
			icon: "h-9 w-9"
		}
	},
	defaultVariants: {
		variant: "default",
		size: "default"
	}
});
var Button = import_react.forwardRef(({ className, variant, size, asChild = false, ...props }, ref) => {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(asChild ? Slot : "button", {
		className: cn(buttonVariants({
			variant,
			size,
			className
		})),
		ref,
		...props
	});
});
Button.displayName = "Button";
//#endregion
export { Logo as n, cn as r, Button as t };
