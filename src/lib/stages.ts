import type { Database } from "@/integrations/supabase/types";

export type Stage = Database["public"]["Enums"]["project_stage"];

export const STAGES: { key: Stage; label: string; next: string }[] = [
  { key: "draft", label: "Draft", next: "Finish setting up your book and request a quote" },
  { key: "quoted", label: "Quoted", next: "Review your quote and place the order" },
  { key: "ordered", label: "Ordered", next: "Upload your manuscript or recordings in the workspace below — our team is getting started" },
  { key: "content", label: "Content", next: "Writing and editing are under way" },
  { key: "design", label: "Design", next: "Cover, interior and ebook files are being made" },
  { key: "review", label: "In review", next: "Review your deliverables and approve them" },
  { key: "publishing", label: "Publishing", next: "ISBNs, final files and store set-up" },
  { key: "launched", label: "Launched", next: "Your book is live — keep the launch going" },
];

export const stageIndex = (s: Stage) => STAGES.findIndex((x) => x.key === s);
export const stageInfo = (s: Stage) => STAGES[stageIndex(s)] ?? STAGES[0]!;
export const stageProgress = (s: Stage) =>
  Math.round((stageIndex(s) / (STAGES.length - 1)) * 100);
