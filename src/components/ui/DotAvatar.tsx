interface DotAvatarProps {
  src: string
  alt: string
  className?: string
}

export function DotAvatar({ src, alt, className = "" }: DotAvatarProps) {
  const filterId = "dot-avatar-filter"

  return (
    <div className={`relative select-none ${className}`}>
      <svg width="0" height="0" className="absolute" aria-hidden>
        <defs>
          <filter id={filterId} colorInterpolationFilters="sRGB">
            <feComponentTransfer>
              <feFuncR type="linear" slope="1.2" intercept="-0.08" />
              <feFuncG type="linear" slope="1.2" intercept="-0.08" />
              <feFuncB type="linear" slope="1.2" intercept="-0.08" />
            </feComponentTransfer>
          </filter>
        </defs>
      </svg>

      <img
        src={src}
        alt={alt}
        draggable={false}
        className="block w-full border border-purple-200 rounded-xs"
        style={{
          filter: `url(#${filterId})`,
          maskImage:
            "radial-gradient(circle 1.4px at 1.4px 1.4px, black 100%, transparent 100%)",
          maskSize: "2.5px 2.5px",
          maskRepeat: "repeat",
          WebkitMaskImage:
            "radial-gradient(circle 1.4px at 1.4px 1.4px, black 100%, transparent 100%)",
          WebkitMaskSize: "2.5px 2.5px",
          WebkitMaskRepeat: "repeat",
        }}
      />
    </div>
  )
}
