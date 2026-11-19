import { _ as createFileRoute, g as lazyRouteComponent } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as objectType, r as stringType } from "../_libs/zod.mjs";
import { t as bookQuery } from "./books-B56HsLFq.mjs";
import { t as servicesQuery } from "./queries-D_GdtI3f.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/books.new-BmJApmvS.js
var $$splitComponentImporter = () => import("./books.new-ClQQqslp.mjs");
var Route = createFileRoute("/_authenticated/books/new")({
	validateSearch: objectType({ draft: stringType().uuid().optional() }),
	loaderDeps: ({ search }) => ({ draft: search.draft }),
	loader: async ({ context, deps }) => {
		await context.queryClient.ensureQueryData(servicesQuery);
		if (deps.draft) await context.queryClient.ensureQueryData(bookQuery(deps.draft));
	},
	head: () => ({ meta: [
		{ title: "New book — Publish Plug" },
		{
			name: "description",
			content: "Set up your book, choose services and get an instant quote."
		},
		{
			property: "og:title",
			content: "New book — Publish Plug"
		},
		{
			property: "og:description",
			content: "Set up your book, choose services and get an instant quote."
		},
		{
			property: "og:type",
			content: "website"
		},
		{
			name: "twitter:card",
			content: "summary"
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter, "component")
});
//#endregion
export { Route as t };
