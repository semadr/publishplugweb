import { _ as createFileRoute, g as lazyRouteComponent } from "../_libs/@tanstack/react-router+[...].mjs";
import { t as bookQuery } from "./books-B56HsLFq.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/books._bookId-DAwJWV8a.js
var $$splitComponentImporter = () => import("./books._bookId-BQx_s0ec.mjs");
var Route = createFileRoute("/_authenticated/books/$bookId")({
	loader: ({ context, params }) => context.queryClient.ensureQueryData(bookQuery(params.bookId)),
	head: () => ({ meta: [
		{ title: "Your book — Publish Plug" },
		{
			name: "description",
			content: "Quote, order and progress for your book."
		},
		{
			property: "og:title",
			content: "Your book — Publish Plug"
		},
		{
			property: "og:description",
			content: "Quote, order and progress for your book."
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
