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

// Heights are fixed rather than intrinsic so the slot holds its space before
// the ad script loads — swapping the inner div for an <ins class="adsbygoogle">
// later must not shift the surrounding layout.
const variants: Record<AdVariant, string> = {
  leaderboard: 'h-[100px] sm:h-[120px] lg:h-[200px]',
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
      className={`border-rule flex w-full items-center justify-center border-y ${variants[variant]} ${className}`}
    >
      <span className="text-ink-faint text-[0.5625rem] tracking-[0.28em] uppercase select-none">
        {label}
      </span>
    </aside>
  )
}
