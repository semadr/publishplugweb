import type { ReactNode } from "react";
import { SiteHeader } from "./site-header";

export function AppShell({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-gradient-paper">
      <SiteHeader />
      <main className="mx-auto max-w-6xl px-5 py-10">{children}</main>
    </div>
  );
}
