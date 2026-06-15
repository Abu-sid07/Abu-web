// app/layout.tsx
import './globals.css'
import { Analytics } from "@vercel/analytics/next"
import { ThemeProvider } from 'next-themes'
import { Metadata } from 'next';
import { GoogleTagManager } from '@next/third-parties/google';

export const metadata: Metadata = {
  // ── Core identity ──────────────────────────────────────────────────────────
  title: {
    default: 'Abubacker Siddique — Frontend Developer & Content Creator | Tirunelveli',
    template: '%s | Abubacker Siddique',
  },
  description:
    'Abubacker Siddique (Abu) is a Frontend Developer & Content Creator based in Tirunelveli, Tamil Nadu. Specialising in React, Next.js, and modern web development.',

  // ── Keyword targeting ───────────────────────────────────────────────────────
  // Strategy:
  //   • Brand terms   → direct searches for Abu's name / alias
  //   • Role + geo    → intent-driven searches from potential clients
  //   • Long-tail     → "hire / freelance / best" combos that convert
  //   • Stack terms   → technical recruiters searching skill sets
  keywords: [
    // Brand
    'Abubacker Siddique',
    'Abu webs',
    'Abu frontend developer',
    // Role + location (highest commercial intent)
    'frontend developer Tirunelveli',
    'React developer Tirunelveli',
    'Next.js developer Tirunelveli',
    'web developer Tirunelveli',
    'frontend developer Chennai',
    'React developer Chennai',
    'Next.js developer Chennai',
    'web developer Chennai',
    'frontend developer Tamil Nadu',
    'React developer Tamil Nadu',
    'web developer Tamil Nadu',
    // Remote work targeting
    'remote frontend developer India',
    'remote React developer India',
    'remote Next.js developer',
    'hire remote frontend developer',
    // Long-tail hire intent
    'hire frontend developer Tirunelveli',
    'hire frontend developer Chennai',
    'freelance React developer Tamil Nadu',
    'freelance web developer Chennai',
    'freelance frontend developer remote',
    'best frontend developer Tirunelveli',
    // Stack-specific (technical / recruiter searches)
    'Next.js developer India',
    'React developer India',
    'TypeScript developer Tamil Nadu',
    // Content creator angle
    'content creator Tirunelveli',
    'Tamil content creator',
  ],

  // ── Canonical URL ───────────────────────────────────────────────────────────
  // Prevents duplicate-content penalties when the same page is
  // reachable via http, www, or trailing-slash variants.
  metadataBase: new URL('https://abu-webs.vercel.app'),
  alternates: {
    canonical: '/',
  },

  // ── Google Search Console verification ─────────────────────────────────────
  verification: {
    google: 'X6_quBVhKvNd6O5qAnCysIWKdVS56Grb1WDs4vp-nvU',
  },

  // ── Open Graph (WhatsApp, Facebook, LinkedIn shares) ───────────────────────
  openGraph: {
    type: 'website',
    url: 'https://abu-webs.vercel.app',
    siteName: 'Abubacker Siddique',
    title: 'Abubacker Siddique — Frontend Developer & Content Creator',
    description:
      'React & Next.js developer based in Tirunelveli, Tamil Nadu. Building fast, accessible web experiences.',
    images: [
      {
        url: '/open graph pic.png',
        width: 1200,
        height: 630,
        alt: 'Abubacker Siddique — Frontend Developer & Content Creator',
      },
    ],
    locale: 'en_IN',
  },

  // ── Twitter / X card ────────────────────────────────────────────────────────
  twitter: {
    card: 'summary_large_image',
    title: 'Abubacker Siddique — Frontend Developer & Content Creator',
    description:
      'React & Next.js developer based in Tirunelveli, Tamil Nadu.',
    images: ['/open graph pic.png'],
  },

  // ── Crawl directives ────────────────────────────────────────────────────────
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },

  // ── Authorship ───────────────────────────────────────────────────────────────
  authors: [{ name: 'Abubacker Siddique', url: 'https://abu-webs.vercel.app' }],
  creator: 'Abubacker Siddique',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      {/* ── Google Tag Manager ───────────────────────────────────────────────
          Placed directly inside <html> (Next.js best practice).
          Injects both the <script> in <head> and <noscript> in <body>
          automatically — no manual placement needed. */}
      <GoogleTagManager gtmId="GTM-5R6CHEQVHY" />
      <head>
        {/*
          ── Structured Data (JSON-LD) ─────────────────────────────────────────
          Tells Google exactly who this site is about.
          Helps trigger a Knowledge Panel / rich result in search.
          Update "sameAs" links with Abu's actual social profile URLs.
        */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'Person',
              name: 'Abubacker Siddique',
              alternateName: 'Abu webs',
              url: 'https://abu-webs.vercel.app',
              jobTitle: 'Frontend Developer & Content Creator',
              description:
                'Frontend Developer specialising in React and Next.js, based in Tirunelveli, Tamil Nadu, India.',
              address: {
                '@type': 'PostalAddress',
                addressLocality: 'Tirunelveli',
                addressRegion: 'Tamil Nadu',
                addressCountry: 'IN',
              },
              knowsAbout: ['React', 'Next.js', 'TypeScript', 'Frontend Development', 'Web Design'],
              sameAs: [
                // ← Replace these with your real profile links
                'https://github.com/YOUR_USERNAME',
                'https://linkedin.com/in/YOUR_USERNAME',
                'https://twitter.com/YOUR_USERNAME',
              ],
            }),
          }}
        />
      </head>
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