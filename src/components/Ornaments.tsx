/** Small decorative SVGs drawn in code (no image files needed). */

export function Flourish({ className = "", tone = "gold" }: { className?: string; tone?: "gold" | "burgundy" }) {
  const c = tone === "gold" ? "var(--gold)" : "var(--burgundy)";
  return (
    <svg className={className} viewBox="0 0 260 28" fill="none" stroke={c} strokeWidth="1.2" strokeLinecap="round" aria-hidden="true">
      <path d="M6 14 H104" />
      <path d="M156 14 H254" />
      <path d="M104 14 C112 4, 120 4, 126 14 C120 24, 112 24, 104 14" />
      <path d="M156 14 C148 4, 140 4, 134 14 C140 24, 148 24, 156 14" />
      <path d="M130 7 L137 14 L130 21 L123 14 Z" fill={c} />
      <circle cx="6" cy="14" r="2" fill={c} />
      <circle cx="254" cy="14" r="2" fill={c} />
    </svg>
  );
}

/** Wax-seal style monogram. */
export function Seal({ size = 96, className = "" }: { size?: number; className?: string }) {
  return (
    <svg className={className} width={size} height={size} viewBox="0 0 120 120" aria-hidden="true">
      <defs>
        <radialGradient id="seal-g" cx="40%" cy="35%" r="75%">
          <stop offset="0" stopColor="#c4415a" />
          <stop offset="0.55" stopColor="#9b1b30" />
          <stop offset="1" stopColor="#5c1a22" />
        </radialGradient>
      </defs>
      <path
        d="M60 4 C72 2 80 10 90 12 C102 14 112 24 110 38 C108 48 118 54 116 66 C114 80 104 88 98 98 C90 110 74 110 64 116 C54 118 44 110 32 106 C18 100 8 88 8 74 C8 62 2 52 8 40 C14 26 28 20 36 12 C44 6 52 5 60 4Z"
        fill="url(#seal-g)"
      />
      <circle cx="60" cy="60" r="38" fill="none" stroke="#dcc08c" strokeWidth="1.6" strokeDasharray="1 5" strokeLinecap="round" />
      <circle cx="60" cy="60" r="31" fill="none" stroke="#dcc08c" strokeWidth="1" opacity=".8" />
      <text x="60" y="71" textAnchor="middle" fontFamily="Cormorant Garamond Variable, Georgia, serif" fontStyle="italic" fontSize="34" fill="#f6e7c8">
        SF
      </text>
    </svg>
  );
}
