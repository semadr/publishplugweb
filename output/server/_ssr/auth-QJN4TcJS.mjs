import { _ as createFileRoute, g as lazyRouteComponent } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as objectType, r as stringType, t as enumType } from "../_libs/zod.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/auth-QJN4TcJS.js
var $$splitComponentImporter = () => import("./auth-BIFju0iw.mjs");
var searchSchema = objectType({
	mode: enumType(["signin", "signup"]).optional(),
	redirect: stringType().optional()
});
var Route = createFileRoute("/auth")({
	validateSearch: searchSchema,
	head: () => ({ meta: [
		{ title: "Sign in — Publish Plug" },
		{
			name: "description",
			content: "Sign in or create your Publish Plug author account."
		},
		{
			property: "og:title",
			content: "Sign in — Publish Plug"
		},
		{
			property: "og:description",
			content: "Sign in or create your Publish Plug author account."
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
