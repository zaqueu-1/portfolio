interface FlagIconProps {
  className?: string
}

export function FlagBrazil({ className }: FlagIconProps) {
  return (
    <svg aria-hidden viewBox="0 0 20 14" className={className}>
      <rect width="20" height="14" fill="#009b3a" />
      <path d="M10 1.4 18.4 7 10 12.6 1.6 7Z" fill="#fedf00" />
      <circle cx="10" cy="7" r="3.1" fill="#002776" />
      <path
        d="M10 5.2c.8 1-.2 2.2-1.2 1.9-.5 1.1-1.9 1.2-2.4 0-.8.4-1.6-.4-1.3-1.3.4-.8 1.5-1.4 2.4-1.1.4-.9.5-2 1.7-1.9z"
        fill="#fff"
      />
    </svg>
  )
}

export function FlagUsa({ className }: FlagIconProps) {
  return (
    <svg aria-hidden viewBox="0 0 20 14" className={className}>
      <rect width="20" height="14" fill="#b22234" />
      <rect y="1.08" width="20" height="1.08" fill="#fff" />
      <rect y="3.23" width="20" height="1.08" fill="#fff" />
      <rect y="5.38" width="20" height="1.08" fill="#fff" />
      <rect y="7.54" width="20" height="1.08" fill="#fff" />
      <rect y="9.69" width="20" height="1.08" fill="#fff" />
      <rect y="11.85" width="20" height="1.08" fill="#fff" />
      <rect width="8" height="7.62" fill="#3c3b6e" />
    </svg>
  )
}
