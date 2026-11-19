import { p as require_jsx_runtime } from "../_libs/@radix-ui/react-checkbox+[...].mjs";
import { r as cn } from "./button-DUhiRPbF.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/stage-badge-CEa1zLIp.js
var import_jsx_runtime = require_jsx_runtime();
var STAGES = [
	{
		key: "draft",
		label: "Draft",
		next: "Finish setting up your book and request a quote"
	},
	{
		key: "quoted",
		label: "Quoted",
		next: "Review your quote and place the order"
	},
	{
		key: "ordered",
		label: "Ordered",
		next: "Upload your manuscript or recordings in the workspace below — our team is getting started"
	},
	{
		key: "content",
		label: "Content",
		next: "Writing and editing are under way"
	},
	{
		key: "design",
		label: "Design",
		next: "Cover, interior and ebook files are being made"
	},
	{
		key: "review",
		label: "In review",
		next: "Review your deliverables and approve them"
	},
	{
		key: "publishing",
		label: "Publishing",
		next: "ISBNs, final files and store set-up"
	},
	{
		key: "launched",
		label: "Launched",
		next: "Your book is live — keep the launch going"
	}
];
var stageIndex = (s) => STAGES.findIndex((x) => x.key === s);
var stageInfo = (s) => STAGES[stageIndex(s)] ?? STAGES[0];
var stageProgress = (s) => Math.round(stageIndex(s) / (STAGES.length - 1) * 100);
function StageBadge({ stage, className }) {
	const i = stageIndex(stage);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
		className: cn("inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 text-xs font-semibold", stage === "launched" ? "border-success/30 bg-success/10 text-success" : i >= 2 ? "border-brand/50 bg-accent text-accent-foreground" : "border-border bg-muted text-muted-foreground", className),
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: cn("h-1.5 w-1.5 rounded-full", stage === "launched" ? "bg-success" : i >= 2 ? "bg-brand" : "bg-muted-foreground/50") }), stageInfo(stage).label]
	});
}
//#endregion
export { stageProgress as a, stageInfo as i, StageBadge as n, stageIndex as r, STAGES as t };
