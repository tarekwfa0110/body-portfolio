import { Analytics } from '@vercel/analytics/next'
import type { Metadata, Viewport } from 'next'
import '@fontsource-variable/dm-sans/wght.css'
import '@fontsource/cormorant-garamond/latin-400.css'
import './globals.css'

export const metadata: Metadata = {
  title: 'Abdelrahman Alaa — Clinical Portfolio',
  description:
    'A visual clinical portfolio of restorative and endodontic dentistry by Abdelrahman Alaa, intern dentist at Assiut University Faculty of Dentistry.',
  icons: {
    icon: '/icon.png',
    apple: '/icon.png',
  },
}

export const viewport: Viewport = {
  colorScheme: 'light',
  themeColor: '#f5f4ef',
  viewportFit: 'cover',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body>
        {children}
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
