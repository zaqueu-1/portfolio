interface CompanyLogoProps {
  src?: string
}

export function CompanyLogo({ src }: CompanyLogoProps) {
  if (!src) return null

  return (
    <div
      className="flex size-8 shrink-0 items-center justify-center border border-border bg-white/[0.04] p-1 sm:size-9"
      aria-hidden
    >
      <img
        src={src}
        alt=""
        width={32}
        height={32}
        className="max-h-full max-w-full object-contain opacity-90 grayscale-[25%] contrast-[1.02]"
      />
    </div>
  )
}
