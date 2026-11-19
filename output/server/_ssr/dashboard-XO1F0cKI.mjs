import { _ as createFileRoute, g as lazyRouteComponent } from "../_libs/@tanstack/react-router+[...].mjs";
import { i as myBooksQuery } from "./books-B56HsLFq.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/dashboard-XO1F0cKI.js
var $$splitComponentImporter = () => import("./dashboard-Dx6k4Lo4.mjs");
var Route = createFileRoute("/_authenticated/dashboard")({
	head: () => ({ meta: [
		{ title: "My books — Publish Plug" },
		{
			name: "description",
			content: "Track every book you're publishing with Publish Plug."
		},
		{
			property: "og:title",
			content: "My books — Publish Plug"
		},
		{
			property: "og:description",
			content: "Track every book you're publishing with Publish Plug."
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
	loader: ({ context }) => context.queryClient.ensureQueryData(myBooksQuery),
	component: lazyRouteComponent($$splitComponentImporter, "component")
});
//#endregion
export { Route as t };
