import { queryOptions } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export const messagesQuery = (projectId: string) =>
  queryOptions({
    queryKey: ["messages", projectId],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("messages")
        .select("*")
        .eq("project_id", projectId)
        .order("created_at");
      if (error) throw error;
      return data ?? [];
    },
  });

export const allBooksQuery = queryOptions({
  queryKey: ["staff-books"],
  queryFn: async () => {
    const { data, error } = await supabase
      .from("projects")
      .select("*, orders(price, in_package)")
      .neq("stage", "draft")
      .order("updated_at", { ascending: false });
    if (error) throw error;
    return data ?? [];
  },
});

export type FileKind =
  | "manuscript"
  | "audio"
  | "transcript"
  | "consent"
  | "cover"
  | "interior"
  | "epub"
  | "audio_final"
  | "reference";

export const FILE_KIND_LABELS: Record<FileKind, string> = {
  manuscript: "Manuscript",
  audio: "Audio recording",
  transcript: "Transcript",
  consent: "Consent form",
  cover: "Cover",
  interior: "Interior",
  epub: "Ebook (EPUB)",
  audio_final: "Final audio",
  reference: "Reference",
};

/** What authors upload vs. what the team delivers. */
export const AUTHOR_KINDS: FileKind[] = ["manuscript", "audio", "reference"];
export const DELIVERABLE_KINDS: FileKind[] = ["transcript", "cover", "interior", "epub", "audio_final"];

export const MAX_UPLOAD_BYTES = 200 * 1024 * 1024;

export function storagePath(projectId: string, kind: FileKind, fileName: string) {
  return `${projectId}/${kind}/${Date.now()}-${fileName.replace(/[^\w.-]+/g, "_")}`;
}

export function formatBytes(n: number | null | undefined) {
  if (!n) return "";
  if (n < 1024 * 1024) return `${Math.max(1, Math.round(n / 1024))} KB`;
  return `${(n / 1024 / 1024).toFixed(1)} MB`;
}
