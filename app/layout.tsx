// app/layout.tsx
import './globals.css'
import { ThemeProvider } from 'next-themes'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        

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
        </ThemeProvider>
      </body>
    </html>
  )
}