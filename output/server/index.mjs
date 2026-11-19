globalThis.__nitro_main__ = import.meta.url;
import { i as serve, r as NodeResponse } from "./_libs/h3-v2+rou3+srvx.mjs";
import { i as toEventHandler, n as defineHandler, o as HTTPError, r as defineLazyEventHandler, t as H3Core } from "./_libs/h3+rou3+srvx.mjs";
import { i as withoutTrailingSlash, n as joinURL, r as withLeadingSlash, t as decodePath } from "./_libs/ufo.mjs";
import { promises } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, resolve } from "node:path";
//#region #nitro-vite-setup
function lazyService(loader) {
	let promise, mod;
	return { fetch(req) {
		if (mod) return mod.fetch(req);
		if (!promise) promise = loader().then((_mod) => mod = _mod.default || _mod);
		return promise.then((mod) => mod.fetch(req));
	} };
}
var services = { ["ssr"]: lazyService(() => import("./_ssr/ssr.mjs")) };
globalThis.__nitro_vite_envs__ = services;
//#endregion
//#region node_modules/nitro/dist/runtime/internal/route-rules.mjs
var headers = ((m) => function headersRouteRule(event) {
	for (const [key, value] of Object.entries(m.options || {})) event.res.headers.set(key, value);
});
//#endregion
//#region #nitro/virtual/public-assets-data
var public_assets_data_default = {
	"/assets/app-shell-DFepTOIR.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"131-UikrCHPft5SXyg1Fij7GHrl1eT8\"",
		"mtime": "2026-11-18T18:32:33.011Z",
		"size": 305,
		"path": "../public/assets/app-shell-DFepTOIR.js"
	},
	"/assets/arrow-right-CISJ4JVR.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"99-l1In4CTtloh5YXZ88o5NP0+DTgk\"",
		"mtime": "2026-11-18T18:32:33.013Z",
		"size": 153,
		"path": "../public/assets/arrow-right-CISJ4JVR.js"
	},
	"/robots.txt": {
		"type": "text/plain; charset=utf-8",
		"etag": "\"ae-hLVBrSrDdpIw3Xl0dJPRkupPepQ\"",
		"mtime": "2026-11-18T16:13:15.903Z",
		"size": 174,
		"path": "../public/robots.txt"
	},
	"/assets/auth-ByplH-X4.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"4756-yWiNYq2HJ9TDmTYat+WsjJldc1E\"",
		"mtime": "2026-11-18T18:32:33.013Z",
		"size": 18262,
		"path": "../public/assets/auth-ByplH-X4.js"
	},
	"/assets/books-DMWuaj-p.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"bb4-rwP/tdUMFNGhVzd2/qBAgayFDpg\"",
		"mtime": "2026-11-18T18:32:33.014Z",
		"size": 2996,
		"path": "../public/assets/books-DMWuaj-p.js"
	},
	"/assets/books.new-2Pjz1fYJ.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"59d9-UNOTdHQWOtqEpdVZDP2T1TbqDGE\"",
		"mtime": "2026-11-18T18:32:33.017Z",
		"size": 23001,
		"path": "../public/assets/books.new-2Pjz1fYJ.js"
	},
	"/assets/books._bookId-p8sPkbj4.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"94fb-spezZq7V8XHPw/GbfSwCw5F0NXI\"",
		"mtime": "2026-11-18T18:32:33.016Z",
		"size": 38139,
		"path": "../public/assets/books._bookId-p8sPkbj4.js"
	},
	"/assets/catalog-ChugYwJs.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"19c7-TIpCozqIvdSw6IIS+bhbFtaHdcE\"",
		"mtime": "2026-11-18T18:32:33.019Z",
		"size": 6599,
		"path": "../public/assets/catalog-ChugYwJs.js"
	},
	"/assets/check-TFUV9rnF.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"70-Sf0MXY1LJtanGwzDQMWC56bwbYQ\"",
		"mtime": "2026-11-18T18:32:33.021Z",
		"size": 112,
		"path": "../public/assets/check-TFUV9rnF.js"
	},
	"/assets/dashboard-ByypZoy7.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1778-hm/fVl9teP1WfjD91/CV08RMQUw\"",
		"mtime": "2026-11-18T18:32:33.030Z",
		"size": 6008,
		"path": "../public/assets/dashboard-ByypZoy7.js"
	},
	"/assets/dist-DVWY18Mp.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"8bec-8dfTK07icVzJpQDJRbpdIDU5MaM\"",
		"mtime": "2026-11-18T18:32:33.030Z",
		"size": 35820,
		"path": "../public/assets/dist-DVWY18Mp.js"
	},
	"/assets/client-C4cCci5P.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"398b6-2oIBYbZepchmSgk69p0MdNlbMIs\"",
		"mtime": "2026-11-18T18:32:33.026Z",
		"size": 235702,
		"path": "../public/assets/client-C4cCci5P.js"
	},
	"/assets/input-dhMogyey.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"26c-C0r/1kLiAhw9LTID6jwtOZCB7Lc\"",
		"mtime": "2026-11-18T18:32:33.033Z",
		"size": 620,
		"path": "../public/assets/input-dhMogyey.js"
	},
	"/assets/invariant-CgFvOqN2.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1c2-OtvVxjJzKVqOT1XQL6Tnz3B8fGk\"",
		"mtime": "2026-11-18T18:32:33.033Z",
		"size": 450,
		"path": "../public/assets/invariant-CgFvOqN2.js"
	},
	"/assets/label-D3Gs-8z3.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"2e4-SIKRs+6xQPQwx8Mafso50EDPLc0\"",
		"mtime": "2026-11-18T18:32:33.033Z",
		"size": 740,
		"path": "../public/assets/label-D3Gs-8z3.js"
	},
	"/assets/matchContext-DAELj1yZ.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"a2-XSja8H5rbmgF6sxzsQGFDJJ489A\"",
		"mtime": "2026-11-18T18:32:33.035Z",
		"size": 162,
		"path": "../public/assets/matchContext-DAELj1yZ.js"
	},
	"/assets/not-found-DIgawKw1.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"37-RTB6YH5iXRKeXz1Sn6ZQ+vS0lnc\"",
		"mtime": "2026-11-18T18:32:33.071Z",
		"size": 55,
		"path": "../public/assets/not-found-DIgawKw1.js"
	},
	"/assets/index-zloNk7l1.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"5182e-ePNmIQrfAHk/T8GrN7zFpOxvVfI\"",
		"mtime": "2026-11-18T18:32:33.010Z",
		"size": 333870,
		"path": "../public/assets/index-zloNk7l1.js"
	},
	"/assets/preload-helper-B1jU6fjp.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"145b-9n0Nr1xeErDc7PuIOciGOv6Q9Xo\"",
		"mtime": "2026-11-18T18:32:33.077Z",
		"size": 5211,
		"path": "../public/assets/preload-helper-B1jU6fjp.js"
	},
	"/assets/pricing-C0sFnm6R.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"47c4-bUymCaUb8V00f6OcFsqjzObOnQM\"",
		"mtime": "2026-11-18T18:32:33.077Z",
		"size": 18372,
		"path": "../public/assets/pricing-C0sFnm6R.js"
	},
	"/assets/pricing-DCLJhVXW.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"121f-Wu9n3Ui2WmBDDCeoUS2tUMt9yqo\"",
		"mtime": "2026-11-18T18:32:33.078Z",
		"size": 4639,
		"path": "../public/assets/pricing-DCLJhVXW.js"
	},
	"/assets/publish-plug-hero-book.jpg.asset-DT0_Lw90.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"194-CO1Xgm/dh3DKURsCScEvnhhnGik\"",
		"mtime": "2026-11-18T18:32:33.078Z",
		"size": 404,
		"path": "../public/assets/publish-plug-hero-book.jpg.asset-DT0_Lw90.js"
	},
	"/assets/queries-vP7UapEO.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"9768-QNwLJJLYwr5Q6Ug2GjC8lrQRyMI\"",
		"mtime": "2026-11-18T18:32:33.079Z",
		"size": 38760,
		"path": "../public/assets/queries-vP7UapEO.js"
	},
	"/assets/route-BqPAioSb.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"8d-/m5rZV9wE0lmHNq5sF6fKkenuCQ\"",
		"mtime": "2026-11-18T18:32:33.079Z",
		"size": 141,
		"path": "../public/assets/route-BqPAioSb.js"
	},
	"/favicon.png": {
		"type": "image/png",
		"etag": "\"1115-NGKpnTKBNCBtGRA2g9OKrXkkM84\"",
		"mtime": "2026-11-18T16:13:15.902Z",
		"size": 4373,
		"path": "../public/favicon.png"
	},
	"/assets/routes-Do-IsLD-.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"3788-Ym0Vuy28OlMMtDnL/06VYkom7nQ\"",
		"mtime": "2026-11-18T18:32:33.079Z",
		"size": 14216,
		"path": "../public/assets/routes-Do-IsLD-.js"
	},
	"/assets/select-BZ-HPR0h.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"ea8b-EnXIXySkg0piYvAgFLim2osp+YI\"",
		"mtime": "2026-11-18T18:32:33.080Z",
		"size": 60043,
		"path": "../public/assets/select-BZ-HPR0h.js"
	},
	"/assets/site-footer-BaMP6Edu.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"6bf-FbfIL2HD4xeL07JikZzFMDaZA4Y\"",
		"mtime": "2026-11-18T18:32:33.080Z",
		"size": 1727,
		"path": "../public/assets/site-footer-BaMP6Edu.js"
	},
	"/assets/site-header-D8dNe4Lw.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"c315-ExwsQQsq81JyDdOIjJzQfYIX+so\"",
		"mtime": "2026-11-18T18:32:33.082Z",
		"size": 49941,
		"path": "../public/assets/site-header-D8dNe4Lw.js"
	},
	"/assets/sparkles-B5SHv8f2.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1e2-UO7fw6ZYUwrZunMlLx2AF7SKzRk\"",
		"mtime": "2026-11-18T18:32:33.083Z",
		"size": 482,
		"path": "../public/assets/sparkles-B5SHv8f2.js"
	},
	"/assets/staff-CSP1q60I.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"10af-qGhIGX0tA3+TPNOA6ursKCAdfPM\"",
		"mtime": "2026-11-18T18:32:33.083Z",
		"size": 4271,
		"path": "../public/assets/staff-CSP1q60I.js"
	},
	"/assets/stage-badge-ve6mbxW_.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"577-RULjv8hqrz8H0IBonF32bkEQTyk\"",
		"mtime": "2026-11-18T18:32:33.084Z",
		"size": 1399,
		"path": "../public/assets/stage-badge-ve6mbxW_.js"
	},
	"/assets/styles-D3J3VYpL.css": {
		"type": "text/css; charset=utf-8",
		"etag": "\"17324-ZUIaqvU2s/CIqFLVWIpcHrs1kpg\"",
		"mtime": "2026-11-18T18:32:33.086Z",
		"size": 95012,
		"path": "../public/assets/styles-D3J3VYpL.css"
	},
	"/assets/types-CcJvaFSg.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"dbea-CznCYxN5cWkUNv9zYwit+tEzqkI\"",
		"mtime": "2026-11-18T18:32:33.084Z",
		"size": 56298,
		"path": "../public/assets/types-CcJvaFSg.js"
	},
	"/assets/useSelector-D4oWBxsf.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"2a7f-rD29nko1p2/I9PFEmX+jUCYLOgY\"",
		"mtime": "2026-11-18T18:32:33.085Z",
		"size": 10879,
		"path": "../public/assets/useSelector-D4oWBxsf.js"
	},
	"/assets/useSuspenseQuery-B8YPIF2S.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"ad-+Ge8jWw8uhQVEt5UNhtfO+0zBN4\"",
		"mtime": "2026-11-18T18:32:33.085Z",
		"size": 173,
		"path": "../public/assets/useSuspenseQuery-B8YPIF2S.js"
	},
	"/assets/workspace-BbgRtZhm.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"409-cmKMyefR3VWVlAbrjS5XpISicY8\"",
		"mtime": "2026-11-18T18:32:33.086Z",
		"size": 1033,
		"path": "../public/assets/workspace-BbgRtZhm.js"
	},
	"/img/publish-plug-background.jpg": {
		"type": "image/jpeg",
		"etag": "\"2cd5b-WACOV3vOlxRYH9wKHQMTzCVqpIQ\"",
		"mtime": "2026-11-18T14:57:14.736Z",
		"size": 183643,
		"path": "../public/img/publish-plug-background.jpg"
	},
	"/img/publish-plug-favicon.png": {
		"type": "image/png",
		"etag": "\"10ccd-w+UDgk+aK6otF7XoJlozmze74cg\"",
		"mtime": "2026-11-18T14:16:38.628Z",
		"size": 68813,
		"path": "../public/img/publish-plug-favicon.png"
	},
	"/img/publish-plug-logo-white.png": {
		"type": "image/png",
		"etag": "\"1dc1c-H69M7S2NcQZXT4k55qIWJkJBkL4\"",
		"mtime": "2026-11-18T18:21:45.644Z",
		"size": 121884,
		"path": "../public/img/publish-plug-logo-white.png"
	},
	"/img/publish-plug-logo-main.png": {
		"type": "image/png",
		"etag": "\"2e0f3-1qlKGYVaNWNkyrYKQiWH4JcvmGw\"",
		"mtime": "2026-11-18T18:22:51.264Z",
		"size": 188659,
		"path": "../public/img/publish-plug-logo-main.png"
	}
};
//#endregion
//#region #nitro/virtual/public-assets-node
function readAsset(id) {
	const serverDir = dirname(fileURLToPath(globalThis.__nitro_main__));
	return promises.readFile(resolve(serverDir, public_assets_data_default[id].path));
}
//#endregion
//#region #nitro/virtual/public-assets
var publicAssetBases = {};
function isPublicAssetURL(id = "") {
	if (public_assets_data_default[id]) return true;
	for (const base in publicAssetBases) if (id.startsWith(base)) return true;
	return false;
}
function getAsset(id) {
	return public_assets_data_default[id];
}
//#endregion
//#region node_modules/nitro/dist/runtime/internal/static.mjs
var METHODS = /* @__PURE__ */ new Set(["HEAD", "GET"]);
var EncodingMap = {
	gzip: ".gz",
	br: ".br",
	zstd: ".zst"
};
var static_default = defineHandler((event) => {
	if (event.req.method && !METHODS.has(event.req.method)) return;
	let id = decodePath(withLeadingSlash(withoutTrailingSlash(event.url.pathname)));
	let asset;
	const encodings = [...(event.req.headers.get("accept-encoding") || "").split(",").map((e) => EncodingMap[e.trim()]).filter(Boolean).sort(), ""];
	for (const encoding of encodings) for (const _id of [id + encoding, joinURL(id, "index.html" + encoding)]) {
		const _asset = getAsset(_id);
		if (_asset) {
			asset = _asset;
			id = _id;
			break;
		}
	}
	if (!asset) {
		if (isPublicAssetURL(id)) {
			event.res.headers.delete("Cache-Control");
			throw new HTTPError({ status: 404 });
		}
		return;
	}
	if (encodings.length > 1) event.res.headers.append("Vary", "Accept-Encoding");
	if (event.req.headers.get("if-none-match") === asset.etag) {
		event.res.status = 304;
		event.res.statusText = "Not Modified";
		return "";
	}
	const ifModifiedSinceH = event.req.headers.get("if-modified-since");
	const mtimeDate = new Date(asset.mtime);
	if (ifModifiedSinceH && asset.mtime && new Date(ifModifiedSinceH) >= mtimeDate) {
		event.res.status = 304;
		event.res.statusText = "Not Modified";
		return "";
	}
	if (asset.type) event.res.headers.set("Content-Type", asset.type);
	if (asset.etag && !event.res.headers.has("ETag")) event.res.headers.set("ETag", asset.etag);
	if (asset.mtime && !event.res.headers.has("Last-Modified")) event.res.headers.set("Last-Modified", mtimeDate.toUTCString());
	if (asset.encoding && !event.res.headers.has("Content-Encoding")) event.res.headers.set("Content-Encoding", asset.encoding);
	if (asset.size > 0 && !event.res.headers.has("Content-Length")) event.res.headers.set("Content-Length", asset.size.toString());
	return readAsset(id);
});
//#endregion
//#region #nitro/virtual/routing
var findRouteRules = /* @__PURE__ */ (() => {
	const $0 = [{
		name: "headers",
		route: "/assets/**",
		handler: headers,
		options: { "cache-control": "public, max-age=31536000, immutable" }
	}];
	return (m, p) => {
		let r = [];
		if (p.charCodeAt(p.length - 1) === 47) p = p.slice(0, -1) || "/";
		let s = p.split("/");
		if (s.length > 1) {
			if (s[1] === "assets") r.unshift({
				data: $0,
				params: { "_": s.slice(2).join("/") }
			});
		}
		return r;
	};
})();
var _lazy_6blwBy = defineLazyEventHandler(() => import("./_chunks/ssr-renderer.mjs"));
var findRoute = /* @__PURE__ */ (() => {
	const data = {
		route: "/**",
		handler: _lazy_6blwBy
	};
	return ((_m, p) => {
		return {
			data,
			params: { "_": p.slice(1) }
		};
	});
})();
var globalMiddleware = [toEventHandler(static_default)].filter(Boolean);
//#endregion
//#region node_modules/nitro/dist/runtime/internal/error/prod.mjs
var errorHandler = (error, event) => {
	const res = defaultHandler(error, event);
	return new NodeResponse(typeof res.body === "string" ? res.body : JSON.stringify(res.body, null, 2), res);
};
function defaultHandler(error, event) {
	const unhandled = error.unhandled ?? !HTTPError.isError(error);
	const { status = 500, statusText = "" } = unhandled ? {} : error;
	if (status === 404) {
		const url = event.url || new URL(event.req.url);
		const baseURL = "/";
		if (/^\/[^/]/.test(baseURL) && !url.pathname.startsWith(baseURL)) return {
			status: 302,
			headers: new Headers({ location: `${baseURL}${url.pathname.slice(1)}${url.search}` })
		};
	}
	const headers = new Headers(unhandled ? {} : error.headers);
	headers.set("content-type", "application/json; charset=utf-8");
	return {
		status,
		statusText,
		headers,
		body: {
			error: true,
			...unhandled ? {
				status,
				unhandled: true
			} : typeof error.toJSON === "function" ? error.toJSON() : {
				status,
				statusText,
				message: error.message
			}
		}
	};
}
//#endregion
//#region #nitro/virtual/error-handler
var errorHandlers = [errorHandler];
async function error_handler_default(error, event) {
	for (const handler of errorHandlers) try {
		const response = await handler(error, event, { defaultHandler });
		if (response) return response;
	} catch (error) {
		console.error(error);
	}
}
//#endregion
//#region #nitro/virtual/app
function createNitroApp() {
	const captureError = (error, errorCtx) => {
		if (errorCtx?.event) {
			const errors = errorCtx.event.req.context?.nitro?.errors;
			if (errors) errors.push({
				error,
				context: errorCtx
			});
		}
	};
	const h3App = createH3App({ onError(error, event) {
		return error_handler_default(error, event);
	} });
	let appHandler = (req) => {
		req.context ||= {};
		req.context.nitro = req.context.nitro || { errors: [] };
		return h3App.fetch(req);
	};
	return {
		fetch: appHandler,
		h3: h3App,
		hooks: void 0,
		captureError
	};
}
function createH3App(config) {
	const h3App = new H3Core(config);
	h3App["~findRoute"] = (event) => findRoute(event.req.method, event.url.pathname);
	h3App["~middleware"].push(...globalMiddleware);
	h3App["~getMiddleware"] = (event, route) => {
		const pathname = event.url.pathname;
		const method = event.req.method;
		const middleware = [];
		const routeRules = getRouteRules(method, pathname);
		event.context.routeRules = routeRules?.routeRules;
		if (routeRules?.routeRuleMiddleware.length) middleware.push(...routeRules.routeRuleMiddleware);
		middleware.push(...h3App["~middleware"]);
		if (route?.data?.middleware?.length) middleware.push(...route.data.middleware);
		return middleware;
	};
	return h3App;
}
//#endregion
//#region node_modules/nitro/dist/runtime/internal/app.mjs
var APP_ID = "default";
function useNitroApp() {
	let instance = useNitroApp._instance;
	if (instance) return instance;
	instance = useNitroApp._instance = createNitroApp();
	globalThis.__nitro__ = globalThis.__nitro__ || {};
	globalThis.__nitro__[APP_ID] = instance;
	return instance;
}
function getRouteRules(method, pathname) {
	const m = findRouteRules(method, pathname);
	if (!m?.length) return { routeRuleMiddleware: [] };
	const routeRules = {};
	for (const layer of m) for (const rule of layer.data) {
		const currentRule = routeRules[rule.name];
		if (currentRule) {
			if (rule.options === false) {
				delete routeRules[rule.name];
				continue;
			}
			if (typeof currentRule.options === "object" && typeof rule.options === "object") currentRule.options = {
				...currentRule.options,
				...rule.options
			};
			else currentRule.options = rule.options;
			currentRule.route = rule.route;
			currentRule.params = {
				...currentRule.params,
				...layer.params
			};
		} else if (rule.options !== false) routeRules[rule.name] = {
			...rule,
			params: layer.params
		};
	}
	const middleware = [];
	const orderedRules = Object.values(routeRules).sort((a, b) => (a.handler?.order || 0) - (b.handler?.order || 0));
	for (const rule of orderedRules) {
		if (rule.options === false || !rule.handler) continue;
		middleware.push(rule.handler(rule));
	}
	return {
		routeRules,
		routeRuleMiddleware: middleware
	};
}
//#endregion
//#region node_modules/nitro/dist/runtime/internal/error/hooks.mjs
function _captureError(error, type) {
	console.error(`[${type}]`, error);
	useNitroApp().captureError?.(error, { tags: [type] });
}
function trapUnhandledErrors() {
	process.on("unhandledRejection", (error) => _captureError(error, "unhandledRejection"));
	process.on("uncaughtException", (error) => _captureError(error, "uncaughtException"));
}
//#endregion
//#region #nitro/virtual/tracing
var tracingSrvxPlugins = [];
//#endregion
//#region node_modules/nitro/dist/presets/node/runtime/node-server.mjs
var _parsedPort = Number.parseInt(process.env.NITRO_PORT ?? process.env.PORT ?? "");
var port = Number.isNaN(_parsedPort) ? 3e3 : _parsedPort;
var host = process.env.NITRO_HOST || process.env.HOST;
var cert = process.env.NITRO_SSL_CERT;
var key = process.env.NITRO_SSL_KEY;
var nitroApp = useNitroApp();
serve({
	port,
	hostname: host,
	tls: cert && key ? {
		cert,
		key
	} : void 0,
	fetch: nitroApp.fetch,
	plugins: [...tracingSrvxPlugins]
});
trapUnhandledErrors();
var node_server_default = {};
//#endregion
export { node_server_default as default };
