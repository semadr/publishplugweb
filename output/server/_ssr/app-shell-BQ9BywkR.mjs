import { p as require_jsx_runtime } from "../_libs/@radix-ui/react-checkbox+[...].mjs";
import { t as SiteHeader } from "./site-header-DJyOXzU_.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/app-shell-BQ9BywkR.js
var import_jsx_runtime = require_jsx_runtime();
function AppShell({ children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "min-h-screen bg-gradient-paper",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SiteHeader, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("main", {
			className: "mx-auto max-w-6xl px-5 py-10",
			children
		})]
	});
}
//#endregion
export { AppShell as t };
