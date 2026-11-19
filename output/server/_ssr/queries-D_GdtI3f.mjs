import { t as queryOptions } from "../_libs/tanstack__react-query.mjs";
import { t as getServerFnById } from "../__23tanstack-start-server-fn-resolver-BOGKtQvu.mjs";
import { a as TSS_SERVER_FUNCTION, l as createServerFn } from "./createServerFn-DDDJMFWM.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/queries-D_GdtI3f.js
var createSsrRpc = (functionId) => {
	const url = "/_serverFn/" + functionId;
	const serverFnMeta = { id: functionId };
	const fn = async (...args) => {
		return (await getServerFnById(functionId, { origin: "server" }))(...args);
	};
	return Object.assign(fn, {
		url,
		serverFnMeta,
		[TSS_SERVER_FUNCTION]: true
	});
};
var listServices = createServerFn({ method: "GET" }).handler(createSsrRpc("9af72d1b1a3230650db36170d7c77424b773f9981ca91e85d1480f81afcced62"));
var servicesQuery = queryOptions({
	queryKey: ["services"],
	queryFn: () => listServices(),
	staleTime: 3e5
});
//#endregion
export { servicesQuery as t };
