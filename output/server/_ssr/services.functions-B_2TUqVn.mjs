import { t as createClient } from "../_libs/supabase__supabase-js.mjs";
import { a as TSS_SERVER_FUNCTION, l as createServerFn } from "./createServerFn-DDDJMFWM.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/services.functions-B_2TUqVn.js
var createServerRpc = (serverFnMeta, splitImportFn) => {
	const url = "/_serverFn/" + serverFnMeta.id;
	return Object.assign(splitImportFn, {
		url,
		serverFnMeta,
		[TSS_SERVER_FUNCTION]: true
	});
};
var listServices_createServerFn_handler = createServerRpc({
	id: "9af72d1b1a3230650db36170d7c77424b773f9981ca91e85d1480f81afcced62",
	name: "listServices",
	filename: "src/lib/services.functions.ts"
}, (opts) => listServices.__executeServer(opts));
var listServices = createServerFn({ method: "GET" }).handler(listServices_createServerFn_handler, async () => {
	const key = process.env["SUPABASE_PUBLISHABLE_KEY"];
	const { data, error } = await createClient(process.env["SUPABASE_URL"], key, {
		auth: {
			persistSession: false,
			autoRefreshToken: false,
			storage: void 0
		},
		global: { fetch: (input, init) => {
			const h = new Headers(init?.headers);
			if (key.startsWith("sb_") && h.get("Authorization") === `Bearer ${key}`) h.delete("Authorization");
			h.set("apikey", key);
			return fetch(input, {
				...init,
				headers: h
			});
		} }
	}).from("services").select("code, name, description, module, pricing_type, base_price, premium_price, price_note, sort_order, active").eq("active", true).order("sort_order");
	if (error) {
		console.error("listServices failed", error);
		return [];
	}
	return (data ?? []).map((s) => ({
		...s,
		base_price: s.base_price == null ? null : Number(s.base_price),
		premium_price: s.premium_price == null ? null : Number(s.premium_price)
	}));
});
//#endregion
export { listServices_createServerFn_handler };
