type AdVariant = 'leaderboard' | 'rectangle'

type AdPlaceholderProps = {
  /**
   * Reserves the aspect the future AdSense unit will occupy.
   * `leaderboard` ≈ 728x90 / 970x250, `rectangle` ≈ 336x280.
   */
  variant?: AdVariant
  label?: string
  className?: string
}

// Heights are fixed rather than intrinsic so the slot reserves its space before
// the ad script loads — swapping the inner div for an <ins class="adsbygoogle">
// later should not shift the surrounding layout.
const variants: Record<AdVariant, string> = {
  leaderboard: 'h-[100px] sm:h-[120px] lg:h-[250px]',
  rectangle: 'h-[280px] sm:h-[250px]',
}

export default function AdPlaceholder({
  variant = 'leaderboard',
  label = 'Advertisement',
  className = '',
}: AdPlaceholderProps) {
  return (
    <aside
      aria-label={label}
      className={`flex w-full items-center justify-center rounded-lg border border-dashed border-zinc-200 bg-zinc-50/70 ${variants[variant]} ${className}`}
    >
      <span className="text-[0.625rem] font-medium tracking-[0.2em] text-zinc-400 uppercase select-none">
        {label}
      </span>
    </aside>
  )
}
