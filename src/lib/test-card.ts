/**
 * Test-mode card checkout. No real money moves: the card is checked here,
 * and only the brand + last 4 digits are sent to the backend.
 */
export const TEST_CARDS = {
  success: "4242 4242 4242 4242",
  declined: "4000 0000 0000 0002",
} as const;

export const digitsOnly = (s: string) => s.replace(/\D/g, "");

export function formatCardNumber(s: string): string {
  return digitsOnly(s).slice(0, 19).replace(/(\d{4})(?=\d)/g, "$1 ");
}

export function formatExpiry(s: string): string {
  const d = digitsOnly(s).slice(0, 4);
  return d.length > 2 ? `${d.slice(0, 2)} / ${d.slice(2)}` : d;
}

export function luhnValid(num: string): boolean {
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

export function cardBrand(num: string): string {
  const d = digitsOnly(num);
  if (/^4/.test(d)) return "Visa";
  if (/^(5[1-5]|2[2-7])/.test(d)) return "Mastercard";
  if (/^3[47]/.test(d)) return "Amex";
  if (/^(6011|65)/.test(d)) return "Discover";
  return "Card";
}

export interface CardInput {
  number: string;
  expiry: string;
  cvc: string;
  name: string;
}

export type CardErrors = Partial<Record<keyof CardInput, string>>;

export function validateCard(c: CardInput, now = new Date()): CardErrors {
  const e: CardErrors = {};
  if (!luhnValid(c.number)) e.number = "Enter a valid card number";
  const m = digitsOnly(c.expiry);
  const month = Number(m.slice(0, 2));
  const year = 2000 + Number(m.slice(2, 4));
  if (m.length !== 4 || month < 1 || month > 12) e.expiry = "Use MM / YY";
  else if (year < now.getFullYear() || (year === now.getFullYear() && month < now.getMonth() + 1))
    e.expiry = "This card has expired";
  const cvcLen = cardBrand(c.number) === "Amex" ? 4 : 3;
  if (digitsOnly(c.cvc).length !== cvcLen) e.cvc = `${cvcLen} digits`;
  if (!c.name.trim()) e.name = "Name on card is required";
  return e;
}

/** Simulated bank answer: the decline test card is refused, every other valid card is approved. */
export function simulateCharge(num: string): { ok: true } | { ok: false; reason: string } {
  if (digitsOnly(num) === digitsOnly(TEST_CARDS.declined))
    return { ok: false, reason: "Your card was declined. Try another card." };
  return { ok: true };
}
