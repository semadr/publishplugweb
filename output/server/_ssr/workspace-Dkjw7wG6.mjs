import { t as supabase } from "./client-lquqATBu.mjs";
import { t as queryOptions } from "../_libs/tanstack__react-query.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/workspace-Dkjw7wG6.js
var messagesQuery = (projectId) => queryOptions({
	queryKey: ["messages", projectId],
	queryFn: async () => {
		const { data, error } = await supabase.from("messages").select("*").eq("project_id", projectId).order("created_at");
		if (error) throw error;
		return data ?? [];
	}
});
var allBooksQuery = queryOptions({
	queryKey: ["staff-books"],
	queryFn: async () => {
		const { data, error } = await supabase.from("projects").select("*, orders(price, in_package)").neq("stage", "draft").order("updated_at", { ascending: false });
		if (error) throw error;
		return data ?? [];
	}
});
var FILE_KIND_LABELS = {
	manuscript: "Manuscript",
	audio: "Audio recording",
	transcript: "Transcript",
	consent: "Consent form",
	cover: "Cover",
	interior: "Interior",
	epub: "Ebook (EPUB)",
	audio_final: "Final audio",
	reference: "Reference"
};
/** What authors upload vs. what the team delivers. */
var AUTHOR_KINDS = [
	"manuscript",
	"audio",
	"reference"
];
var DELIVERABLE_KINDS = [
	"transcript",
	"cover",
	"interior",
	"epub",
	"audio_final"
];
function storagePath(projectId, kind, fileName) {
	return `${projectId}/${kind}/${Date.now()}-${fileName.replace(/[^\w.-]+/g, "_")}`;
}
function formatBytes(n) {
	if (!n) return "";
	if (n < 1048576) return `${Math.max(1, Math.round(n / 1024))} KB`;
	return `${(n / 1024 / 1024).toFixed(1)} MB`;
}
//#endregion
export { formatBytes as a, allBooksQuery as i, DELIVERABLE_KINDS as n, messagesQuery as o, FILE_KIND_LABELS as r, storagePath as s, AUTHOR_KINDS as t };
