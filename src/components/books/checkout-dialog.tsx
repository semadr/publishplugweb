import { useState } from "react";
import { CheckCircle2, CreditCard, Loader2, Lock } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { supabase } from "@/integrations/supabase/client";
import type { Payment } from "@/lib/books";
import { formatMoney } from "@/lib/pricing";
import {
  TEST_CARDS,
  cardBrand,
  digitsOnly,
  formatCardNumber,
  formatExpiry,
  simulateCharge,
  validateCard,
  type CardErrors,
  type CardInput,
} from "@/lib/test-card";

const empty: CardInput = { number: "", expiry: "", cvc: "", name: "" };

export function CheckoutDialog({
  open,
  onOpenChange,
  projectId,
  title,
  total,
  onPaid,
}: {
  open: boolean;
  onOpenChange: (v: boolean) => void;
  projectId: string;
  title: string;
  total: number;
  onPaid: () => Promise<unknown>;
}) {
  const [card, setCard] = useState<CardInput>(empty);
  const [errors, setErrors] = useState<CardErrors>({});
  const [failure, setFailure] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);
  const [receipt, setReceipt] = useState<Payment | null>(null);

  const set = (k: keyof CardInput, v: string) => {
    setCard((c) => ({ ...c, [k]: v }));
    setErrors((e) => ({ ...e, [k]: undefined }));
    setFailure(null);
  };

  function close(v: boolean) {
    if (busy) return;
    onOpenChange(v);
    if (!v) {
      setCard(empty);
      setErrors({});
      setFailure(null);
      setReceipt(null);
    }
  }

  async function pay(e: React.FormEvent) {
    e.preventDefault();
    const errs = validateCard(card);
    setErrors(errs);
    if (Object.keys(errs).length) return;
    setBusy(true);
    setFailure(null);
    await new Promise((r) => setTimeout(r, 1200)); // feel of a real bank round-trip
    const charge = simulateCharge(card.number);
    if (!charge.ok) {
      setBusy(false);
      setFailure(charge.reason);
      return;
    }
    const { data, error } = await supabase.rpc("pay_for_book", {
      _project_id: projectId,
      _card_brand: cardBrand(card.number),
      _card_last4: digitsOnly(card.number).slice(-4),
    });
    if (error) {
      setBusy(false);
      setFailure(error.message);
      return;
    }
    await onPaid();
    setBusy(false);
    setReceipt(data as Payment);
  }

  return (
    <Dialog open={open} onOpenChange={close}>
      <DialogContent className="sm:max-w-md">
        {receipt ? (
          <>
            <DialogHeader>
              <CheckCircle2 className="h-10 w-10 text-success" />
              <DialogTitle className="font-display text-2xl font-medium">Payment successful</DialogTitle>
              <DialogDescription>Your order is placed and our team is getting started on your book.</DialogDescription>
            </DialogHeader>
            <dl className="grid grid-cols-[auto_1fr] gap-x-6 gap-y-2 rounded-2xl bg-paper p-5 text-sm">
              <dt className="text-muted-foreground">Amount</dt>
              <dd className="font-semibold">{formatMoney(Number(receipt.amount), 2)}</dd>
              <dt className="text-muted-foreground">Card</dt>
              <dd>{receipt.card_brand} •••• {receipt.card_last4}</dd>
              <dt className="text-muted-foreground">Receipt</dt>
              <dd className="font-mono">{receipt.reference}</dd>
            </dl>
            <DialogFooter>
              <Button variant="brand" onClick={() => close(false)}>Done</Button>
            </DialogFooter>
          </>
        ) : (
          <form onSubmit={pay} noValidate>
            <DialogHeader>
              <DialogTitle className="font-display text-2xl font-medium">Pay for your order</DialogTitle>
              <DialogDescription>
                Test mode — no real money moves. Use card{" "}
                <button type="button" className="font-mono font-semibold text-foreground underline decoration-brand underline-offset-2" onClick={() => set("number", TEST_CARDS.success)}>
                  {TEST_CARDS.success}
                </button>
                , any future date and any 3-digit code.
              </DialogDescription>
            </DialogHeader>

            <div className="mt-5 rounded-2xl bg-paper p-5">
              <p className="text-sm text-muted-foreground">{title}</p>
              <p className="mt-1 font-display text-4xl">{formatMoney(total, 2)}</p>
            </div>

            <div className="mt-5 space-y-4">
              <Field id="cc-number" label="Card number" error={errors.number}>
                <div className="relative">
                  <Input
                    id="cc-number"
                    inputMode="numeric"
                    autoComplete="cc-number"
                    placeholder="1234 1234 1234 1234"
                    value={card.number}
                    onChange={(e) => set("number", formatCardNumber(e.target.value))}
                    aria-invalid={!!errors.number}
                    className="pr-24 font-mono"
                  />
                  <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-xs font-semibold text-muted-foreground">
                    {card.number ? cardBrand(card.number) : <CreditCard className="h-4 w-4" />}
                  </span>
                </div>
              </Field>
              <div className="grid grid-cols-2 gap-4">
                <Field id="cc-exp" label="Expiry" error={errors.expiry}>
                  <Input id="cc-exp" inputMode="numeric" autoComplete="cc-exp" placeholder="MM / YY" value={card.expiry} onChange={(e) => set("expiry", formatExpiry(e.target.value))} aria-invalid={!!errors.expiry} className="font-mono" />
                </Field>
                <Field id="cc-csc" label="Security code" error={errors.cvc}>
                  <Input id="cc-csc" inputMode="numeric" autoComplete="cc-csc" placeholder="CVC" value={card.cvc} onChange={(e) => set("cvc", digitsOnly(e.target.value).slice(0, 4))} aria-invalid={!!errors.cvc} className="font-mono" />
                </Field>
              </div>
              <Field id="cc-name" label="Name on card" error={errors.name}>
                <Input id="cc-name" autoComplete="cc-name" value={card.name} onChange={(e) => set("name", e.target.value)} aria-invalid={!!errors.name} />
              </Field>
            </div>

            {failure && (
              <p role="alert" className="mt-4 rounded-xl border border-destructive/40 bg-destructive/5 px-4 py-3 text-sm text-destructive">
                {failure}
              </p>
            )}

            <Button type="submit" variant="brand" size="xl" className="mt-6 w-full" disabled={busy}>
              {busy ? <Loader2 className="animate-spin" /> : <Lock />}
              {busy ? "Processing…" : `Pay ${formatMoney(total, 2)}`}
            </Button>
            <p className="mt-3 text-center text-xs text-muted-foreground">
              Want to see a decline? Use <span className="font-mono">{TEST_CARDS.declined}</span>.
            </p>
          </form>
        )}
      </DialogContent>
    </Dialog>
  );
}

function Field({ id, label, error, children }: { id: string; label: string; error?: string | undefined; children: React.ReactNode }) {
  return (
    <div className="space-y-1.5">
      <Label htmlFor={id}>{label}</Label>
      {children}
      {error && <p className="text-xs text-destructive">{error}</p>}
    </div>
  );
}
