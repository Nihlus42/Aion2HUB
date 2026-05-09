// Decorative SVG flourishes used as section dividers and section eyebrows.
export function RuneDivider({ className = "" }: { className?: string }) {
  return (
    <div className={`flex items-center justify-center gap-3 ${className}`} aria-hidden>
      <span className="h-px flex-1 bg-gradient-to-r from-transparent via-gold/60 to-transparent" />
      <svg width="22" height="22" viewBox="0 0 24 24" className="text-gold animate-rune-spin">
        <path fill="currentColor" d="M12 2l2.39 4.84L20 8l-4 3.9.94 5.5L12 14.8l-4.94 2.6L8 11.9 4 8l5.61-1.16z" opacity="0.7" />
        <circle cx="12" cy="12" r="2" fill="currentColor" />
      </svg>
      <span className="h-px flex-1 bg-gradient-to-r from-transparent via-gold/60 to-transparent" />
    </div>
  );
}

export function Eyebrow({ children }: { children: React.ReactNode }) {
  return (
    <div className="inline-flex items-center gap-2 text-gold text-xs tracking-[0.3em] mb-3">
      <span className="h-px w-6 bg-gold/60" />
      {children}
    </div>
  );
}
