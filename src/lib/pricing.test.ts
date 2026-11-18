import { describe, expect, it } from "vitest";
import { buildQuoteLines, estimatePageCount, formatMoney, packagePrice, quoteTotals, type Service } from "./pricing";

const s = (
  code: string,
  pricing_type: Service["pricing_type"],
  base_price: number | null,
  premium_price: number | null = null,
): Service => ({
  code,
  name: code,
  description: null,
  module: "A",
  pricing_type,
  base_price,
  premium_price,
  price_note: null,
  sort_order: 0,
  active: true,
});

// Publish Plug price list (Naira).
const catalog: Service[] = [
  s("ghostwriting", "per_word", 2),
  s("custom_service", "quote", null),
  s("edit_developmental", "per_word", 2.5),
  s("edit_line", "per_word", 2.5),
  s("edit_copy", "per_word", 2.5),
  s("proofreading", "per_word", 2.5),
  s("transform_audio", "per_hour", 20000),
  s("transform_interview", "per_hour", 20000),
  s("transform_monograph", "flat", 60000),
  s("cover_design", "flat", 150000),
  s("interior_design", "flat", 150000),
  s("ebook_file", "flat", 100000),
  s("pkg_ebook", "tiered", 100000, 250000),
  s("pkg_print", "tiered", 300000, 500000),
  s("pkg_audio", "tiered", 100000, 250000),
  s("isbn_setup", "flat", 15000),
  s("distribution_setup", "flat", 10000),
  s("launch_plan", "tiered", 300000, 750000),
  s("book_website", "tiered", 300000, 750000),
  s("digital_marketing", "tiered", 100000, 250000),
];

const base = { catalog, wordCount: 0, audioHours: 0, sourceType: "manuscript" as const, packageCode: null, extras: [] };

describe("page count estimate", () => {
  it("divides words by 275 and rounds up to an even number", () => {
    expect(estimatePageCount(55_000)).toBe(200);
    expect(estimatePageCount(55_275)).toBe(202);
    expect(estimatePageCount(0)).toBe(0);
  });
});

describe("editing is ₦2.5 per word", () => {
  it.each(["edit_developmental", "edit_line", "edit_copy", "proofreading"])("%s for 40,000 words is ₦100,000", (code) => {
    const lines = buildQuoteLines({ ...base, wordCount: 40_000, extras: [code] });
    expect(lines[0]?.price).toBe(100_000);
  });
});

describe("transformations", () => {
  it("audio to book is ₦20,000 per audio hour", () => {
    const lines = buildQuoteLines({ ...base, audioHours: 6, sourceType: "audio" });
    expect(lines.map((l) => [l.code, l.price])).toEqual([["transform_audio", 120_000]]);
  });
  it("interview to book is ₦20,000 per interview hour", () => {
    const lines = buildQuoteLines({ ...base, audioHours: 3, sourceType: "interview" });
    expect(lines[0]?.price).toBe(60_000);
  });
  it("monograph to book is one ₦60,000 price, not per word", () => {
    const lines = buildQuoteLines({ ...base, wordCount: 90_000, sourceType: "monograph" });
    expect(lines.map((l) => [l.code, l.price])).toEqual([["transform_monograph", 60_000]]);
  });
});

describe("packages have a Standard and Premium price", () => {
  it("E-Book is ₦100,000 or ₦250,000", () => {
    expect(packagePrice(catalog, "ebook", "standard")).toBe(100_000);
    expect(packagePrice(catalog, "ebook", "premium")).toBe(250_000);
  });
  it("Print Book is ₦300,000 or ₦500,000", () => {
    expect(packagePrice(catalog, "print", "standard")).toBe(300_000);
    expect(packagePrice(catalog, "print", "premium")).toBe(500_000);
  });
  it("Audio Add-On follows the package tier: ₦100,000 or ₦250,000", () => {
    const std = buildQuoteLines({ ...base, packageCode: "print", packageTier: "standard", extras: ["pkg_audio"] });
    const pre = buildQuoteLines({ ...base, packageCode: "print", packageTier: "premium", extras: ["pkg_audio"] });
    expect(quoteTotals(std).total).toBe(400_000);
    expect(quoteTotals(pre).total).toBe(750_000);
  });
  it("services inside a package are not charged again", () => {
    const lines = buildQuoteLines({ ...base, wordCount: 50_000, packageCode: "ebook", extras: ["edit_copy", "isbn_setup"] });
    expect(lines.map((l) => l.code)).toEqual(["pkg_ebook"]);
    expect(quoteTotals(lines).total).toBe(100_000);
  });
});

describe("launch services have a Standard and Premium price", () => {
  it.each([
    ["launch_plan", 300_000, 750_000],
    ["book_website", 300_000, 750_000],
    ["digital_marketing", 100_000, 250_000],
  ])("%s", (code, lo, hi) => {
    expect(buildQuoteLines({ ...base, extras: [code] })[0]?.price).toBe(lo);
    expect(buildQuoteLines({ ...base, extras: [code], tiers: { [code]: "premium" } })[0]?.price).toBe(hi);
  });
});

describe("flat services", () => {
  it("cover ₦150,000, interior ₦150,000, ebook file ₦100,000", () => {
    const lines = buildQuoteLines({ ...base, extras: ["cover_design", "interior_design", "ebook_file"] });
    expect(lines.map((l) => l.price)).toEqual([150_000, 150_000, 100_000]);
  });
  it("ISBN is ₦15,000 per format and distribution ₦10,000 per store", () => {
    const lines = buildQuoteLines({ ...base, extras: ["isbn_setup", "distribution_setup"], isbnCount: 2, storeCount: 3 });
    expect(lines.map((l) => l.price)).toEqual([30_000, 30_000]);
  });
});

describe("ghostwriting", () => {
  it("is ₦2 per word of the finished book", () => {
    const lines = buildQuoteLines({ ...base, sourceType: "idea", wordCount: 50_000 });
    expect(lines[0]?.code).toBe("ghostwriting");
    expect(lines[0]?.price).toBe(100_000);
    expect(quoteTotals(lines).pendingQuotes).toBe(0);
  });
});

describe("quote-only services", () => {
  it("show as pending until staff enter a price", () => {
    const lines = buildQuoteLines({ ...base, extras: ["custom_service"] });
    expect(lines[0]?.price).toBeNull();
    expect(quoteTotals(lines).pendingQuotes).toBe(1);
  });
});

describe("money is shown in Naira", () => {
  it("formats with the ₦ sign", () => {
    expect(formatMoney(250000)).toBe("₦250,000");
  });
});
