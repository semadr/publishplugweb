import { r as __toESM } from "../_runtime.mjs";
import { t as supabase } from "./client-lquqATBu.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { b as useNavigate, y as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { p as require_jsx_runtime } from "../_libs/@radix-ui/react-checkbox+[...].mjs";
import { r as cn, t as Button } from "./button-DUhiRPbF.mjs";
import { t as Input } from "./input-CEWjXqu_.mjs";
import { t as Label } from "./label-CQLTf2jI.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { A as CircleCheck, L as ArrowLeft, N as Check, O as Download, T as FileUp, a as ShieldCheck, d as Paperclip, k as CreditCard, r as Trash2, s as Send, t as X, u as Pencil, v as Lock, y as LoaderCircle } from "../_libs/lucide-react.mjs";
import { c as formatMoney, f as quoteTotals, r as PACKAGES } from "./pricing-BHybgAyD.mjs";
import { a as useQueryClient, n as useSuspenseQuery, r as useQuery } from "../_libs/tanstack__react-query.mjs";
import { o as toNum, t as bookQuery } from "./books-B56HsLFq.mjs";
import { t as Route } from "./books._bookId-DAwJWV8a.mjs";
import { a as DialogOverlay$1, i as DialogDescription$1, n as DialogClose, o as DialogPortal$1, r as DialogContent$1, s as DialogTitle$1, t as Dialog$1 } from "../_libs/@radix-ui/react-dialog+[...].mjs";
import { r as useIsStaff } from "./site-header-DJyOXzU_.mjs";
import { t as AppShell } from "./app-shell-BQ9BywkR.mjs";
import { a as SelectTrigger, i as SelectItem, n as Select, o as SelectValue, r as SelectContent, s as Textarea, t as QuoteTable } from "./select-C45ioakc.mjs";
import { i as stageInfo, n as StageBadge, r as stageIndex, t as STAGES } from "./stage-badge-CEa1zLIp.mjs";
import { a as TRIM_SIZES, i as SOURCE_OPTIONS, t as Checkbox } from "./catalog-DW4dqtam.mjs";
import { a as formatBytes, n as DELIVERABLE_KINDS, o as messagesQuery, r as FILE_KIND_LABELS, s as storagePath, t as AUTHOR_KINDS } from "./workspace-Dkjw7wG6.mjs";
import { i as TabsTrigger$1, n as TabsContent$1, r as TabsList$1, t as Tabs$1 } from "../_libs/radix-ui__react-tabs.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/books._bookId-BQx_s0ec.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function StageBar({ stage }) {
	const current = stageIndex(stage);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ol", {
		className: "grid grid-cols-4 gap-y-4 sm:grid-cols-8",
		"aria-label": "Book progress",
		children: STAGES.map((s, i) => {
			const done = i < current;
			const active = i === current;
			return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
				className: "relative flex flex-col items-center text-center",
				"aria-current": active ? "step" : void 0,
				children: [
					i > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: cn("absolute right-1/2 top-3.5 h-0.5 w-full -translate-y-1/2", i <= current ? "bg-brand" : "bg-border", i === 4 && "hidden sm:block"),
						"aria-hidden": "true"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: cn("relative z-10 grid h-7 w-7 place-items-center rounded-full border-2 text-xs font-bold", done && "border-brand bg-brand text-primary-foreground", active && "border-brand bg-card text-brand-deep ring-4 ring-brand/20", !done && !active && "border-border bg-card text-muted-foreground"),
						children: done ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, { className: "h-3.5 w-3.5" }) : i + 1
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: cn("mt-2 text-[11px] font-semibold leading-tight", active ? "text-foreground" : "text-muted-foreground"),
						children: s.label
					})
				]
			}, s.key);
		})
	});
}
var Dialog = Dialog$1;
var DialogPortal = DialogPortal$1;
var DialogOverlay = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogOverlay$1, {
	ref,
	className: cn("fixed inset-0 z-50 bg-black/80  data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0", className),
	...props
}));
DialogOverlay.displayName = DialogOverlay$1.displayName;
var DialogContent = import_react.forwardRef(({ className, children, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogPortal, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogOverlay, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogContent$1, {
	ref,
	className: cn("fixed left-[50%] top-[50%] z-50 grid w-full max-w-lg translate-x-[-50%] translate-y-[-50%] gap-4 border bg-background p-6 shadow-lg duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 sm:rounded-lg", className),
	...props,
	children: [children, /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogClose, {
		className: "absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background cursor-pointer transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "h-4 w-4" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "sr-only",
			children: "Close"
		})]
	})]
})] }));
DialogContent.displayName = DialogContent$1.displayName;
var DialogHeader = ({ className, ...props }) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
	className: cn("flex flex-col space-y-1.5 text-center sm:text-left", className),
	...props
});
DialogHeader.displayName = "DialogHeader";
var DialogFooter = ({ className, ...props }) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
	className: cn("flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2", className),
	...props
});
DialogFooter.displayName = "DialogFooter";
var DialogTitle = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogTitle$1, {
	ref,
	className: cn("text-lg font-semibold leading-none tracking-tight", className),
	...props
}));
DialogTitle.displayName = DialogTitle$1.displayName;
var DialogDescription = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogDescription$1, {
	ref,
	className: cn("text-sm text-muted-foreground", className),
	...props
}));
DialogDescription.displayName = DialogDescription$1.displayName;
/**
* Test-mode card checkout. No real money moves: the card is checked here,
* and only the brand + last 4 digits are sent to the backend.
*/
var TEST_CARDS = {
	success: "4242 4242 4242 4242",
	declined: "4000 0000 0000 0002"
};
var digitsOnly = (s) => s.replace(/\D/g, "");
function formatCardNumber(s) {
	return digitsOnly(s).slice(0, 19).replace(/(\d{4})(?=\d)/g, "$1 ");
}
function formatExpiry(s) {
	const d = digitsOnly(s).slice(0, 4);
	return d.length > 2 ? `${d.slice(0, 2)} / ${d.slice(2)}` : d;
}
function luhnValid(num) {
	const d = digitsOnly(num);
	if (d.length < 12 || d.length > 19) return false;
	let sum = 0;
	for (let i = 0; i < d.length; i++) {
		let n = Number(d[d.length - 1 - i]);
		if (i % 2 === 1) {
			n *= 2;
			if (n > 9) n -= 9;
		}
		sum += n;
	}
	return sum % 10 === 0;
}
function cardBrand(num) {
	const d = digitsOnly(num);
	if (/^4/.test(d)) return "Visa";
	if (/^(5[1-5]|2[2-7])/.test(d)) return "Mastercard";
	if (/^3[47]/.test(d)) return "Amex";
	if (/^(6011|65)/.test(d)) return "Discover";
	return "Card";
}
function validateCard(c, now = /* @__PURE__ */ new Date()) {
	const e = {};
	if (!luhnValid(c.number)) e.number = "Enter a valid card number";
	const m = digitsOnly(c.expiry);
	const month = Number(m.slice(0, 2));
	const year = 2e3 + Number(m.slice(2, 4));
	if (m.length !== 4 || month < 1 || month > 12) e.expiry = "Use MM / YY";
	else if (year < now.getFullYear() || year === now.getFullYear() && month < now.getMonth() + 1) e.expiry = "This card has expired";
	const cvcLen = cardBrand(c.number) === "Amex" ? 4 : 3;
	if (digitsOnly(c.cvc).length !== cvcLen) e.cvc = `${cvcLen} digits`;
	if (!c.name.trim()) e.name = "Name on card is required";
	return e;
}
/** Simulated bank answer: the decline test card is refused, every other valid card is approved. */
function simulateCharge(num) {
	if (digitsOnly(num) === digitsOnly(TEST_CARDS.declined)) return {
		ok: false,
		reason: "Your card was declined. Try another card."
	};
	return { ok: true };
}
var empty = {
	number: "",
	expiry: "",
	cvc: "",
	name: ""
};
function CheckoutDialog({ open, onOpenChange, projectId, title, total, onPaid }) {
	const [card, setCard] = (0, import_react.useState)(empty);
	const [errors, setErrors] = (0, import_react.useState)({});
	const [failure, setFailure] = (0, import_react.useState)(null);
	const [busy, setBusy] = (0, import_react.useState)(false);
	const [receipt, setReceipt] = (0, import_react.useState)(null);
	const set = (k, v) => {
		setCard((c) => ({
			...c,
			[k]: v
		}));
		setErrors((e) => ({
			...e,
			[k]: void 0
		}));
		setFailure(null);
	};
	function close(v) {
		if (busy) return;
		onOpenChange(v);
		if (!v) {
			setCard(empty);
			setErrors({});
			setFailure(null);
			setReceipt(null);
		}
	}
	async function pay(e) {
		e.preventDefault();
		const errs = validateCard(card);
		setErrors(errs);
		if (Object.keys(errs).length) return;
		setBusy(true);
		setFailure(null);
		await new Promise((r) => setTimeout(r, 1200));
		const charge = simulateCharge(card.number);
		if (!charge.ok) {
			setBusy(false);
			setFailure(charge.reason);
			return;
		}
		const { data, error } = await supabase.rpc("pay_for_book", {
			_project_id: projectId,
			_card_brand: cardBrand(card.number),
			_card_last4: digitsOnly(card.number).slice(-4)
		});
		if (error) {
			setBusy(false);
			setFailure(error.message);
			return;
		}
		await onPaid();
		setBusy(false);
		setReceipt(data);
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Dialog, {
		open,
		onOpenChange: close,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogContent, {
			className: "sm:max-w-md",
			children: receipt ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogHeader, { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, { className: "h-10 w-10 text-success" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogTitle, {
						className: "font-display text-2xl font-medium",
						children: "Payment successful"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogDescription, { children: "Your order is placed and our team is getting started on your book." })
				] }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("dl", {
					className: "grid grid-cols-[auto_1fr] gap-x-6 gap-y-2 rounded-2xl bg-paper p-5 text-sm",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
							className: "text-muted-foreground",
							children: "Amount"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", {
							className: "font-semibold",
							children: formatMoney(Number(receipt.amount), 2)
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
							className: "text-muted-foreground",
							children: "Card"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("dd", { children: [
							receipt.card_brand,
							" •••• ",
							receipt.card_last4
						] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
							className: "text-muted-foreground",
							children: "Receipt"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", {
							className: "font-mono",
							children: receipt.reference
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogFooter, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					variant: "brand",
					onClick: () => close(false),
					children: "Done"
				}) })
			] }) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
				onSubmit: pay,
				noValidate: true,
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogHeader, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogTitle, {
						className: "font-display text-2xl font-medium",
						children: "Pay for your order"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogDescription, { children: [
						"Test mode — no real money moves. Use card",
						" ",
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							className: "font-mono font-semibold text-foreground underline decoration-brand underline-offset-2",
							onClick: () => set("number", TEST_CARDS.success),
							children: TEST_CARDS.success
						}),
						", any future date and any 3-digit code."
					] })] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-5 rounded-2xl bg-paper p-5",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-sm text-muted-foreground",
							children: title
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-1 font-display text-4xl",
							children: formatMoney(total, 2)
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-5 space-y-4",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
								id: "cc-number",
								label: "Card number",
								error: errors.number,
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "relative",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
										id: "cc-number",
										inputMode: "numeric",
										autoComplete: "cc-number",
										placeholder: "1234 1234 1234 1234",
										value: card.number,
										onChange: (e) => set("number", formatCardNumber(e.target.value)),
										"aria-invalid": !!errors.number,
										className: "pr-24 font-mono"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-xs font-semibold text-muted-foreground",
										children: card.number ? cardBrand(card.number) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CreditCard, { className: "h-4 w-4" })
									})]
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "grid grid-cols-2 gap-4",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
									id: "cc-exp",
									label: "Expiry",
									error: errors.expiry,
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
										id: "cc-exp",
										inputMode: "numeric",
										autoComplete: "cc-exp",
										placeholder: "MM / YY",
										value: card.expiry,
										onChange: (e) => set("expiry", formatExpiry(e.target.value)),
										"aria-invalid": !!errors.expiry,
										className: "font-mono"
									})
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
									id: "cc-csc",
									label: "Security code",
									error: errors.cvc,
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
										id: "cc-csc",
										inputMode: "numeric",
										autoComplete: "cc-csc",
										placeholder: "CVC",
										value: card.cvc,
										onChange: (e) => set("cvc", digitsOnly(e.target.value).slice(0, 4)),
										"aria-invalid": !!errors.cvc,
										className: "font-mono"
									})
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
								id: "cc-name",
								label: "Name on card",
								error: errors.name,
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
									id: "cc-name",
									autoComplete: "cc-name",
									value: card.name,
									onChange: (e) => set("name", e.target.value),
									"aria-invalid": !!errors.name
								})
							})
						]
					}),
					failure && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						role: "alert",
						className: "mt-4 rounded-xl border border-destructive/40 bg-destructive/5 px-4 py-3 text-sm text-destructive",
						children: failure
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
						type: "submit",
						variant: "brand",
						size: "xl",
						className: "mt-6 w-full",
						disabled: busy,
						children: [busy ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "animate-spin" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Lock, {}), busy ? "Processing…" : `Pay ${formatMoney(total, 2)}`]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "mt-3 text-center text-xs text-muted-foreground",
						children: [
							"Want to see a decline? Use ",
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "font-mono",
								children: TEST_CARDS.declined
							}),
							"."
						]
					})
				]
			})
		})
	});
}
function Field({ id, label, error, children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-1.5",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
				htmlFor: id,
				children: label
			}),
			children,
			error && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-xs text-destructive",
				children: error
			})
		]
	});
}
function MessageThread({ projectId, userId, ownerId, authorLabel }) {
	const queryClient = useQueryClient();
	const { data: messages = [], isLoading } = useQuery(messagesQuery(projectId));
	const [body, setBody] = (0, import_react.useState)("");
	const [sending, setSending] = (0, import_react.useState)(false);
	const end = (0, import_react.useRef)(null);
	(0, import_react.useEffect)(() => {
		const channel = supabase.channel(`messages-${projectId}-${Math.random().toString(36).slice(2)}`).on("postgres_changes", {
			event: "INSERT",
			schema: "public",
			table: "messages",
			filter: `project_id=eq.${projectId}`
		}, () => queryClient.invalidateQueries({ queryKey: ["messages", projectId] })).subscribe();
		return () => {
			supabase.removeChannel(channel);
		};
	}, [projectId, queryClient]);
	(0, import_react.useEffect)(() => {
		end.current?.scrollIntoView({ block: "nearest" });
	}, [messages.length]);
	async function send(e) {
		e.preventDefault();
		const text = body.trim();
		if (!text) return;
		setSending(true);
		const { error } = await supabase.from("messages").insert({
			project_id: projectId,
			body: text.slice(0, 4e3)
		});
		setSending(false);
		if (error) {
			toast.error(error.message);
			return;
		}
		setBody("");
		await queryClient.invalidateQueries({ queryKey: ["messages", projectId] });
	}
	const who = (senderId) => senderId === userId ? "You" : senderId === ownerId ? authorLabel : "Publish Plug team";
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "max-h-[28rem] space-y-3 overflow-y-auto rounded-2xl bg-paper p-4",
		children: [
			isLoading && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-sm text-muted-foreground",
				children: "Loading messages…"
			}),
			!isLoading && messages.length === 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-sm text-muted-foreground",
				children: "No messages yet. Ask a question or share a note with the team."
			}),
			messages.map((m) => {
				const mine = m.sender_id === userId;
				return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: cn("flex", mine ? "justify-end" : "justify-start"),
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: cn("max-w-[85%] rounded-2xl px-4 py-2.5 text-sm shadow-soft", mine ? "bg-primary text-primary-foreground" : "bg-card"),
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: cn("text-xs font-semibold", mine ? "text-primary-foreground/80" : "text-brand-deep"),
							children: [
								who(m.sender_id),
								" · ",
								new Date(m.created_at).toLocaleString(void 0, {
									dateStyle: "medium",
									timeStyle: "short"
								})
							]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-1 whitespace-pre-wrap",
							children: m.body
						})]
					})
				}, m.id);
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { ref: end })
		]
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
		onSubmit: send,
		className: "mt-3 flex items-end gap-2",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Textarea, {
			value: body,
			onChange: (e) => setBody(e.target.value),
			rows: 2,
			maxLength: 4e3,
			placeholder: "Write a message…",
			"aria-label": "Message",
			onKeyDown: (e) => {
				if (e.key === "Enter" && (e.metaKey || e.ctrlKey)) send(e);
			}
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
			type: "submit",
			variant: "brand",
			disabled: sending || !body.trim(),
			"aria-label": "Send message",
			children: sending ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "animate-spin" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Send, {})
		})]
	})] });
}
function ProjectFiles({ projectId, files, userId, isStaff, onChange }) {
	const kinds = isStaff ? DELIVERABLE_KINDS : AUTHOR_KINDS;
	const [kind, setKind] = (0, import_react.useState)(kinds[0]);
	const [uploading, setUploading] = (0, import_react.useState)(false);
	const input = (0, import_react.useRef)(null);
	const yours = files.filter((f) => AUTHOR_KINDS.includes(f.kind));
	const deliverables = files.filter((f) => DELIVERABLE_KINDS.includes(f.kind));
	async function upload(list) {
		if (!list?.length) return;
		setUploading(true);
		try {
			for (const file of Array.from(list)) {
				if (file.size > 209715200) throw new Error(`${file.name} is larger than 200 MB`);
				const path = storagePath(projectId, kind, file.name);
				const up = await supabase.storage.from("project-files").upload(path, file);
				if (up.error) throw up.error;
				const version = files.filter((f) => f.kind === kind).length + 1;
				const ins = await supabase.from("project_files").insert({
					project_id: projectId,
					kind,
					name: file.name,
					storage_path: path,
					size_bytes: file.size,
					version
				});
				if (ins.error) throw ins.error;
			}
			toast.success("Uploaded");
			await onChange();
		} catch (e) {
			toast.error(e instanceof Error ? e.message : "Upload failed");
		} finally {
			setUploading(false);
			if (input.current) input.current.value = "";
		}
	}
	async function download(f) {
		const { data, error } = await supabase.storage.from("project-files").createSignedUrl(f.storage_path, 60);
		if (error || !data) {
			toast.error(error?.message ?? "Could not open the file");
			return;
		}
		window.open(data.signedUrl, "_blank", "noopener");
	}
	async function remove(f) {
		if (!window.confirm(`Remove ${f.name}?`)) return;
		await supabase.storage.from("project-files").remove([f.storage_path]);
		const { error } = await supabase.from("project_files").delete().eq("id", f.id);
		if (error) {
			toast.error(error.message);
			return;
		}
		await onChange();
	}
	const List = ({ items, empty }) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("ul", {
		className: "mt-3 space-y-2",
		children: [items.map((f) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
			className: "flex items-center justify-between gap-3 rounded-xl bg-paper px-3 py-2.5 text-sm",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
				className: "flex min-w-0 items-center gap-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Paperclip, { className: "h-4 w-4 shrink-0 text-brand-deep" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
					className: "min-w-0",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "block truncate font-medium",
						children: f.name
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: "block text-xs text-muted-foreground",
						children: [
							FILE_KIND_LABELS[f.kind] ?? f.kind,
							" · v",
							f.version,
							f.size_bytes ? ` · ${formatBytes(f.size_bytes)}` : "",
							" ·",
							" ",
							new Date(f.created_at).toLocaleDateString(void 0, { dateStyle: "medium" })
						]
					})]
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
				className: "flex shrink-0 gap-1",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					variant: "ghost",
					size: "icon",
					className: "h-8 w-8",
					onClick: () => download(f),
					"aria-label": `Download ${f.name}`,
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Download, {})
				}), (f.uploaded_by === userId || isStaff) && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					variant: "ghost",
					size: "icon",
					className: "h-8 w-8",
					onClick: () => remove(f),
					"aria-label": `Remove ${f.name}`,
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, {})
				})]
			})]
		}, f.id)), items.length === 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", {
			className: "rounded-xl border border-dashed border-border p-4 text-sm text-muted-foreground",
			children: empty
		})]
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-8",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "eyebrow",
				children: "From the team"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(List, {
				items: deliverables,
				empty: "Drafts, covers and final files from our team will appear here."
			})] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "eyebrow",
				children: isStaff ? "From the author" : "Your files"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(List, {
				items: yours,
				empty: isStaff ? "The author hasn't uploaded anything yet." : "Upload your manuscript, recordings or reference material."
			})] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-col gap-3 rounded-2xl border border-border p-4 sm:flex-row sm:items-center",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
						value: kind,
						onValueChange: (v) => setKind(v),
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectTrigger, {
							className: "sm:w-52",
							"aria-label": "File type",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectValue, {})
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectContent, { children: kinds.map((k) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
							value: k,
							children: FILE_KIND_LABELS[k]
						}, k)) })]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
						ref: input,
						type: "file",
						multiple: true,
						className: "sr-only",
						onChange: (e) => upload(e.target.files),
						"aria-label": "Choose files to upload"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
						variant: "brand",
						className: "sm:ml-auto",
						onClick: () => input.current?.click(),
						disabled: uploading,
						children: [
							uploading ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "animate-spin" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FileUp, {}),
							" ",
							isStaff ? "Upload deliverable" : "Upload files"
						]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-xs text-muted-foreground",
				children: "Up to 200 MB per file. Uploading the same type again keeps earlier versions."
			})
		]
	});
}
/** Team-only panel: move the book along and price custom-quote services. */
function StaffControls({ project, orders, onChange }) {
	const [stage, setStage] = (0, import_react.useState)(project.stage);
	const [busy, setBusy] = (0, import_react.useState)(null);
	const [prices, setPrices] = (0, import_react.useState)({});
	const pending = orders.filter((o) => o.price == null);
	async function saveStage() {
		setBusy("stage");
		const { error } = await supabase.from("projects").update({ stage }).eq("id", project.id);
		setBusy(null);
		if (error) {
			toast.error(error.message);
			return;
		}
		toast.success("Stage updated");
		await onChange();
	}
	async function savePrice(o) {
		const value = Number(prices[o.id]);
		if (!(value > 0)) {
			toast.error("Enter a price in Naira");
			return;
		}
		setBusy(o.id);
		const { error } = await supabase.from("orders").update({
			price: value,
			unit_price: value
		}).eq("id", o.id);
		setBusy(null);
		if (error) {
			toast.error(error.message);
			return;
		}
		toast.success("Quote updated");
		await onChange();
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: "rounded-3xl border border-brand/40 bg-accent/50 p-6 shadow-soft",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h2", {
				className: "flex items-center gap-2 text-xl font-medium",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShieldCheck, { className: "h-5 w-5 text-brand-deep" }), " Team controls"]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-1 text-sm text-muted-foreground",
				children: "Only Publish Plug staff see this."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-4 flex gap-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
					value: stage,
					onValueChange: (v) => setStage(v),
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectTrigger, {
						"aria-label": "Stage",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectValue, {})
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectContent, { children: STAGES.map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
						value: s.key,
						children: s.label
					}, s.key)) })]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
					variant: "brand",
					onClick: saveStage,
					disabled: busy === "stage" || stage === project.stage,
					children: [busy === "stage" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "animate-spin" }), " Move"]
				})]
			}),
			pending.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-5 space-y-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "eyebrow",
					children: "Custom quotes"
				}), pending.map((o) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-2",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "flex-1 text-sm font-semibold",
							children: o.services?.name ?? o.service_code
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
							type: "number",
							min: 0,
							step: 1e3,
							placeholder: "₦",
							className: "w-32",
							value: prices[o.id] ?? "",
							onChange: (e) => setPrices((p) => ({
								...p,
								[o.id]: e.target.value
							})),
							"aria-label": `Price for ${o.services?.name ?? o.service_code}`
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
							variant: "outline",
							onClick: () => savePrice(o),
							disabled: busy === o.id,
							children: [busy === o.id && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "animate-spin" }), " Set"]
						})
					]
				}, o.id))]
			})
		]
	});
}
var Tabs = Tabs$1;
var TabsList = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsList$1, {
	ref,
	className: cn("inline-flex h-9 items-center justify-center rounded-lg bg-muted p-1 text-muted-foreground", className),
	...props
}));
TabsList.displayName = TabsList$1.displayName;
var TabsTrigger = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsTrigger$1, {
	ref,
	className: cn("inline-flex items-center justify-center whitespace-nowrap rounded-md px-3 py-1 text-sm font-medium ring-offset-background cursor-pointer transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 disabled:cursor-not-allowed data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow", className),
	...props
}));
TabsTrigger.displayName = TabsTrigger$1.displayName;
var TabsContent = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsContent$1, {
	ref,
	className: cn("mt-2 ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2", className),
	...props
}));
TabsContent.displayName = TabsContent$1.displayName;
function BookPage() {
	const { bookId } = Route.useParams();
	const { data } = useSuspenseQuery(bookQuery(bookId));
	const { user } = Route.useRouteContext();
	const isStaff = useIsStaff();
	const queryClient = useQueryClient();
	const navigate = useNavigate();
	const [payOpen, setPayOpen] = (0, import_react.useState)(false);
	const [busy, setBusy] = (0, import_react.useState)(null);
	const { project, orders, files, payment } = data;
	if (!project) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AppShell, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
			className: "text-3xl font-medium",
			children: "Book not found"
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "mt-2 text-muted-foreground",
			children: "It may have been deleted, or it belongs to another account."
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
			variant: "outline",
			className: "mt-6",
			asChild: true,
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
				to: "/dashboard",
				children: "Back to my books"
			})
		})
	] });
	const refresh = () => Promise.all([queryClient.invalidateQueries({ queryKey: ["book", bookId] }), queryClient.invalidateQueries({ queryKey: ["books"] })]);
	const lines = orders.map((o) => ({
		key: o.id,
		name: o.services?.name ?? o.service_code,
		pricingType: o.services?.pricing_type ?? "flat",
		quantity: Number(o.quantity),
		tier: o.tier,
		unitPrice: toNum(o.unit_price),
		price: toNum(o.price),
		inPackage: o.in_package
	}));
	const totals = quoteTotals(lines);
	const editable = project.stage === "draft" || project.stage === "quoted";
	const ordered = stageIndex(project.stage) >= stageIndex("ordered");
	const consentFiles = files.filter((f) => f.kind === "consent");
	const pendingNames = lines.filter((l) => l.price == null).map((l) => l.name);
	const gates = [
		project.source_type === "monograph" && {
			ok: project.rights_confirmed,
			label: "Rights to the monograph confirmed"
		},
		project.source_type === "interview" && {
			ok: consentFiles.length > 0,
			label: "Consent form uploaded for each interviewee"
		},
		totals.pendingQuotes > 0 && {
			ok: false,
			label: `Our team prices ${pendingNames.join(", ")} for you — we'll message you here once it's ready`
		}
	].filter(Boolean);
	const canOrder = project.stage === "quoted" && orders.length > 0 && gates.every((g) => g.ok);
	async function updateProject(patch, key, success) {
		setBusy(key);
		const { error } = await supabase.from("projects").update(patch).eq("id", bookId);
		setBusy(null);
		if (error) {
			toast.error(error.message);
			return false;
		}
		if (success) toast.success(success);
		await refresh();
		return true;
	}
	async function deleteBook() {
		if (!window.confirm("Delete this book and its quote? This can't be undone.")) return;
		setBusy("delete");
		const { error } = await supabase.from("projects").delete().eq("id", bookId);
		setBusy(null);
		if (error) {
			toast.error(error.message);
			return;
		}
		await queryClient.invalidateQueries({ queryKey: ["books"] });
		toast.success("Book deleted");
		navigate({ to: "/dashboard" });
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AppShell, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
			to: "/dashboard",
			className: "inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowLeft, { className: "h-4 w-4" }), " My books"]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mt-4 flex flex-col justify-between gap-4 md:flex-row md:items-end",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StageBadge, { stage: project.stage }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "mt-3 text-4xl font-medium md:text-5xl",
					children: project.title
				}),
				project.subtitle && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-1 text-lg text-muted-foreground",
					children: project.subtitle
				})
			] }), editable && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex gap-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					variant: "outline",
					asChild: true,
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
						to: "/books/new",
						search: { draft: project.id },
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Pencil, {}), " Edit"]
					})
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					variant: "ghost",
					size: "icon",
					onClick: deleteBook,
					disabled: busy === "delete",
					"aria-label": "Delete book",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, {})
				})]
			})]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
			className: "mt-8 rounded-3xl border border-border bg-card p-6 shadow-soft md:p-8",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StageBar, { stage: project.stage }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "mt-6 rounded-xl bg-paper px-4 py-3 text-sm",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "font-semibold",
					children: "Next step: "
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "text-muted-foreground",
					children: stageInfo(project.stage).next
				})]
			})]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mt-6 grid gap-6 lg:grid-cols-[1.5fr_1fr]",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "rounded-3xl border border-border bg-card p-6 shadow-soft md:p-8",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-baseline justify-between gap-4",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "text-2xl font-medium",
							children: ordered ? "Your order" : "Quote & order summary"
						}), ordered && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "inline-flex items-center gap-1.5 text-sm font-semibold text-success",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, { className: "h-4 w-4" }), " Paid"]
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mt-6",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(QuoteTable, {
							lines,
							packageName: project.package ? `${PACKAGES[project.package].name} package` : null
						})
					}),
					payment && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-6 flex flex-wrap items-center justify-between gap-3 rounded-2xl bg-paper px-5 py-4 text-sm",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "flex items-center gap-2",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CreditCard, { className: "h-4 w-4 text-brand-deep" }),
								"Paid ",
								formatMoney(Number(payment.amount), 2),
								" with ",
								payment.card_brand,
								" •••• ",
								payment.card_last4
							]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "text-muted-foreground",
							children: [
								new Date(payment.created_at).toLocaleDateString(void 0, { dateStyle: "medium" }),
								" · ",
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "font-mono",
									children: payment.reference
								}),
								payment.test_mode && " · test"
							]
						})]
					}),
					project.stage === "draft" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-8 flex flex-col gap-3 rounded-2xl bg-paper p-5 sm:flex-row sm:items-center sm:justify-between",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-sm text-muted-foreground",
							children: "This is a draft. Request your quote when you're happy with it."
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
							variant: "brand",
							onClick: () => updateProject({ stage: "quoted" }, "quote", "Your quote is ready"),
							disabled: busy === "quote" || orders.length === 0,
							children: [busy === "quote" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "animate-spin" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Send, {}), " Request quote"]
						})]
					}),
					project.stage === "quoted" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-8 space-y-4",
						children: [
							gates.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("ul", {
								className: "space-y-2 rounded-2xl border border-border p-5 text-sm",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", {
									className: "eyebrow mb-1",
									children: "Before you order"
								}), gates.map((g) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
									className: "flex items-center gap-2",
									children: [g.ok ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, { className: "h-4 w-4 text-success" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Lock, { className: "h-4 w-4 text-muted-foreground" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: g.ok ? "" : "text-muted-foreground",
										children: g.label
									})]
								}, g.label))]
							}),
							project.source_type === "monograph" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
								className: "flex items-start gap-3 rounded-2xl bg-paper p-5 text-sm",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Checkbox, {
									checked: project.rights_confirmed,
									disabled: busy === "rights",
									onCheckedChange: (v) => updateProject({ rights_confirmed: v === true }, "rights"),
									className: "mt-0.5"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "font-semibold",
									children: "I confirm I hold the rights to this monograph."
								}), " If it was published by a university press or journal, check your contract first."] })]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
								variant: "brand",
								size: "xl",
								className: "w-full",
								disabled: !canOrder,
								onClick: () => setPayOpen(true),
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CreditCard, {}), " Accept quote & place order"]
							}),
							!canOrder && gates.some((g) => !g.ok) && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								role: "status",
								className: "flex items-start gap-2 rounded-xl bg-sun/20 px-4 py-3 text-sm",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Lock, { className: "mt-0.5 h-4 w-4 shrink-0" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "font-semibold",
										children: "Why can't I order yet? "
									}),
									gates.filter((g) => !g.ok).map((g) => g.label).join(". "),
									"."
								] })]
							})
						]
					})
				]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "space-y-6",
				children: [
					isStaff && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(StaffControls, {
						project,
						orders,
						onChange: refresh
					}, project.stage),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
						className: "rounded-3xl border border-border bg-card p-6 shadow-soft",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
								className: "text-xl font-medium",
								children: "Book details"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("dl", {
								className: "mt-4 grid grid-cols-[auto_1fr] gap-x-6 gap-y-2.5 text-sm",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Detail, {
										k: "Starting point",
										v: SOURCE_OPTIONS.find((o) => o.value === project.source_type)?.label
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Detail, {
										k: "Author",
										v: project.author_name
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Detail, {
										k: "Genre",
										v: project.genre
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Detail, {
										k: "Language",
										v: project.language
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Detail, {
										k: "Words",
										v: project.word_count.toLocaleString()
									}),
									Number(project.audio_hours) > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Detail, {
										k: "Audio",
										v: `${Number(project.audio_hours)} hours`
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Detail, {
										k: "Pages (est.)",
										v: project.page_count_est?.toString()
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Detail, {
										k: "Trim size",
										v: TRIM_SIZES.find((t) => t.value === project.trim_size)?.label
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Detail, {
										k: "Binding",
										v: project.binding
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Detail, {
										k: "Paper",
										v: project.paper
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Detail, {
										k: "AI-assisted",
										v: project.ai_assisted ? "Yes — will be declared to stores" : "No"
									})
								]
							}),
							project.notes && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-4 rounded-xl bg-paper p-3 text-sm text-muted-foreground",
								children: project.notes
							})
						]
					}),
					project.source_type === "interview" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ConsentFiles, {
						projectId: project.id,
						files: consentFiles,
						canEdit: !ordered,
						onChange: refresh
					})
				]
			})]
		}),
		project.stage !== "draft" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
			className: "mt-6 rounded-3xl border border-border bg-card p-6 shadow-soft md:p-8",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-col justify-between gap-2 sm:flex-row sm:items-baseline",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "text-2xl font-medium",
					children: "Book workspace"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-sm text-muted-foreground",
					children: ordered ? "Share files and talk to the team working on your book." : "Questions about your quote? Message the team."
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Tabs, {
				defaultValue: ordered ? "files" : "messages",
				className: "mt-6",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TabsList, { children: [ordered && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsTrigger, {
						value: "files",
						children: "Files"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsTrigger, {
						value: "messages",
						children: "Messages"
					})] }),
					ordered && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsContent, {
						value: "files",
						className: "mt-6",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ProjectFiles, {
							projectId: project.id,
							files,
							userId: user.id,
							isStaff,
							onChange: refresh
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsContent, {
						value: "messages",
						className: "mt-6",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MessageThread, {
							projectId: project.id,
							userId: user.id,
							ownerId: project.owner_id,
							authorLabel: project.author_name || "Author"
						})
					})
				]
			}, ordered ? "ordered" : "quoted")]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CheckoutDialog, {
			open: payOpen,
			onOpenChange: setPayOpen,
			projectId: project.id,
			title: project.title,
			total: totals.total,
			onPaid: refresh
		})
	] });
}
function Detail({ k, v }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
		className: "text-muted-foreground",
		children: k
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", {
		className: "first-letter:uppercase",
		children: v || "—"
	})] });
}
var CONSENT_TYPES = ".pdf,.docx,.jpg,.jpeg,.png";
function ConsentFiles({ projectId, files, canEdit, onChange }) {
	const input = (0, import_react.useRef)(null);
	const [uploading, setUploading] = (0, import_react.useState)(false);
	async function upload(list) {
		if (!list?.length) return;
		setUploading(true);
		try {
			for (const file of Array.from(list)) {
				if (file.size > 209715200) throw new Error(`${file.name} is larger than 200 MB`);
				const path = `${projectId}/consent/${Date.now()}-${file.name.replace(/[^\w.-]+/g, "_")}`;
				const up = await supabase.storage.from("project-files").upload(path, file);
				if (up.error) throw up.error;
				const ins = await supabase.from("project_files").insert({
					project_id: projectId,
					kind: "consent",
					name: file.name,
					storage_path: path,
					size_bytes: file.size
				});
				if (ins.error) throw ins.error;
			}
			toast.success("Consent form uploaded");
			await onChange();
		} catch (e) {
			toast.error(e instanceof Error ? e.message : "Upload failed");
		} finally {
			setUploading(false);
			if (input.current) input.current.value = "";
		}
	}
	async function remove(f) {
		await supabase.storage.from("project-files").remove([f.storage_path]);
		const { error } = await supabase.from("project_files").delete().eq("id", f.id);
		if (error) {
			toast.error(error.message);
			return;
		}
		await onChange();
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: "rounded-3xl border border-border bg-card p-6 shadow-soft",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "text-xl font-medium",
				children: "Interviewee consent"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-1 text-sm text-muted-foreground",
				children: "Upload a signed release form for every person interviewed."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("ul", {
				className: "mt-4 space-y-2",
				children: [files.map((f) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
					className: "flex items-center justify-between gap-3 rounded-xl bg-paper px-3 py-2 text-sm",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: "flex min-w-0 items-center gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Paperclip, { className: "h-4 w-4 shrink-0 text-brand-deep" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "truncate",
							children: f.name
						})]
					}), canEdit && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						variant: "ghost",
						size: "icon",
						className: "h-7 w-7",
						onClick: () => remove(f),
						"aria-label": `Remove ${f.name}`,
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, {})
					})]
				}, f.id)), files.length === 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", {
					className: "text-sm text-muted-foreground",
					children: "No consent forms yet."
				})]
			}),
			canEdit && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
				ref: input,
				type: "file",
				accept: CONSENT_TYPES,
				multiple: true,
				className: "sr-only",
				onChange: (e) => upload(e.target.files),
				"aria-label": "Upload consent forms"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
				variant: "outline",
				className: "mt-4 w-full",
				onClick: () => input.current?.click(),
				disabled: uploading,
				children: [uploading ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "animate-spin" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FileUp, {}), " Upload consent forms"]
			})] })
		]
	});
}
//#endregion
export { BookPage as component };
