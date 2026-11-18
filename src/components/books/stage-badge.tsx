import { cn } from "@/lib/utils";
import { stageInfo, stageIndex, type Stage } from "@/lib/stages";

export function StageBadge({ stage, className }: { stage: Stage; className?: string }) {
  const i = stageIndex(stage);
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 text-xs font-semibold",
        stage === "launched"
          ? "border-success/30 bg-success/10 text-success"
          : i >= 2
            ? "border-brand/50 bg-accent text-accent-foreground"
            : "border-border bg-muted text-muted-foreground",
        className,
      )}
    >
      <span className={cn("h-1.5 w-1.5 rounded-full", stage === "launched" ? "bg-success" : i >= 2 ? "bg-brand" : "bg-muted-foreground/50")} />
      {stageInfo(stage).label}
    </span>
  );
}
