import { useState } from "react";
import { toast } from "sonner";
import { Loader2, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { supabase } from "@/integrations/supabase/client";
import type { OrderRow, Project } from "@/lib/books";
import { STAGES, type Stage } from "@/lib/stages";

/** Team-only panel: move the book along and price custom-quote services. */
export function StaffControls({
  project,
  orders,
  onChange,
}: {
  project: Project;
  orders: OrderRow[];
  onChange: () => Promise<unknown>;
}) {
  const [stage, setStage] = useState<Stage>(project.stage);
  const [busy, setBusy] = useState<string | null>(null);
  const [prices, setPrices] = useState<Record<string, string>>({});
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

  async function savePrice(o: OrderRow) {
    const value = Number(prices[o.id]);
    if (!(value > 0)) {
      toast.error("Enter a price in Naira");
      return;
    }
    setBusy(o.id);
    const { error } = await supabase.from("orders").update({ price: value, unit_price: value }).eq("id", o.id);
    setBusy(null);
    if (error) {
      toast.error(error.message);
      return;
    }
    toast.success("Quote updated");
    await onChange();
  }

  return (
    <section className="rounded-3xl border border-brand/40 bg-accent/50 p-6 shadow-soft">
      <h2 className="flex items-center gap-2 text-xl font-medium"><ShieldCheck className="h-5 w-5 text-brand-deep" /> Team controls</h2>
      <p className="mt-1 text-sm text-muted-foreground">Only Publish Plug staff see this.</p>
      <div className="mt-4 flex gap-2">
        <Select value={stage} onValueChange={(v) => setStage(v as Stage)}>
          <SelectTrigger aria-label="Stage"><SelectValue /></SelectTrigger>
          <SelectContent>{STAGES.map((s) => <SelectItem key={s.key} value={s.key}>{s.label}</SelectItem>)}</SelectContent>
        </Select>
        <Button variant="brand" onClick={saveStage} disabled={busy === "stage" || stage === project.stage}>
          {busy === "stage" && <Loader2 className="animate-spin" />} Move
        </Button>
      </div>
      {pending.length > 0 && (
        <div className="mt-5 space-y-3">
          <p className="eyebrow">Custom quotes</p>
          {pending.map((o) => (
            <div key={o.id} className="flex items-center gap-2">
              <span className="flex-1 text-sm font-semibold">{o.services?.name ?? o.service_code}</span>
              <Input
                type="number"
                min={0}
                step={1000}
                placeholder="₦"
                className="w-32"
                value={prices[o.id] ?? ""}
                onChange={(e) => setPrices((p) => ({ ...p, [o.id]: e.target.value }))}
                aria-label={`Price for ${o.services?.name ?? o.service_code}`}
              />
              <Button variant="outline" onClick={() => savePrice(o)} disabled={busy === o.id}>
                {busy === o.id && <Loader2 className="animate-spin" />} Set
              </Button>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
