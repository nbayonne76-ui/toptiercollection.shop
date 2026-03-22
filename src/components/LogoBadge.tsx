interface LogoBadgeProps {
  className?: string
}

export default function LogoBadge({ className = 'h-9 w-auto' }: LogoBadgeProps) {
  return (
    <svg
      viewBox="0 0 240 148"
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      aria-label="Top Tier Collection logo"
    >
      <defs>
        <linearGradient id="silver" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#f0f0f0" />
          <stop offset="30%" stopColor="#d0d0d0" />
          <stop offset="50%" stopColor="#b8b8b8" />
          <stop offset="70%" stopColor="#d0d0d0" />
          <stop offset="100%" stopColor="#a8a8a8" />
        </linearGradient>
        <linearGradient id="glare" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="white" stopOpacity="0" />
          <stop offset="40%" stopColor="white" stopOpacity="0.3" />
          <stop offset="60%" stopColor="white" stopOpacity="0.15" />
          <stop offset="100%" stopColor="white" stopOpacity="0" />
        </linearGradient>
      </defs>

      {/* Outer badge shape */}
      <polygon
        points="120,2 218,28 236,74 218,120 120,146 22,120 4,74 22,28"
        fill="#0a0a0a"
        stroke="white"
        strokeWidth="3"
      />
      {/* Inner border */}
      <polygon
        points="120,11 210,35 226,74 210,113 120,137 30,113 14,74 30,35"
        fill="none"
        stroke="white"
        strokeWidth="1.5"
      />

      {/* TOP TIER text with glare */}
      <text
        x="120"
        y="63"
        textAnchor="middle"
        fill="white"
        fontSize="34"
        fontWeight="900"
        fontFamily="Arial Black, Arial, sans-serif"
        letterSpacing="4"
      >
        TOP TIER
      </text>
      {/* Subtle glare line over text */}
      <rect x="30" y="38" width="180" height="12" fill="url(#glare)" opacity="0.5" />

      {/* Silver pill bar */}
      <rect x="52" y="71" width="136" height="24" rx="12" fill="url(#silver)" />
      {/* Stars inside bar */}
      <text
        x="120"
        y="88"
        textAnchor="middle"
        fill="#1a1a1a"
        fontSize="14"
        fontFamily="Arial, sans-serif"
      >
        ★ ★ ★ ★ ★
      </text>

      {/* COLLECTION text */}
      <text
        x="120"
        y="120"
        textAnchor="middle"
        fill="white"
        fontSize="16"
        fontWeight="700"
        fontFamily="Arial, sans-serif"
        letterSpacing="7"
      >
        COLLECTION
      </text>
    </svg>
  )
}
