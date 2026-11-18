import { Link } from "@tanstack/react-router";
import logoPrimary from "@/assets/publish-plug-logo.png.asset.json";
import logoWhite from "@/assets/publish-plug-logo-white.png.asset.json";
import { cn } from "@/lib/utils";

// Official Publish Plug logo: blue version on light backgrounds, white version on dark ones.
export function Logo({ className, inverted = false }: { className?: string; inverted?: boolean }) {
  return (
    <Link to="/" className={cn("inline-flex items-center", className)} aria-label="Publish Plug home">
      <img
        src={inverted ? logoWhite.url : logoPrimary.url}
        alt="Publish Plug"
        width={1020}
        height={196}
        className="h-7 w-auto md:h-8"
      />
    </Link>
  );
}
