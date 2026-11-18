import { useEffect, useRef, useState } from "react";
import { useQueryClient, useQuery } from "@tanstack/react-query";
import { toast } from "sonner";
import { Loader2, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { supabase } from "@/integrations/supabase/client";
import { messagesQuery } from "@/lib/workspace";
import { cn } from "@/lib/utils";

export function MessageThread({
  projectId,
  userId,
  ownerId,
  authorLabel,
}: {
  projectId: string;
  userId: string;
  ownerId: string;
  authorLabel: string;
}) {
  const queryClient = useQueryClient();
  const { data: messages = [], isLoading } = useQuery(messagesQuery(projectId));
  const [body, setBody] = useState("");
  const [sending, setSending] = useState(false);
  const end = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const channel = supabase
      .channel(`messages-${projectId}-${Math.random().toString(36).slice(2)}`)
      .on(
        "postgres_changes",
        { event: "INSERT", schema: "public", table: "messages", filter: `project_id=eq.${projectId}` },
        () => queryClient.invalidateQueries({ queryKey: ["messages", projectId] }),
      )
      .subscribe();
    return () => {
      supabase.removeChannel(channel);
    };
  }, [projectId, queryClient]);

  useEffect(() => {
    end.current?.scrollIntoView({ block: "nearest" });
  }, [messages.length]);

  async function send(e: React.FormEvent) {
    e.preventDefault();
    const text = body.trim();
    if (!text) return;
    setSending(true);
    const { error } = await supabase.from("messages").insert({ project_id: projectId, body: text.slice(0, 4000) });
    setSending(false);
    if (error) {
      toast.error(error.message);
      return;
    }
    setBody("");
    await queryClient.invalidateQueries({ queryKey: ["messages", projectId] });
  }

  const who = (senderId: string) =>
    senderId === userId ? "You" : senderId === ownerId ? authorLabel : "Publish Plug team";

  return (
    <div>
      <div className="max-h-[28rem] space-y-3 overflow-y-auto rounded-2xl bg-paper p-4">
        {isLoading && <p className="text-sm text-muted-foreground">Loading messages…</p>}
        {!isLoading && messages.length === 0 && (
          <p className="text-sm text-muted-foreground">No messages yet. Ask a question or share a note with the team.</p>
        )}
        {messages.map((m) => {
          const mine = m.sender_id === userId;
          return (
            <div key={m.id} className={cn("flex", mine ? "justify-end" : "justify-start")}>
              <div className={cn("max-w-[85%] rounded-2xl px-4 py-2.5 text-sm shadow-soft", mine ? "bg-primary text-primary-foreground" : "bg-card")}>
                <p className={cn("text-xs font-semibold", mine ? "text-primary-foreground/80" : "text-brand-deep")}>
                  {who(m.sender_id)} · {new Date(m.created_at).toLocaleString(undefined, { dateStyle: "medium", timeStyle: "short" })}
                </p>
                <p className="mt-1 whitespace-pre-wrap">{m.body}</p>
              </div>
            </div>
          );
        })}
        <div ref={end} />
      </div>
      <form onSubmit={send} className="mt-3 flex items-end gap-2">
        <Textarea
          value={body}
          onChange={(e) => setBody(e.target.value)}
          rows={2}
          maxLength={4000}
          placeholder="Write a message…"
          aria-label="Message"
          onKeyDown={(e) => {
            if (e.key === "Enter" && (e.metaKey || e.ctrlKey)) send(e);
          }}
        />
        <Button type="submit" variant="brand" disabled={sending || !body.trim()} aria-label="Send message">
          {sending ? <Loader2 className="animate-spin" /> : <Send />}
        </Button>
      </form>
    </div>
  );
}
