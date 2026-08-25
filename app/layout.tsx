import type { Metadata } from 'next'
import { Inter_Tight, Newsreader } from 'next/font/google'
import Header from '@/components/header'
import Footer from '@/components/footer'
import { siteConfig, siteUrl } from '@/lib/site'
import './globals.css'

// Newsreader carries an optical-size axis (6–72), so display settings pick up
// higher-contrast letterforms while body copy stays open and readable.
const newsreader = Newsreader({
  subsets: ['latin'],
  variable: '--font-newsreader',
  display: 'swap',
  style: ['normal', 'italic'],
})

const interTight = Inter_Tight({
  subsets: ['latin'],
  variable: '--font-inter-tight',
  display: 'swap',
})

export const metadata: Metadata = {
  // Resolves every relative metadata URL (including generated OG images)
  // against the real origin.
  metadataBase: new URL(siteUrl),
  title: {
    default: siteConfig.title,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  keywords: [
    'science',
    'philosophy',
    'human nature',
    'global festivals',
    'current trends',
    'daily reading',
  ],
  authors: [{ name: siteConfig.name }],
  alternates: {
    canonical: siteUrl,
  },
  openGraph: {
    title: siteConfig.title,
    description: siteConfig.description,
    url: siteUrl,
    siteName: siteConfig.name,
    type: 'website',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: siteConfig.title,
    description: siteConfig.description,
  },
  robots: {
    index: true,
    follow: true,
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${newsreader.variable} ${interTight.variable}`}>
      <body className="bg-paper text-ink-soft flex min-h-screen flex-col antialiased">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  )
}
