type IconProps = {
  className?: string;
};

export function RiftIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 64 64" className={className} aria-hidden>
      <defs>
        <radialGradient id="riftCore" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="currentColor" stopOpacity="0.9" />
          <stop offset="100%" stopColor="currentColor" stopOpacity="0.1" />
        </radialGradient>
      </defs>
      <circle cx="32" cy="32" r="28" fill="none" stroke="currentColor" strokeOpacity="0.25" strokeWidth="2" />
      <ellipse cx="32" cy="32" rx="16" ry="20" fill="url(#riftCore)" />
      <path
        d="M20 35c6-10 19-15 27-8-8-2-13 2-17 7 6-1 11 2 12 7-5-3-10-2-15 1 2-3 1-5-1-7-2-2-4-2-6 0z"
        fill="currentColor"
        fillOpacity="0.75"
      />
      <path d="M24 16l2 4 4 2-4 2-2 4-2-4-4-2 4-2zM44 40l1.5 3 3 1.5-3 1.5-1.5 3-1.5-3-3-1.5 3-1.5z" fill="currentColor" />
    </svg>
  );
}

export function DailyResetIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 64 64" className={className} aria-hidden>
      <circle cx="32" cy="32" r="26" fill="none" stroke="currentColor" strokeOpacity="0.3" strokeWidth="2.5" />
      <circle cx="32" cy="32" r="18" fill="currentColor" fillOpacity="0.12" />
      <path d="M32 18v14l9 5" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M21 14a16 16 0 1 0 22 0c-4 1-6 3-11 3-5 0-7-2-11-3z" fill="none" stroke="currentColor" strokeOpacity="0.6" strokeWidth="2" />
      <path d="M14 32h4M46 32h4M32 14v4M32 46v4" stroke="currentColor" strokeOpacity="0.5" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

export function WeeklyResetIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 64 64" className={className} aria-hidden>
      <circle cx="32" cy="32" r="27" fill="none" stroke="currentColor" strokeOpacity="0.3" strokeWidth="2" />
      <path d="M32 10l5 9 10 2-7 7 1 10-9-5-9 5 1-10-7-7 10-2z" fill="currentColor" fillOpacity="0.2" />
      <path d="M32 16l3 6 6 1-4 4 1 6-6-3-6 3 1-6-4-4 6-1z" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinejoin="round" />
      <path d="M32 22v10M27 32h10" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
      <path d="M32 6v4M32 54v4M6 32h4M54 32h4" stroke="currentColor" strokeOpacity="0.5" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

export function ShugoIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 64 64" className={className} aria-hidden>
      <circle cx="32" cy="34" r="20" fill="currentColor" fillOpacity="0.12" />
      <path d="M22 24c0-5 4-9 10-9s10 4 10 9v4c0 6-4 10-10 10s-10-4-10-10z" fill="none" stroke="currentColor" strokeWidth="2.5" />
      <circle cx="28" cy="28" r="1.6" fill="currentColor" />
      <circle cx="36" cy="28" r="1.6" fill="currentColor" />
      <path d="M28 33c1.5 2 6.5 2 8 0" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <path d="M20 24l-5-3M44 24l5-3" stroke="currentColor" strokeOpacity="0.7" strokeWidth="2.5" strokeLinecap="round" />
      <path d="M24 40h16l-2 10H26z" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinejoin="round" />
      <circle cx="32" cy="45" r="2.2" fill="currentColor" fillOpacity="0.8" />
      <path d="M30 45h4M32 43v4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

