//#region node_modules/.nitro/vite/services/ssr/assets/__23tanstack-start-server-fn-resolver-BOGKtQvu.js
var manifest = { "9af72d1b1a3230650db36170d7c77424b773f9981ca91e85d1480f81afcced62": {
	functionName: "listServices_createServerFn_handler",
	importer: () => import("./_ssr/services.functions-B_2TUqVn.mjs")
} };
async function getServerFnById(id, access) {
	const serverFnInfo = manifest[id];
	if (!serverFnInfo) throw new Error("Server function info not found for " + id);
	const fnModule = serverFnInfo.module ??= await serverFnInfo.importer();
	if (!fnModule) throw new Error("Server function module not resolved for " + id);
	const action = fnModule[serverFnInfo.functionName];
	if (!action) throw new Error("Server function module export not resolved for serverFn ID: " + id);
	return action;
}
//#endregion
export { getServerFnById as t };
