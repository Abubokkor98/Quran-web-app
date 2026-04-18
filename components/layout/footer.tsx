export function Footer() {
  return (
    <footer className="mt-auto border-t border-border/40">
      <div className="mx-auto max-w-6xl px-6 py-8">
        <div className="ornament-divider max-w-[200px] mx-auto mb-6">
          <span className="text-gold/30 text-[10px]">❖</span>
        </div>
        <div className="text-center space-y-2">
          <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground/60">
            Quran Reader
          </p>
          <p className="text-xs text-muted-foreground/40">
            Data:{" "}
            <a
              href="https://github.com/risan/quran-json"
              target="_blank"
              rel="noopener noreferrer"
              className="underline underline-offset-4 hover:text-gold transition-colors"
            >
              quran-json
            </a>
            {" · "}
            Translation: Sahih International
          </p>
        </div>
      </div>
    </footer>
  );
}
