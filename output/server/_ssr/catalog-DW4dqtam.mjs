import { r as __toESM } from "../_runtime.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { n as CheckboxIndicator, p as require_jsx_runtime, t as Checkbox$1 } from "../_libs/@radix-ui/react-checkbox+[...].mjs";
import { r as cn } from "./button-DUhiRPbF.mjs";
import { N as Check } from "../_libs/lucide-react.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/catalog-DW4dqtam.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var Checkbox = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Checkbox$1, {
	ref,
	className: cn("grid place-content-center peer h-4 w-4 shrink-0 rounded-sm border border-primary shadow cursor-pointer focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground", className),
	...props,
	children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CheckboxIndicator, {
		className: cn("grid place-content-center text-current"),
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, { className: "h-4 w-4" })
	})
}));
Checkbox.displayName = Checkbox$1.displayName;
var SOURCE_OPTIONS = [
	{
		value: "idea",
		label: "Idea or outline",
		blurb: "You have the idea; our ghostwriters write the book with you.",
		needs: "Ghostwriting is ₦2 per word of the finished book."
	},
	{
		value: "manuscript",
		label: "Raw manuscript",
		blurb: "A finished or rough draft, ready for editing and design.",
		needs: "Upload a .docx, .pdf or .txt file in your workspace."
	},
	{
		value: "audio",
		label: "Audio recording",
		blurb: "Talks, voice notes or sermons shaped into a readable book.",
		needs: "Upload .mp3, .m4a or .wav files (up to 200 MB each)."
	},
	{
		value: "monograph",
		label: "Monograph",
		blurb: "Academic research rewritten for a general reader.",
		needs: "You must confirm you still hold the rights to the text."
	},
	{
		value: "interview",
		label: "Interview",
		blurb: "Recorded conversations turned into a structured book.",
		needs: "A signed consent form is required from every interviewee."
	}
];
var MODULE_LABELS = {
	A: {
		name: "Create",
		pillar: "Content"
	},
	B: {
		name: "Design",
		pillar: "Book design"
	},
	C: {
		name: "Publish",
		pillar: "Formats"
	},
	D: {
		name: "Launch & distribute",
		pillar: "Marketing and distribution"
	},
	P: {
		name: "Packages",
		pillar: "All-in-one"
	}
};
var GENRES = [
	"Fiction",
	"Memoir & biography",
	"Business",
	"Self-help",
	"Faith & spirituality",
	"Children's",
	"Poetry",
	"Academic & non-fiction",
	"Other"
];
var TRIM_SIZES = [
	{
		value: "5x8",
		label: "5 × 8 in"
	},
	{
		value: "5.5x8.5",
		label: "5.5 × 8.5 in"
	},
	{
		value: "6x9",
		label: "6 × 9 in"
	},
	{
		value: "8.5x11",
		label: "8.5 × 11 in"
	}
];
//#endregion
export { TRIM_SIZES as a, SOURCE_OPTIONS as i, GENRES as n, MODULE_LABELS as r, Checkbox as t };
