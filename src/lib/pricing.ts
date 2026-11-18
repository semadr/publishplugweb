// Pure quote logic shared by the wizard, the price list and the book page.
// Prices come from the services catalog; the database re-prices author lines on insert.

export type PricingType = "per_word" | "per_hour" | "flat" | "quote" | "tiered";
export type SourceType = "idea" | "manuscript" | "audio" | "monograph" | "interview";
export type PackageCode = "ebook" | "print";
export type Tier = "standard" | "premium";

export interface Service {
  code: string;
  name: string;
  description: string | null;
  module: string;
  pricing_type: PricingType;
  base_price: number | null;
  premium_price: number | null;
  price_note: string | null;
  sort_order: number;
  active: boolean;
}

export interface QuoteLine {
  code: string;
  name: string;
  pricingType: PricingType;
  quantity: number;
  tier: Tier | null;
  unitPrice: number | null;
  price: number | null;
  inPackage: boolean;
}

export const WORDS_PER_PAGE = 275;
export const AUDIO_ADDON = "pkg_audio";

export const TIERS: { value: Tier; label: string }[] = [
  { value: "standard", label: "Standard" },
  { value: "premium", label: "Premium" },
];

/** All-in-one packages: one fixed price per tier; the listed services are included. */
export const PACKAGES: Record<
  PackageCode,
  { name: string; serviceCode: string; tagline: string; includes: string[]; deliverables: string[] }
> = {
  ebook: {
    name: "E-Book",
    serviceCode: "pkg_ebook",
    tagline: "Edited, formatted and live in ebook stores.",
    includes: ["edit_copy", "ebook_file", "isbn_setup", "distribution_setup"],
    deliverables: ["Copy-edited manuscript", "EPUB file", "ISBN", "Listing on 2 stores"],
  },
  print: {
    name: "Print Book",
    serviceCode: "pkg_print",
    tagline: "A professionally designed paperback or hardcover.",
    includes: ["edit_copy", "cover_design", "interior_design", "isbn_setup", "distribution_setup"],
    deliverables: [
      "Copy-edited manuscript",
      "Cover PDF",
      "Interior PDF",
      "ISBN and barcode",
      "Listing on 2 stores",
    ],
  },
};

export const AUDIO_ADDON_DELIVERABLES = ["Professional narration", "Mastered audio files", "Audio store listing"];

/** Transformation line set automatically from the starting point. */
export const SOURCE_SERVICE: Record<SourceType, string | null> = {
  idea: "ghostwriting",
  manuscript: null,
  audio: "transform_audio",
  monograph: "transform_monograph",
  interview: "transform_interview",
};

export const round2 = (n: number) => Math.round((n + Number.EPSILON) * 100) / 100;

/** Word count / 275, rounded up to an even number. */
export function estimatePageCount(wordCount: number): number {
  if (!wordCount || wordCount <= 0) return 0;
  const pages = Math.ceil(wordCount / WORDS_PER_PAGE);
  return pages % 2 === 0 ? pages : pages + 1;
}

/** Price of a tiered service for the chosen tier. */
export function tierPrice(svc: Pick<Service, "base_price" | "premium_price">, tier: Tier): number | null {
  if (tier === "premium") return svc.premium_price ?? svc.base_price;
  return svc.base_price;
}

export interface QuoteInput {
  catalog: Service[];
  wordCount: number;
  audioHours: number;
  sourceType: SourceType;
  packageCode: PackageCode | null;
  packageTier?: Tier;
  /** Individually chosen service codes (add-ons or à la carte). */
  extras: string[];
  /** Chosen tier for each tiered extra; defaults to standard. */
  tiers?: Record<string, Tier>;
  isbnCount?: number;
  storeCount?: number;
}

function lineFor(svc: Service, quantity: number, inPackage: boolean, tier: Tier): QuoteLine {
  if (svc.pricing_type === "tiered") {
    const unit = tierPrice(svc, tier);
    return {
      code: svc.code,
      name: svc.name,
      pricingType: svc.pricing_type,
      quantity: 1,
      tier,
      unitPrice: unit,
      price: unit == null ? null : round2(unit),
      inPackage,
    };
  }
  const unit = svc.pricing_type === "quote" ? null : svc.base_price;
  return {
    code: svc.code,
    name: svc.name,
    pricingType: svc.pricing_type,
    quantity,
    tier: null,
    unitPrice: unit,
    price: unit == null ? null : round2(quantity * unit),
    inPackage,
  };
}

