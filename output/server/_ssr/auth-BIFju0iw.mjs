import { r as __toESM } from "../_runtime.mjs";
import { t as supabase } from "./client-lquqATBu.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { b as useNavigate, y as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { p as require_jsx_runtime } from "../_libs/@radix-ui/react-checkbox+[...].mjs";
import { t as Route } from "./auth-QJN4TcJS.mjs";
import { n as Logo, t as Button } from "./button-DUhiRPbF.mjs";
import { t as Input } from "./input-CEWjXqu_.mjs";
import { t as Label } from "./label-CQLTf2jI.mjs";
import { t as publish_plug_hero_book_jpg_asset_default } from "./publish-plug-hero-book.jpg.asset-9K-ssNED.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { g as MailCheck, y as LoaderCircle } from "../_libs/lucide-react.mjs";
import { n as LovableMark, t as createLovableAuth } from "../_libs/lovable.dev__cloud-auth-js.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/auth-BIFju0iw.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var lovableAuth = createLovableAuth();
var lovable = { auth: { signInWithOAuth: async (provider, opts) => {
	const result = await lovableAuth.signInWithOAuth(provider, {
		...opts,
		extraParams: { ...opts?.extraParams }
	});
	if (result.redirected) return result;
	if (result.error) return result;
	try {
		await supabase.auth.setSession(result.tokens);
	} catch (e) {
		return { error: e instanceof Error ? e : new Error(String(e)) };
	}
	return result;
} } };
function safePath(p) {
	if (!p) return "/dashboard";
	try {
		const url = new URL(p, window.location.origin);
		if (url.origin !== window.location.origin) return "/dashboard";
		return url.pathname + url.search;
	} catch {
		return "/dashboard";
	}
}
function GoogleIcon() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", {
		xmlns: "http://www.w3.org/2000/svg",
		viewBox: "0 0 24 24",
		width: "18",
		height: "18",
		"aria-hidden": "true",
		className: "!size-[18px]",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
				fill: "#4285F4",
				d: "M23.49 12.27c0-.79-.07-1.54-.19-2.27H12v4.51h6.47c-.29 1.48-1.14 2.73-2.4 3.58v3h3.86c2.26-2.09 3.56-5.17 3.56-8.82z"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
				fill: "#34A853",
				d: "M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.86-3c-1.08.72-2.45 1.16-4.07 1.16-3.13 0-5.78-2.11-6.73-4.96H1.29v3.09C3.26 21.3 7.31 24 12 24z"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
				fill: "#FBBC05",
				d: "M5.27 14.29c-.25-.72-.38-1.49-.38-2.29s.14-1.57.38-2.29V6.62H1.29C.47 8.24 0 10.06 0 12s.47 3.76 1.29 5.38l3.98-3.09z"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
				fill: "#EA4335",
				d: "M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.31 0 3.26 2.7 1.29 6.62l3.98 3.09c.95-2.85 3.6-4.96 6.73-4.96z"
			})
		]
	});
}
function AuthPage() {
	const search = Route.useSearch();
	const navigate = useNavigate();
	const [mode, setMode] = (0, import_react.useState)(search.mode ?? "signin");
	const [name, setName] = (0, import_react.useState)("");
	const [email, setEmail] = (0, import_react.useState)("");
	const [password, setPassword] = (0, import_react.useState)("");
	const [busy, setBusy] = (0, import_react.useState)(false);
	const [sentTo, setSentTo] = (0, import_react.useState)(null);
	(0, import_react.useEffect)(() => {
		supabase.auth.getSession().then(({ data }) => {
			if (data.session) navigate({
				to: safePath(search.redirect),
				replace: true
			});
		});
		const { data } = supabase.auth.onAuthStateChange((event, session) => {
			if (event === "SIGNED_IN" && session) navigate({
				to: safePath(search.redirect),
				replace: true
			});
		});
		return () => data.subscription.unsubscribe();
	}, [navigate, search.redirect]);
	async function onSubmit(e) {
		e.preventDefault();
		setBusy(true);
		try {
			if (mode === "signup") {
				const { data, error } = await supabase.auth.signUp({
					email,
					password,
					options: {
						emailRedirectTo: window.location.origin + "/dashboard",
						data: { full_name: name }
					}
				});
				if (error) throw error;
				if (!data.session) setSentTo(email);
			} else {
				const { error } = await supabase.auth.signInWithPassword({
					email,
					password
				});
				if (error) throw error;
			}
		} catch (err) {
			toast.error(err instanceof Error ? err.message : "Something went wrong");
		} finally {
			setBusy(false);
		}
	}
	async function social(provider) {
		const result = await lovable.auth.signInWithOAuth(provider, { redirect_uri: window.location.origin + "/auth" });
		if (result.error) toast.error(result.error.message ?? "Sign-in failed");
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "grid min-h-screen bg-background lg:grid-cols-2",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex flex-col px-6 py-8 sm:px-12",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Logo, {}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mx-auto flex w-full max-w-sm flex-1 flex-col justify-center py-12",
					children: sentTo ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "space-y-4 text-center",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "mx-auto grid h-14 w-14 place-items-center rounded-2xl bg-accent",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MailCheck, { className: "h-7 w-7 text-brand-deep" })
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
								className: "text-3xl font-medium",
								children: "Check your inbox"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "text-muted-foreground",
								children: [
									"We sent a confirmation link to ",
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", {
										className: "text-foreground",
										children: sentTo
									}),
									". Click it to open your author dashboard."
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								variant: "ghost",
								onClick: () => {
									setSentTo(null);
									setMode("signin");
								},
								children: "Back to sign in"
							})
						]
					}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "eyebrow",
							children: mode === "signup" ? "Create your account" : "Welcome back"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
							className: "mt-2 text-4xl font-medium",
							children: mode === "signup" ? "Start your book" : "Sign in to Publish Plug"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-2 text-sm text-muted-foreground",
							children: mode === "signup" ? "Free to join. Get an itemised quote in minutes." : "Pick up where you left off."
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-8 grid gap-2.5",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
								type: "button",
								variant: "provider",
								size: "lg",
								onClick: () => social("google"),
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(GoogleIcon, {}), " Continue with Google"]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
								type: "button",
								variant: "provider",
								size: "lg",
								onClick: () => social("lovable"),
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LovableMark, { className: "!size-[18px]" }), " Continue with Lovable"]
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "my-6 flex items-center gap-3 text-xs uppercase tracking-wider text-muted-foreground",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "h-px flex-1 bg-border" }),
								" or with email ",
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "h-px flex-1 bg-border" })
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
							onSubmit,
							className: "space-y-4",
							children: [
								mode === "signup" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "space-y-1.5",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
										htmlFor: "name",
										children: "Full name"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
										id: "name",
										value: name,
										onChange: (e) => setName(e.target.value),
										required: true,
										autoComplete: "name"
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "space-y-1.5",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
										htmlFor: "email",
										children: "Email"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
										id: "email",
										type: "email",
										value: email,
										onChange: (e) => setEmail(e.target.value),
										required: true,
										autoComplete: "email"
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "space-y-1.5",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
										htmlFor: "password",
										children: "Password"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
										id: "password",
										type: "password",
										value: password,
										onChange: (e) => setPassword(e.target.value),
										required: true,
										minLength: 6,
										autoComplete: mode === "signup" ? "new-password" : "current-password"
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
									type: "submit",
									variant: "brand",
									size: "lg",
									className: "w-full",
									disabled: busy,
									children: [busy && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "animate-spin" }), mode === "signup" ? "Create account" : "Sign in"]
								})
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "mt-6 text-center text-sm text-muted-foreground",
							children: [
								mode === "signup" ? "Already have an account?" : "New to Publish Plug?",
								" ",
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									type: "button",
									className: "font-semibold text-brand-deep underline-offset-4 hover:underline",
									onClick: () => setMode(mode === "signup" ? "signin" : "signup"),
									children: mode === "signup" ? "Sign in" : "Create an account"
								})
							]
						})
					] })
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to: "/",
					className: "text-xs text-muted-foreground hover:text-foreground",
					children: "← Back to home"
				})
			]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "relative hidden overflow-hidden lg:block",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
					src: publish_plug_hero_book_jpg_asset_default.url,
					alt: "",
					className: "absolute inset-0 h-full w-full object-cover"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute inset-0 bg-gradient-to-t from-ink/70 via-ink/10 to-transparent" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("blockquote", {
					className: "absolute bottom-10 left-10 right-10 text-ink-foreground",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "font-display text-3xl italic leading-snug",
						children: "“From first idea to every bookshelf — without sending you to five different vendors.”"
					})
				})
			]
		})]
	});
}
//#endregion
export { AuthPage as component };
