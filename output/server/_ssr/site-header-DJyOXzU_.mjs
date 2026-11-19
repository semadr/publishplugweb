import { r as __toESM } from "../_runtime.mjs";
import { t as supabase } from "./client-lquqATBu.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { b as useNavigate, y as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { p as require_jsx_runtime } from "../_libs/@radix-ui/react-checkbox+[...].mjs";
import { t as cva } from "../_libs/class-variance-authority+clsx.mjs";
import { n as Logo, r as cn, t as Button } from "./button-DUhiRPbF.mjs";
import { S as LayoutDashboard, _ as LogOut, a as ShieldCheck, l as Plus, m as Menu, t as X } from "../_libs/lucide-react.mjs";
import { a as useQueryClient, r as useQuery, t as queryOptions } from "../_libs/tanstack__react-query.mjs";
import { a as DialogOverlay, c as DialogTrigger, i as DialogDescription, n as DialogClose, o as DialogPortal, r as DialogContent, s as DialogTitle, t as Dialog } from "../_libs/@radix-ui/react-dialog+[...].mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/site-header-DJyOXzU_.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var Sheet = Dialog;
var SheetTrigger = DialogTrigger;
var SheetPortal = DialogPortal;
var SheetOverlay = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogOverlay, {
	className: cn("fixed inset-0 z-50 bg-black/80  data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0", className),
	...props,
	ref
}));
SheetOverlay.displayName = DialogOverlay.displayName;
var sheetVariants = cva("fixed z-50 gap-4 bg-background p-6 shadow-lg transition ease-in-out data-[state=closed]:duration-300 data-[state=open]:duration-500 data-[state=open]:animate-in data-[state=closed]:animate-out", {
	variants: { side: {
		top: "inset-x-0 top-0 border-b data-[state=closed]:slide-out-to-top data-[state=open]:slide-in-from-top",
		bottom: "inset-x-0 bottom-0 border-t data-[state=closed]:slide-out-to-bottom data-[state=open]:slide-in-from-bottom",
		left: "inset-y-0 left-0 h-full w-3/4 border-r data-[state=closed]:slide-out-to-left data-[state=open]:slide-in-from-left sm:max-w-sm",
		right: "inset-y-0 right-0 h-full w-3/4 border-l data-[state=closed]:slide-out-to-right data-[state=open]:slide-in-from-right sm:max-w-sm"
	} },
	defaultVariants: { side: "right" }
});
var SheetContent = import_react.forwardRef(({ side = "right", className, children, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SheetPortal, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SheetOverlay, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogContent, {
	ref,
	className: cn(sheetVariants({ side }), className),
	...props,
	children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogClose, {
		className: "absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background cursor-pointer transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-secondary",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "h-4 w-4" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "sr-only",
			children: "Close"
		})]
	}), children]
})] }));
SheetContent.displayName = DialogContent.displayName;
var SheetHeader = ({ className, ...props }) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
	className: cn("flex flex-col space-y-2 text-center sm:text-left", className),
	...props
});
SheetHeader.displayName = "SheetHeader";
var SheetFooter = ({ className, ...props }) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
	className: cn("flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2", className),
	...props
});
SheetFooter.displayName = "SheetFooter";
var SheetTitle = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogTitle, {
	ref,
	className: cn("text-lg font-semibold text-foreground", className),
	...props
}));
SheetTitle.displayName = DialogTitle.displayName;
var SheetDescription = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogDescription, {
	ref,
	className: cn("text-sm text-muted-foreground", className),
	...props
}));
SheetDescription.displayName = DialogDescription.displayName;
function useAuth() {
	const [user, setUser] = (0, import_react.useState)(null);
	const [ready, setReady] = (0, import_react.useState)(false);
	(0, import_react.useEffect)(() => {
		let active = true;
		supabase.auth.getSession().then(({ data }) => {
			if (!active) return;
			setUser(data.session?.user ?? null);
			setReady(true);
		});
		const { data: sub } = supabase.auth.onAuthStateChange((_event, session) => {
			setUser(session?.user ?? null);
			setReady(true);
		});
		return () => {
			active = false;
			sub.subscription.unsubscribe();
		};
	}, []);
	return {
		user,
		ready
	};
}
/** The signed-in user's roles, read from the protected roles table (RLS: own rows only). */
var myRolesQuery = queryOptions({
	queryKey: ["my-roles"],
	queryFn: async () => {
		const { data: auth } = await supabase.auth.getUser();
		if (!auth.user) return [];
		const { data, error } = await supabase.from("user_roles").select("role").eq("user_id", auth.user.id);
		if (error) throw error;
		return (data ?? []).map((r) => r.role);
	},
	staleTime: 6e4
});
/** UI hint only — every staff action is also enforced by the database. */
function useIsStaff(enabled = true) {
	const { data } = useQuery({
		...myRolesQuery,
		enabled
	});
	return !!data?.some((r) => r === "staff" || r === "admin");
}
var NAV = [
	{
		href: "/#services",
		label: "Services"
	},
	{
		href: "/#packages",
		label: "Packages"
	},
	{
		href: "/pricing",
		label: "Pricing"
	}
];
function SiteHeader() {
	const { user, ready } = useAuth();
	const navigate = useNavigate();
	const queryClient = useQueryClient();
	const [open, setOpen] = (0, import_react.useState)(false);
	const isStaff = useIsStaff(!!user);
	async function signOut() {
		await queryClient.cancelQueries();
		queryClient.clear();
		await supabase.auth.signOut();
		navigate({
			to: "/auth",
			replace: true
		});
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("header", {
		className: "sticky top-0 z-40 border-b border-border/70 bg-background/85 backdrop-blur-md",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-5",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Logo, {}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("nav", {
					className: "hidden items-center gap-7 md:flex",
					"aria-label": "Main",
					children: NAV.map((n) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
						href: n.href,
						className: "text-sm font-medium text-muted-foreground transition-colors hover:text-foreground",
						children: n.label
					}, n.href))
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "hidden items-center gap-2 md:flex",
					children: ready && user ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
						isStaff && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							variant: "ghost",
							size: "sm",
							asChild: true,
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
								to: "/staff",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShieldCheck, {}), " Team"]
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							variant: "ghost",
							size: "sm",
							asChild: true,
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
								to: "/dashboard",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LayoutDashboard, {}), " My books"]
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							variant: "brand",
							size: "sm",
							asChild: true,
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
								to: "/books/new",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, {}), " New book"]
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							variant: "ghost",
							size: "icon",
							onClick: signOut,
							"aria-label": "Sign out",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LogOut, {})
						})
					] }) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						variant: "ghost",
						size: "sm",
						asChild: true,
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/auth",
							children: "Sign in"
						})
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						variant: "brand",
						size: "sm",
						asChild: true,
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/auth",
							search: { mode: "signup" },
							children: "Start your book"
						})
					})] })
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Sheet, {
					open,
					onOpenChange: setOpen,
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SheetTrigger, {
						asChild: true,
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							variant: "ghost",
							size: "icon",
							className: "md:hidden",
							"aria-label": "Open menu",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Menu, {})
						})
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SheetContent, {
						side: "right",
						className: "w-72",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SheetTitle, {
							className: "font-display",
							children: "Menu"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-6 flex flex-col gap-1",
							children: [
								NAV.map((n) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
									href: n.href,
									onClick: () => setOpen(false),
									className: "rounded-md px-3 py-2.5 text-sm font-medium hover:bg-accent",
									children: n.label
								}, n.href)),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "my-3 h-px bg-border" }),
								user ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
									isStaff && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
										to: "/staff",
										onClick: () => setOpen(false),
										className: "rounded-md px-3 py-2.5 text-sm font-medium hover:bg-accent",
										children: "Team board"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
										to: "/dashboard",
										onClick: () => setOpen(false),
										className: "rounded-md px-3 py-2.5 text-sm font-medium hover:bg-accent",
										children: "My books"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
										to: "/books/new",
										onClick: () => setOpen(false),
										className: "rounded-md px-3 py-2.5 text-sm font-medium hover:bg-accent",
										children: "New book"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
										onClick: signOut,
										className: "rounded-md px-3 py-2.5 text-left text-sm font-medium hover:bg-accent",
										children: "Sign out"
									})
								] }) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
									to: "/auth",
									onClick: () => setOpen(false),
									className: "rounded-md px-3 py-2.5 text-sm font-medium hover:bg-accent",
									children: "Sign in"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
									variant: "brand",
									className: "mt-2",
									asChild: true,
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
										to: "/auth",
										search: { mode: "signup" },
										onClick: () => setOpen(false),
										children: "Start your book"
									})
								})] })
							]
						})]
					})]
				})
			]
		})
	});
}
//#endregion
export { myRolesQuery as n, useIsStaff as r, SiteHeader as t };
