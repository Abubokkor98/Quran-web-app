import Link from "next/link";

export function HeaderLogo() {
  return (
    <Link
      href="/"
      className="flex items-center gap-3 group"
      id="app-logo"
    >
      <div className="flex size-9 items-center justify-center rounded-md border border-gold/20 bg-gold-muted transition-colors group-hover:border-gold/40">
        <span className="text-base">☪</span>
      </div>
      <div className="hidden sm:block">
        <span className="text-sm font-semibold tracking-wide uppercase">
          Quran
        </span>
        <span className="text-sm font-light tracking-widest text-muted-foreground ml-1.5">
          Reader
        </span>
      </div>
    </Link>
  );
}
