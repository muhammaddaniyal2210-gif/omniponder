import { LinkedInIcon, XIcon } from '@/components/BrandIcons'

type SocialLinksProps = {
  /** `sm` (18px) for the footer rail, `md` (20px) for the author block. */
  size?: 'sm' | 'md'
  className?: string
  /** Screen-reader name for the list, e.g. "Omniponder social accounts". */
  label?: string
}

const accounts = [
  { name: 'X', href: 'https://x.com/RedactLocal', Icon: XIcon },
  {
    name: 'LinkedIn',
    href: 'https://www.linkedin.com/in/muhammad-daniyal-3139a23b2/',
    Icon: LinkedInIcon,
  },
]

const sizes = {
  sm: 'h-[18px] w-[18px]',
  md: 'h-5 w-5',
} as const

export default function SocialLinks({
  size = 'sm',
  className = '',
  label = 'Social accounts',
}: SocialLinksProps) {
  return (
    <ul aria-label={label} className={`flex items-center gap-5 ${className}`}>
      {accounts.map(({ name, href, Icon }) => (
        <li key={name}>
          <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={name}
            title={name}
            className="text-ink-faint hover:text-ink focus-visible:outline-ink inline-flex transition-colors duration-200 focus-visible:outline-1 focus-visible:outline-offset-4"
          >
            <Icon className={sizes[size]} />
          </a>
        </li>
      ))}
    </ul>
  )
}
