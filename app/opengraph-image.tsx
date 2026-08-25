import { ImageResponse } from 'next/og'
import { readFile } from 'node:fs/promises'
import { join } from 'node:path'
import { siteConfig } from '@/lib/site'

export const alt = siteConfig.title
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

// Satori cannot read woff2, so the share cards use static TTFs committed to
// the repo. They mirror the fonts next/font serves to the browser.
const [serif, sans] = await Promise.all([
  readFile(join(process.cwd(), 'assets/Newsreader-Medium.ttf')),
  readFile(join(process.cwd(), 'assets/InterTight-Medium.ttf')),
])

const PAPER = '#fbfaf7'
const INK = '#171614'
const FAINT = '#77736a'
const RULE = '#e2ded4'

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          background: PAPER,
          padding: 80,
          fontFamily: 'Newsreader',
        }}
      >
        <div
          style={{
            display: 'flex',
            fontFamily: 'InterTight',
            fontSize: 24,
            color: FAINT,
            letterSpacing: 7,
          }}
        >
          DAILY EDITION
        </div>

        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <div style={{ display: 'flex', fontSize: 116, color: INK, letterSpacing: -3 }}>
            {siteConfig.name}
          </div>
          <div style={{ display: 'flex', marginTop: 20, fontSize: 40, color: '#3a3833' }}>
            One long-form idea, every morning.
          </div>
        </div>

        <div
          style={{
            display: 'flex',
            fontFamily: 'InterTight',
            fontSize: 22,
            color: FAINT,
            letterSpacing: 4,
            borderTop: `1px solid ${RULE}`,
            paddingTop: 30,
          }}
        >
          SCIENCE · PHILOSOPHY · HUMAN NATURE · GLOBAL SYSTEMS
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        { name: 'Newsreader', data: serif, style: 'normal', weight: 500 },
        { name: 'InterTight', data: sans, style: 'normal', weight: 500 },
      ],
    }
  )
}
