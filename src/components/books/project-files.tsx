import { useRef, useState } from "react";
import { toast } from "sonner";
import { Download, FileUp, Loader2, Paperclip, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { supabase } from "@/integrations/supabase/client";
import type { ProjectFile } from "@/lib/books";
import {
  AUTHOR_KINDS,
  DELIVERABLE_KINDS,
  FILE_KIND_LABELS,
  MAX_UPLOAD_BYTES,
  formatBytes,
  storagePath,
  type FileKind,
} from "@/lib/workspace";

export function ProjectFiles({
  projectId,
  files,
  userId,
  isStaff,
  onChange,
}: {
  projectId: string;
  files: ProjectFile[];
  userId: string;
  isStaff: boolean;
  onChange: () => Promise<unknown>;
}) {
  const kinds = isStaff ? DELIVERABLE_KINDS : AUTHOR_KINDS;
  const [kind, setKind] = useState<FileKind>(kinds[0]!);
  const [uploading, setUploading] = useState(false);
  const input = useRef<HTMLInputElement>(null);

  const yours = files.filter((f) => AUTHOR_KINDS.includes(f.kind as FileKind));
  const deliverables = files.filter((f) => DELIVERABLE_KINDS.includes(f.kind as FileKind));

  async function upload(list: FileList | null) {
    if (!list?.length) return;
    setUploading(true);
    try {
      for (const file of Array.from(list)) {
        if (file.size > MAX_UPLOAD_BYTES) throw new Error(`${file.name} is larger than 200 MB`);
        const path = storagePath(projectId, kind, file.name);
        const up = await supabase.storage.from("project-files").upload(path, file);
        if (up.error) throw up.error;
        const version = files.filter((f) => f.kind === kind).length + 1;
        const ins = await supabase.from("project_files").insert({
          project_id: projectId,
          kind,
          name: file.name,
          storage_path: path,
          size_bytes: file.size,
          version,
        });
        if (ins.error) throw ins.error;
      }
      toast.success("Uploaded");
      await onChange();
    } catch (e) {
      toast.error(e instanceof Error ? e.message : "Upload failed");
    } finally {
      setUploading(false);
      if (input.current) input.current.value = "";
    }
  }

  async function download(f: ProjectFile) {
    const { data, error } = await supabase.storage.from("project-files").createSignedUrl(f.storage_path, 60);
    if (error || !data) {
      toast.error(error?.message ?? "Could not open the file");
      return;
    }
    window.open(data.signedUrl, "_blank", "noopener");
  }

  async function remove(f: ProjectFile) {
    if (!window.confirm(`Remove ${f.name}?`)) return;
    await supabase.storage.from("project-files").remove([f.storage_path]);
    const { error } = await supabase.from("project_files").delete().eq("id", f.id);
    if (error) {
      toast.error(error.message);
      return;
    }
    await onChange();
  }

  const List = ({ items, empty }: { items: ProjectFile[]; empty: string }) => (
    <ul className="mt-3 space-y-2">
      {items.map((f) => (
        <li key={f.id} className="flex items-center justify-between gap-3 rounded-xl bg-paper px-3 py-2.5 text-sm">
          <span className="flex min-w-0 items-center gap-2">
            <Paperclip className="h-4 w-4 shrink-0 text-brand-deep" />
            <span className="min-w-0">
              <span className="block truncate font-medium">{f.name}</span>
              <span className="block text-xs text-muted-foreground">
                {FILE_KIND_LABELS[f.kind as FileKind] ?? f.kind} · v{f.version}
                {f.size_bytes ? ` · ${formatBytes(f.size_bytes)}` : ""} ·{" "}
                {new Date(f.created_at).toLocaleDateString(undefined, { dateStyle: "medium" })}
              </span>
            </span>
          </span>
          <span className="flex shrink-0 gap-1">
            <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => download(f)} aria-label={`Download ${f.name}`}>
              <Download />
            </Button>
            {(f.uploaded_by === userId || isStaff) && (
              <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => remove(f)} aria-label={`Remove ${f.name}`}>
                <Trash2 />
              </Button>
            )}
          </span>
        </li>
      ))}
      {items.length === 0 && <li className="rounded-xl border border-dashed border-border p-4 text-sm text-muted-foreground">{empty}</li>}
    </ul>
  );

  return (
    <div className="space-y-8">
      <div>
        <p className="eyebrow">From the team</p>
        <List items={deliverables} empty="Drafts, covers and final files from our team will appear here." />
      </div>
      <div>
        <p className="eyebrow">{isStaff ? "From the author" : "Your files"}</p>
        <List items={yours} empty={isStaff ? "The author hasn't uploaded anything yet." : "Upload your manuscript, recordings or reference material."} />
      </div>
      <div className="flex flex-col gap-3 rounded-2xl border border-border p-4 sm:flex-row sm:items-center">
        <Select value={kind} onValueChange={(v) => setKind(v as FileKind)}>
          <SelectTrigger className="sm:w-52" aria-label="File type"><SelectValue /></SelectTrigger>
          <SelectContent>
            {kinds.map((k) => <SelectItem key={k} value={k}>{FILE_KIND_LABELS[k]}</SelectItem>)}
          </SelectContent>
        </Select>
        <input ref={input} type="file" multiple className="sr-only" onChange={(e) => upload(e.target.files)} aria-label="Choose files to upload" />
        <Button variant="brand" className="sm:ml-auto" onClick={() => input.current?.click()} disabled={uploading}>
          {uploading ? <Loader2 className="animate-spin" /> : <FileUp />} {isStaff ? "Upload deliverable" : "Upload files"}
        </Button>
      </div>
      <p className="text-xs text-muted-foreground">Up to 200 MB per file. Uploading the same type again keeps earlier versions.</p>
    </div>
  );
}
