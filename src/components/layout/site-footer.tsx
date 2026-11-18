import { Link } from "@tanstack/react-router";
import { Logo } from "@/components/brand/logo";

export function SiteFooter() {
  return (
    <footer className="bg-gradient-ink text-ink-foreground">
      <div className="mx-auto grid max-w-6xl gap-10 px-5 py-14 md:grid-cols-[1.4fr_1fr_1fr]">
        <div className="space-y-4">
          <Logo inverted />
          <p className="max-w-sm text-sm leading-relaxed text-ink-foreground/70">
            An all-in-one self-publishing company. We help you create, publish and distribute your
            book — and you keep full ownership of your work.
          </p>
        </div>
        <div className="space-y-3 text-sm">
          <p className="eyebrow">Explore</p>
          <a href="/#services" className="block text-ink-foreground/80 hover:text-brand">Services</a>
          <a href="/#packages" className="block text-ink-foreground/80 hover:text-brand">Packages</a>
          <Link to="/pricing" className="block text-ink-foreground/80 hover:text-brand">Pricing</Link>
        </div>
        <div className="space-y-3 text-sm">
          <p className="eyebrow">Authors</p>
          <Link to="/auth" search={{ mode: "signup" }} className="block text-ink-foreground/80 hover:text-brand">Start your book</Link>
          <Link to="/auth" className="block text-ink-foreground/80 hover:text-brand">Sign in</Link>
        </div>
      </div>
      <div className="border-t border-ink-foreground/10">
        <p className="mx-auto max-w-6xl px-5 py-5 text-xs text-ink-foreground/50">
          © {new Date().getFullYear()} Publish Plug. Your story, published.
        </p>
      </div>
    </footer>
  );
}
