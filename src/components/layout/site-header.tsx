import { Link, useNavigate } from "@tanstack/react-router";
import { useQueryClient } from "@tanstack/react-query";
import { LayoutDashboard, LogOut, Menu, Plus, ShieldCheck } from "lucide-react";
import { useState } from "react";
import { Logo } from "@/components/brand/logo";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { useAuth } from "@/hooks/use-auth";
import { supabase } from "@/integrations/supabase/client";
import { useIsStaff } from "@/lib/roles";

const NAV = [
  { href: "/#services", label: "Services" },
  { href: "/#packages", label: "Packages" },
  { href: "/pricing", label: "Pricing" },
];

export function SiteHeader() {
  const { user, ready } = useAuth();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [open, setOpen] = useState(false);
  const isStaff = useIsStaff(!!user);

  async function signOut() {
    await queryClient.cancelQueries();
    queryClient.clear();
    await supabase.auth.signOut();
    navigate({ to: "/auth", replace: true });
  }

  return (
    <header className="sticky top-0 z-40 border-b border-border/70 bg-background/85 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-5">
        <Logo />
        <nav className="hidden items-center gap-7 md:flex" aria-label="Main">
          {NAV.map((n) => (
            <a key={n.href} href={n.href} className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground">
              {n.label}
            </a>
          ))}
        </nav>
        <div className="hidden items-center gap-2 md:flex">
          {ready && user ? (
            <>
              {isStaff && (
                <Button variant="ghost" size="sm" asChild>
                  <Link to="/staff"><ShieldCheck /> Team</Link>
                </Button>
              )}
              <Button variant="ghost" size="sm" asChild>
                <Link to="/dashboard"><LayoutDashboard /> My books</Link>
              </Button>
              <Button variant="brand" size="sm" asChild>
                <Link to="/books/new"><Plus /> New book</Link>
              </Button>
              <Button variant="ghost" size="icon" onClick={signOut} aria-label="Sign out">
                <LogOut />
              </Button>
            </>
          ) : (
            <>
              <Button variant="ghost" size="sm" asChild>
                <Link to="/auth">Sign in</Link>
              </Button>
              <Button variant="brand" size="sm" asChild>
                <Link to="/auth" search={{ mode: "signup" }}>Start your book</Link>
              </Button>
            </>
          )}
        </div>
        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon" className="md:hidden" aria-label="Open menu">
              <Menu />
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="w-72">
            <SheetTitle className="font-display">Menu</SheetTitle>
            <div className="mt-6 flex flex-col gap-1">
              {NAV.map((n) => (
                <a key={n.href} href={n.href} onClick={() => setOpen(false)} className="rounded-md px-3 py-2.5 text-sm font-medium hover:bg-accent">
                  {n.label}
                </a>
              ))}
              <div className="my-3 h-px bg-border" />
              {user ? (
                <>
                  {isStaff && <Link to="/staff" onClick={() => setOpen(false)} className="rounded-md px-3 py-2.5 text-sm font-medium hover:bg-accent">Team board</Link>}
                  <Link to="/dashboard" onClick={() => setOpen(false)} className="rounded-md px-3 py-2.5 text-sm font-medium hover:bg-accent">My books</Link>
                  <Link to="/books/new" onClick={() => setOpen(false)} className="rounded-md px-3 py-2.5 text-sm font-medium hover:bg-accent">New book</Link>
                  <button onClick={signOut} className="rounded-md px-3 py-2.5 text-left text-sm font-medium hover:bg-accent">Sign out</button>
                </>
              ) : (
                <>
                  <Link to="/auth" onClick={() => setOpen(false)} className="rounded-md px-3 py-2.5 text-sm font-medium hover:bg-accent">Sign in</Link>
                  <Button variant="brand" className="mt-2" asChild>
                    <Link to="/auth" search={{ mode: "signup" }} onClick={() => setOpen(false)}>Start your book</Link>
                  </Button>
                </>
              )}
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
}
