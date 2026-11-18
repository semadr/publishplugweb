import { formatMoney, quoteTotals, type PricingType } from "@/lib/pricing";
import { cn } from "@/lib/utils";

export interface DisplayLine {
  key: string;
  name: string;
  pricingType: PricingType | string;
  quantity: number;
  tier?: string | null;
  unitPrice: number | null;
  price: number | null;
  inPackage: boolean;
}

function qtyLabel(l: DisplayLine) {
  if (l.pricingType === "per_word") return `${l.quantity.toLocaleString()} words × ${formatMoney(l.unitPrice ?? 0, 2)}`;
  if (l.pricingType === "tiered") return l.tier === "premium" ? "Premium" : "Standard";
  if (l.pricingType === "per_hour") return `${l.quantity} audio hr × ${formatMoney(l.unitPrice ?? 0)}`;
  if (l.pricingType === "quote") return "Our team will quote this personally";
  return l.quantity > 1 ? `${l.quantity} × ${formatMoney(l.unitPrice ?? 0)}` : "Flat fee";
}

export function QuoteTable({ lines }: { lines: DisplayLine[]; packageName?: string | null }) {
  const t = quoteTotals(lines);
  const pkg = lines.filter((l) => l.inPackage);
  const extra = lines.filter((l) => !l.inPackage);

  const Row = ({ l }: { l: DisplayLine }) => (
    <li className="flex items-start justify-between gap-4 py-3">
      <div>
        <p className="font-semibold">{l.name}</p>
        <p className="text-xs text-muted-foreground">{qtyLabel(l)}</p>
      </div>
      <p className={cn("shrink-0 text-right font-semibold tabular-nums", l.price == null && "text-brand-deep")}>
        {l.price == null ? "Custom quote" : formatMoney(l.price, 2)}
      </p>
    </li>
  );

  if (!lines.length) {
    return <p className="rounded-xl border border-dashed border-border p-6 text-center text-sm text-muted-foreground">No services selected yet.</p>;
  }

  return (
    <div>
      {pkg.length > 0 && (
        <div>
          <p className="eyebrow">Package</p>
          <ul className="divide-y divide-border">{pkg.map((l) => <Row key={l.key} l={l} />)}</ul>
        </div>
      )}
      {extra.length > 0 && (
        <div className={cn(pkg.length > 0 && "mt-5")}>
          <p className="eyebrow">{pkg.length ? "Add-ons" : "Services"}</p>
          <ul className="divide-y divide-border">{extra.map((l) => <Row key={l.key} l={l} />)}</ul>
        </div>
      )}
      <dl className="mt-4 space-y-2 border-t border-border pt-4 text-sm">
        <div className="flex justify-between">
          <dt className="text-muted-foreground">Subtotal</dt>
          <dd className="tabular-nums">{formatMoney(t.subtotal, 2)}</dd>
        </div>
        <div className="flex items-baseline justify-between border-t border-border pt-3">
          <dt className="font-semibold">Total</dt>
          <dd className="font-display text-3xl font-medium tabular-nums">{formatMoney(t.total, 2)}</dd>
        </div>
        {t.pendingQuotes > 0 && (
          <p className="text-xs text-brand-deep">
            + {t.pendingQuotes} service{t.pendingQuotes > 1 ? "s" : ""} awaiting a custom quote from our team.
          </p>
        )}
      </dl>
    </div>
  );
}
