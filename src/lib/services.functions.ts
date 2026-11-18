import { createServerFn } from "@tanstack/react-start";
import { createClient } from "@supabase/supabase-js";
import type { Database } from "@/integrations/supabase/types";
import type { Service } from "./pricing";

// Public price list: read with the publishable key behind the "anyone can view" policy.
export const listServices = createServerFn({ method: "GET" }).handler(async (): Promise<Service[]> => {
  const key = process.env["SUPABASE_PUBLISHABLE_KEY"]!;
  const client = createClient<Database>(process.env["SUPABASE_URL"]!, key, {
    auth: { persistSession: false, autoRefreshToken: false, storage: undefined },
    global: {
      fetch: (input, init) => {
        const h = new Headers(init?.headers);
        if (key.startsWith("sb_") && h.get("Authorization") === `Bearer ${key}`) h.delete("Authorization");
        h.set("apikey", key);
        return fetch(input, { ...init, headers: h });
      },
    },
  });
  const { data, error } = await client
    .from("services")
    .select("code, name, description, module, pricing_type, base_price, premium_price, price_note, sort_order, active")
    .eq("active", true)
    .order("sort_order");
  if (error) {
    console.error("listServices failed", error);
    return [];
  }
  return (data ?? []).map((s) => ({
    ...s,
    base_price: s.base_price == null ? null : Number(s.base_price),
    premium_price: s.premium_price == null ? null : Number(s.premium_price),
  }));
});