function defaultQuantity(svc: Service, input: QuoteInput): number {
  switch (svc.pricing_type) {
    case "per_word":
      return Math.max(0, Math.round(input.wordCount));
    case "per_hour":
      return Math.max(0, input.audioHours);
    case "flat":
      if (svc.code === "isbn_setup") return Math.max(1, input.isbnCount ?? 1);
      if (svc.code === "distribution_setup") return Math.max(1, input.storeCount ?? 1);
      return 1;
    default:
      return 1;
  }
}

export function buildQuoteLines(input: QuoteInput): QuoteLine[] {
  const byCode = new Map(input.catalog.filter((s) => s.active).map((s) => [s.code, s]));
  const lines: QuoteLine[] = [];
  const seen = new Set<string>();
  const pkgTier = input.packageTier ?? "standard";

  if (input.packageCode) {
    const pkg = PACKAGES[input.packageCode];
    const svc = byCode.get(pkg.serviceCode);
    if (svc) {
      lines.push(lineFor(svc, 1, true, pkgTier));
      seen.add(svc.code);
      for (const c of pkg.includes) seen.add(c);
    }
  }

  const auto = SOURCE_SERVICE[input.sourceType];
  const extraCodes = auto ? [auto, ...input.extras] : input.extras;

  for (const code of extraCodes) {
    if (seen.has(code)) continue;
    const svc = byCode.get(code);
    if (!svc) continue;
    const tier = input.tiers?.[code] ?? (code === AUDIO_ADDON ? pkgTier : "standard");
    lines.push(lineFor(svc, defaultQuantity(svc, input), false, tier));
    seen.add(code);
  }
  return lines;
}

export interface QuoteTotals {
  subtotal: number;
  total: number;
  pendingQuotes: number;
}

export function quoteTotals(lines: Pick<QuoteLine, "price">[]): QuoteTotals {
  let subtotal = 0;
  let pendingQuotes = 0;
  for (const l of lines) {
    if (l.price == null) {
      pendingQuotes++;
      continue;
    }
    subtotal += l.price;
  }
  subtotal = round2(subtotal);
  return { subtotal, total: subtotal, pendingQuotes };
}

/** Package price for a tier (used on the landing page and price list). */
export function packagePrice(catalog: Service[], code: PackageCode, tier: Tier): number | null {
  const svc = catalog.find((s) => s.code === PACKAGES[code].serviceCode);
  return svc ? tierPrice(svc, tier) : null;
}

export const formatMoney = (n: number, digits = 0) =>
  new Intl.NumberFormat("en-NG", {
    style: "currency",
    currency: "NGN",
    currencyDisplay: "narrowSymbol",
    minimumFractionDigits: digits,
    maximumFractionDigits: digits,
  }).format(n);

/** "₦100,000 – ₦250,000" for tiered services. */
export function formatRange(svc: Pick<Service, "base_price" | "premium_price">): string {
  const lo = svc.base_price ?? 0;
  const hi = svc.premium_price ?? lo;
  return hi > lo ? `${formatMoney(lo)} – ${formatMoney(hi)}` : formatMoney(lo);
}

export function formatUnitPrice(svc: Pick<Service, "pricing_type" | "base_price" | "premium_price" | "price_note">): string {
  if (svc.pricing_type === "quote" || svc.base_price == null) return "Custom quote";
  let label: string;
  if (svc.pricing_type === "per_word") label = `${formatMoney(svc.base_price, 2)} / word`;
  else if (svc.pricing_type === "per_hour") label = `${formatMoney(svc.base_price)} / audio hour`;
  else if (svc.pricing_type === "tiered") label = formatRange(svc);
  else label = formatMoney(svc.base_price);
  if (svc.price_note === "Up to") return `Up to ${label}`;
  return svc.price_note ? `${label} (${svc.price_note.toLowerCase()})` : label;
}
