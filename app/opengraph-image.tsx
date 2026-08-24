import { ImageResponse } from 'next/og'
import { siteConfig } from '@/lib/site'

export const alt = siteConfig.title
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

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
          background: '#ffffff',
          padding: 80,
        }}
      >
        <div style={{ display: 'flex', fontSize: 30, color: '#a1a1aa', letterSpacing: 6 }}>
          DAILY EDUCATION
        </div>

        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <div
            style={{
              display: 'flex',
              fontSize: 104,
              fontWeight: 700,
              color: '#18181b',
              letterSpacing: -3,
            }}
          >
            {siteConfig.name}
          </div>
          <div style={{ display: 'flex', marginTop: 24, fontSize: 38, color: '#52525b' }}>
            One idea, every morning.
          </div>
        </div>

        <div style={{ display: 'flex', fontSize: 26, color: '#a1a1aa' }}>
          Science &middot; Philosophy &middot; Human Nature &middot; Global Systems
        </div>
      </div>
    ),
    size
  )
}
