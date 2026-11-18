import { Check } from "lucide-react";
import { cn } from "@/lib/utils";
import { STAGES, stageIndex, type Stage } from "@/lib/stages";

export function StageBar({ stage }: { stage: Stage }) {
  const current = stageIndex(stage);
  return (
    <ol className="grid grid-cols-4 gap-y-4 sm:grid-cols-8" aria-label="Book progress">
      {STAGES.map((s, i) => {
        const done = i < current;
        const active = i === current;
        return (
          <li key={s.key} className="relative flex flex-col items-center text-center" aria-current={active ? "step" : undefined}>
            {i > 0 && (
              <span
                className={cn(
                  "absolute right-1/2 top-3.5 h-0.5 w-full -translate-y-1/2",
                  i <= current ? "bg-brand" : "bg-border",
                  i === 4 && "hidden sm:block",
                )}
                aria-hidden="true"
              />
            )}
            <span
              className={cn(
                "relative z-10 grid h-7 w-7 place-items-center rounded-full border-2 text-xs font-bold",
                done && "border-brand bg-brand text-primary-foreground",
                active && "border-brand bg-card text-brand-deep ring-4 ring-brand/20",
                !done && !active && "border-border bg-card text-muted-foreground",
              )}
            >
              {done ? <Check className="h-3.5 w-3.5" /> : i + 1}
            </span>
            <span className={cn("mt-2 text-[11px] font-semibold leading-tight", active ? "text-foreground" : "text-muted-foreground")}>
              {s.label}
            </span>
          </li>
        );
      })}
    </ol>
  );
}
