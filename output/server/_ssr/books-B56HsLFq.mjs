import { t as supabase } from "./client-lquqATBu.mjs";
import { i as SOURCE_SERVICE, r as PACKAGES } from "./pricing-BHybgAyD.mjs";
import { t as queryOptions } from "../_libs/tanstack__react-query.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/books-B56HsLFq.js
var myBooksQuery = queryOptions({
	queryKey: ["books"],
	queryFn: async () => {
		const { data, error } = await supabase.from("projects").select("*, orders(price, in_package)").order("created_at", { ascending: false });
		if (error) throw error;
		return data;
	}
});
var bookQuery = (id) => queryOptions({
	queryKey: ["book", id],
	queryFn: async () => {
		const [p, o, f, pay] = await Promise.all([
			supabase.from("projects").select("*").eq("id", id).maybeSingle(),
			supabase.from("orders").select("*, services(name, pricing_type)").eq("project_id", id).order("in_package", { ascending: false }).order("created_at"),
			supabase.from("project_files").select("*").eq("project_id", id).order("created_at"),
			supabase.from("payments").select("*").eq("project_id", id).order("created_at", { ascending: false })
		]);
		if (p.error) throw p.error;
		if (o.error) throw o.error;
		if (f.error) throw f.error;
		if (pay.error) throw pay.error;
		return {
			project: p.data,
			orders: o.data ?? [],
			files: f.data ?? [],
			payment: pay.data?.[0] ?? null
		};
	}
});
var toNum = (v) => v == null ? null : Number(v);
var emptyDraft = () => ({
	title: "",
	subtitle: "",
	author_name: "",
	genre: "",
	language: "English",
	trim_size: "6x9",
	binding: "paperback",
	paper: "white",
	word_count: 5e4,
	ai_assisted: false,
	source_type: "manuscript",
	audio_hours: 0,
	rights_confirmed: false,
	package: "print",
	packageTier: "standard",
	extras: [],
	tiers: {},
	isbnCount: 1,
	storeCount: 2,
	notes: ""
});
/** Rebuild wizard state from a saved project and its quote lines. */
function draftFromBook(project, orders) {
	const auto = SOURCE_SERVICE[project.source_type];
	const extras = orders.filter((o) => !o.in_package && o.service_code !== auto);
	const tiers = {};
	for (const o of extras) if (o.tier) tiers[o.service_code] = o.tier;
	const pkgCode = project.package ?? null;
	const qty = (code) => Number(extras.find((o) => o.service_code === code)?.quantity ?? 0);
	return {
		title: project.title,
		subtitle: project.subtitle ?? "",
		author_name: project.author_name ?? "",
		genre: project.genre ?? "",
		language: project.language,
		trim_size: project.trim_size,
		binding: project.binding,
		paper: project.paper,
		word_count: project.word_count,
		ai_assisted: project.ai_assisted,
		source_type: project.source_type,
		audio_hours: Number(project.audio_hours),
		rights_confirmed: project.rights_confirmed,
		package: pkgCode && PACKAGES[pkgCode] ? pkgCode : null,
		packageTier: project.package_tier ?? "standard",
		extras: extras.map((o) => o.service_code),
		tiers,
		isbnCount: qty("isbn_setup") || 1,
		storeCount: qty("distribution_setup") || 2,
		notes: project.notes ?? ""
	};
}
async function saveBook(opts) {
	const { draft, lines, stage, pageCount } = opts;
	const row = {
		title: draft.title.trim(),
		subtitle: draft.subtitle.trim() || null,
		author_name: draft.author_name.trim() || null,
		genre: draft.genre || null,
		language: draft.language || "English",
		trim_size: draft.trim_size,
		binding: draft.binding,
		paper: draft.paper,
		word_count: Math.max(0, Math.round(draft.word_count || 0)),
		page_count_est: pageCount || null,
		ai_assisted: draft.ai_assisted,
		source_type: draft.source_type,
		audio_hours: Math.max(0, draft.audio_hours || 0),
		rights_confirmed: draft.rights_confirmed,
		package: draft.package,
		package_tier: draft.packageTier,
		notes: draft.notes.trim() || null,
		stage
	};
	let id = opts.id;
	if (id) {
		const { error } = await supabase.from("projects").update(row).eq("id", id);
		if (error) throw error;
		const del = await supabase.from("orders").delete().eq("project_id", id);
		if (del.error) throw del.error;
	} else {
		const { data, error } = await supabase.from("projects").insert(row).select("id").single();
		if (error) throw error;
		id = data.id;
	}
	if (lines.length) {
		const inserts = lines.map((l) => ({
			project_id: id,
			service_code: l.code,
			quantity: l.quantity,
			tier: l.tier,
			in_package: l.inPackage
		}));
		const { error } = await supabase.from("orders").insert(inserts);
		if (error) throw error;
	}
	return id;
}
//#endregion
export { saveBook as a, myBooksQuery as i, draftFromBook as n, toNum as o, emptyDraft as r, bookQuery as t };
