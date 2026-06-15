// app/layout.tsx
import './globals.css'
import { Analytics } from "@vercel/analytics/next"
import { ThemeProvider } from 'next-themes'
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Abubacker Siddique Website',
  description: 'Hi, I\'m Abu Frontend Developer & Content Creator.',
  verification: {
    google: 'X6_quBVhKvNd6O5qAnCysIWKdVS56Grb1WDs4vp-nvU',
  },
  openGraph: {
    title: 'Abubacker Siddique Website',
    description: 'Hi, I\'m Abu Frontend Developer & Content Creator.',
    images: [
      {
        url: '/open graph pic.png',
        width: 1200,
        height: 630,
      },
    ],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body suppressHydrationWarning>
        

        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {/* ② <main> landmark — id matches the skip link href.
              Wraps page-level content so screen readers can jump here
              and WCAG 2.1 SC 2.4.1 bypass-block requirement is met. */}
          <main id="main-content">
            {children}
          </main>
          <Analytics />
        </ThemeProvider>
      </body>
    </html>
  )
}