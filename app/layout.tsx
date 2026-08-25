import type { Metadata } from 'next'
import { Analytics } from "@vercel/analytics/react"
import { Inter_Tight, Newsreader } from 'next/font/google'
import Header from '@/components/header'
import Footer from '@/components/footer'
import JsonLd from '@/components/JsonLd'
import { organizationSchema, websiteSchema } from '@/lib/structured-data'
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
    types: {
      'application/rss+xml': [{ url: '/feed.xml', title: `${siteConfig.name} — daily` }],
    },
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
        <JsonLd data={[organizationSchema(), websiteSchema()]} />
        <Header />
        <main className="flex-1">{children}</main>
        <Analytics />
        <Footer />
      </body>
    </html>
  )
}
