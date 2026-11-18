import { describe, expect, it } from "vitest";
import { TEST_CARDS, cardBrand, simulateCharge, validateCard } from "./test-card";

const now = new Date("2026-11-18T00:00:00Z");
const good = { number: TEST_CARDS.success, expiry: "12 / 30", cvc: "123", name: "Ada Author" };

describe("test-mode checkout", () => {
  it("approves the 4242 test card", () => {
    expect(validateCard(good, now)).toEqual({});
    expect(simulateCharge(good.number)).toEqual({ ok: true });
  });

  it("declines the 0002 test card", () => {
    expect(simulateCharge(TEST_CARDS.declined).ok).toBe(false);
  });

  it("rejects a mistyped card number", () => {
    expect(validateCard({ ...good, number: "4242 4242 4242 4241" }, now).number).toBeDefined();
  });

  it("rejects an expired card", () => {
    expect(validateCard({ ...good, expiry: "10 / 26" }, now).expiry).toBe("This card has expired");
  });

  it("detects the card brand", () => {
    expect(cardBrand(TEST_CARDS.success)).toBe("Visa");
    expect(cardBrand("5555 5555 5555 4444")).toBe("Mastercard");
  });
});
