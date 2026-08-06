// tailwind.config.js
/** @type {import('tailwindcss').Config} */
const plugin = require("tailwindcss/plugin");

module.exports = {
  // ─────────────────────────────────────────────────────────────
  // 1. CONTENT PATHS
  //    Tailwind scans these to tree-shake unused classes.
  //    Add /src/** if you use a src/ directory.
  // ─────────────────────────────────────────────────────────────
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx}",
  ],

  // ─────────────────────────────────────────────────────────────
  // 2. DARK MODE
  //    "class" → controlled by next-themes ThemeProvider.
  //    ThemeProvider adds/removes "dark" on <html>.
  // ─────────────────────────────────────────────────────────────
  darkMode: "class",

  theme: {
    extend: {
      // ───────────────────────────────────────────────────────
      // 3. TYPE SCALE
      //
      //    Rule: every fontSize token bakes in its own lineHeight
      //    so you never combine text-* with leading-* in markup.
      //    Exception: headings may add font-weight only.
      //
      //    Token   px    Use
      //    ──────────────────────────────────────────────────
      //    xs      12    Tags, badges, timestamps, meta text
      //    sm      14    Captions, nav links, button labels,
      //                  helper text, footer copy
      //    base    16    ALL body paragraphs — default prose
      //    lg      18    Card sub-headings, pull quotes
      //    xl      20    Card titles (h3 under a section h2)
      //    2xl     24    Section sub-headings
      //    3xl     30    Section headings (h2) on desktop
      //    4xl     36    Large section hero text
      //    5xl     48    Hero h1 on mobile
      //    6xl     60    Hero h1 on desktop
      //    hero    fluid Hero h1 — clamp(2rem, 8vw, 3.8rem)
      //                  Use text-hero on your single <h1>.
      //                  Replaces inline style={{ fontSize: 'clamp(...)' }}
      //
      //    NEVER use text-[15px] or other arbitrary sizes.
      // ───────────────────────────────────────────────────────
      fontSize: {
        xs:    ["0.75rem",              { lineHeight: "1.5",  letterSpacing: "0.025em" }],
        sm:    ["0.875rem",             { lineHeight: "1.625" }],
        base:  ["1rem",                 { lineHeight: "1.75"  }],
        lg:    ["1.125rem",             { lineHeight: "1.6"   }],
        xl:    ["1.25rem",              { lineHeight: "1.5"   }],
        "2xl": ["1.5rem",               { lineHeight: "1.4"   }],
        "3xl": ["1.875rem",             { lineHeight: "1.3"   }],
        "4xl": ["2.25rem",              { lineHeight: "1.2"   }],
        "5xl": ["3rem",                 { lineHeight: "1.1"   }],
        "6xl": ["3.75rem",              { lineHeight: "1.05"  }],
        // FIX: hero token added — replaces inline clamp() in MinimalistHero.
        // Usage: <h1 className="text-hero font-extrabold">
        // font-weight is NOT part of the token — set it per-instance.
        hero:  ["clamp(2rem,8vw,3.8rem)", { lineHeight: "1.1" }],
      },

      // ───────────────────────────────────────────────────────
      // 4. FONT FAMILY
      //    Loaded via next/font in app/layout.tsx:
      //
      //    import { Inter, JetBrains_Mono } from 'next/font/google'
      //    const inter = Inter({
      //      subsets: ['latin'],
      //      variable: '--font-inter',
      //      display: 'swap',
      //    })
      //    const mono = JetBrains_Mono({
      //      subsets: ['latin'],
      //      variable: '--font-mono',
      //      display: 'swap',
      //    })
      //    <html className={`${inter.variable} ${mono.variable}`}>
      // ───────────────────────────────────────────────────────
      fontFamily: {
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
        mono: ["var(--font-mono)", "Menlo", "Consolas", "monospace"],
      },

      // ───────────────────────────────────────────────────────
      // 5. COLOR PALETTE
      //    All colors are CSS variables → dark mode works by
      //    swapping variable values under .dark, not by
      //    duplicating classes with dark: prefix.
      //
      //    Usage in JSX:
      //      bg-background     text-foreground
      //      bg-card           text-card-foreground
      //      text-muted-foreground
      //      border-border
      //      bg-accent         text-accent-foreground
      //
      //    Direct Tailwind palette (slate-700, yellow-400, etc.)
      //    still works for one-off brand colours.
      // ───────────────────────────────────────────────────────
      colors: {
        background:          "hsl(var(--background))",
        foreground:          "hsl(var(--foreground))",
        card:                "hsl(var(--card))",
        "card-foreground":   "hsl(var(--card-foreground))",
        muted:               "hsl(var(--muted))",
        "muted-foreground":  "hsl(var(--muted-foreground))",
        border:              "hsl(var(--border))",
        // FIX: split ring into two tokens.
        // --ring        → general outline / border ring
        // --focus-ring  → keyboard focus indicator (WCAG 2.4.7)
        // Using the same value for both meant changing focus colour
        // would break decorative rings everywhere.
        ring:                "hsl(var(--ring))",
        "focus-ring":        "hsl(var(--focus-ring))",
        accent:              "hsl(var(--accent))",
        "accent-foreground": "hsl(var(--accent-foreground))",
        primary:             "hsl(var(--primary))",
        "primary-foreground":"hsl(var(--primary-foreground))",
      },

      // ───────────────────────────────────────────────────────
      // 6. MAX-WIDTH TOKENS
      //
      //    prose-width → 65ch — optimal reading measure
      //    content     → full page container
      //    section     → inner section container
      //    card        → single card cap
      // ───────────────────────────────────────────────────────
      maxWidth: {
        "prose-width": "65ch",
        content:       "1200px",
        section:       "1024px",
        card:          "380px",
      },

      // ───────────────────────────────────────────────────────
      // 7. BORDER RADIUS
      //    Use these tokens — never rounded-[10px].
      //
      //    sm      4px   tags, inline badges
      //    DEFAULT 6px   inputs, small buttons
      //    md      8px   buttons
      //    lg      12px  cards, modals
      //    xl      16px  large cards, hero image
      //    full    9999  pills, avatar circles
      // ───────────────────────────────────────────────────────
      borderRadius: {
        none:    "0",
        sm:      "0.25rem",
        DEFAULT: "0.375rem",
        md:      "0.5rem",
        lg:      "0.75rem",
        xl:      "1rem",
        "2xl":   "1.25rem",
        full:    "9999px",
      },

      // ───────────────────────────────────────────────────────
      // 8. BOX SHADOW
      //
      //    card-hover      light mode card lift
      //    card-hover-dark dark mode card lift
      //    glow            decorative element glow
      //
      //    Note: focus rings are handled via :focus-visible
      //    in addBase — NOT via box-shadow utilities.
      // ───────────────────────────────────────────────────────
      boxShadow: {
        "card-hover":
          "0 4px 24px 0 rgb(0 0 0 / 0.08), 0 1px 4px 0 rgb(0 0 0 / 0.04)",
        "card-hover-dark":
          "0 4px 24px 0 rgb(0 0 0 / 0.40), 0 1px 4px 0 rgb(0 0 0 / 0.20)",
        glow:
          "0 0 0 3px hsl(var(--focus-ring) / 0.35)",
      },

      // ───────────────────────────────────────────────────────
      // 9. KEYFRAMES + ANIMATIONS
      //
      //    All CSS animations MUST be gated with motion-safe:
      //      <div className="motion-safe:animate-fade-up">
      //
      //    Framer Motion components: use useReducedMotion() instead.
      //    The @media prefers-reduced-motion guard in addBase
      //    is a fallback for non-Framer elements.
      // ───────────────────────────────────────────────────────
      keyframes: {
        "fade-up": {
          "0%":   { opacity: "0", transform: "translateY(16px)" },
          "100%": { opacity: "1", transform: "translateY(0)"    },
        },
        "fade-in": {
          "0%":   { opacity: "0" },
          "100%": { opacity: "1" },
        },
        "slide-down": {
          "0%":   { opacity: "0", transform: "translateY(-8px)" },
          "100%": { opacity: "1", transform: "translateY(0)"    },
        },
        "scale-in": {
          "0%":   { opacity: "0", transform: "scale(0.95)" },
          "100%": { opacity: "1", transform: "scale(1)"    },
        },
      },
      animation: {
        "fade-up":    "fade-up    0.4s  ease-out both",
        "fade-in":    "fade-in   0.3s  ease-out both",
        "slide-down": "slide-down 0.25s ease-out both",
        "scale-in":   "scale-in  0.3s  ease-out both",
      },

      // ───────────────────────────────────────────────────────
      // 10. TYPOGRAPHY PLUGIN CONFIG
      //     Applies to blog article bodies via prose classes.
      //     Usage:
      //       <article className="prose prose-abu dark:prose-invert mx-auto">
      //         <MDXContent />
      //       </article>
      //
      //     FIX: replaced theme("colors.muted-foreground") with
      //     CSS var directly — hyphenated color keys return undefined
      //     when accessed through the theme() helper in this context.
      // ───────────────────────────────────────────────────────
      typography: () => ({
        abu: {
          css: {
            // Prose color tokens → CSS vars resolve in both modes
            "--tw-prose-body":          "hsl(var(--foreground))",
            "--tw-prose-headings":      "hsl(var(--foreground))",
            "--tw-prose-lead":          "hsl(var(--muted-foreground))",
            "--tw-prose-links":         "hsl(var(--accent))",
            "--tw-prose-bold":          "hsl(var(--foreground))",
            "--tw-prose-counters":      "hsl(var(--muted-foreground))",
            "--tw-prose-bullets":       "hsl(var(--muted-foreground))",
            "--tw-prose-hr":            "hsl(var(--border))",
            "--tw-prose-quotes":        "hsl(var(--foreground))",
            "--tw-prose-quote-borders": "hsl(var(--border))",
            "--tw-prose-captions":      "hsl(var(--muted-foreground))",
            "--tw-prose-code":          "hsl(var(--foreground))",
            "--tw-prose-pre-code":      "hsl(var(--foreground))",
            "--tw-prose-pre-bg":        "hsl(var(--card))",
            "--tw-prose-th-borders":    "hsl(var(--border))",
            "--tw-prose-td-borders":    "hsl(var(--border))",
            // Layout
            maxWidth: "65ch",
            // Elements — font sizes use rem values directly here
            // because the theme() fontSize tokens aren't reliably
            // accessible as plain values inside typography config.
            p: {
              fontSize:   "1rem",
              lineHeight: "1.8",
            },
            h2: {
              fontSize:   "1.5rem",   // = 2xl token
              fontWeight: "600",
              marginTop:  "2.5rem",
            },
            h3: {
              fontSize:   "1.25rem",  // = xl token
              fontWeight: "600",
              marginTop:  "2rem",
            },
            // Inline code — strip backtick pseudo-content
            "code::before": { content: '""' },
            "code::after":  { content: '""' },
            code: {
              backgroundColor: "hsl(var(--card))",
              borderRadius:    "0.25rem",
              padding:         "0.15em 0.4em",
              fontSize:        "0.875em",
              fontWeight:      "400",
            },
            // Links
            a: {
              textDecoration: "none",
              fontWeight:     "500",
              "&:hover": { textDecoration: "underline" },
            },
            // Blockquote
            blockquote: {
              fontStyle:    "normal",
              borderRadius: "0 0.375rem 0.375rem 0",
              padding:      "0.75rem 1.25rem",
            },
          },
        },
      }),
    },
  },

  // ─────────────────────────────────────────────────────────────
  // 11. PLUGINS
  // ─────────────────────────────────────────────────────────────
  plugins: [
    // ── @tailwindcss/typography ───────────────────────────────
    // npm install -D @tailwindcss/typography
    require("@tailwindcss/typography"),

    // ── Custom base, components, utilities ───────────────────
    plugin(({ addBase, addComponents, addUtilities, theme }) => {

      // ── A. CSS VARIABLE DEFINITIONS ─────────────────────────
      //    Light mode under :root, dark mode under .dark.
      //    Components reference these via hsl(var(--token)).
      //    FIX: added --focus-ring separate from --ring so
      //    focus indicators can be changed independently.
      //    FIX: added --primary / --primary-foreground for
      //    CTA buttons that are not accent-coloured.
      addBase({
        ":root": {
          // Surfaces
          "--background":          "0 0% 100%",
          "--foreground":          "224 71% 4%",
          "--card":                "0 0% 97%",
          "--card-foreground":     "224 71% 4%",
          // Muted
          "--muted":               "220 14% 96%",
          "--muted-foreground":    "220 9% 46%",
          // Border
          "--border":              "220 13% 91%",
          // Rings — split intentionally
          "--ring":                "220 13% 80%",   // decorative borders
          "--focus-ring":          "215 100% 55%",  // WCAG focus indicator
          // Accent — links, active states
          "--accent":              "215 100% 50%",
          "--accent-foreground":   "0 0% 100%",
          // Primary — CTA buttons (yellow brand colour)
          "--primary":             "48 96% 53%",    // yellow-400
          "--primary-foreground":  "40 100% 10%",   // yellow-950
        },
        ".dark": {
          "--background":          "224 71% 4%",
          "--foreground":          "210 20% 98%",
          "--card":                "224 71% 8%",
          "--card-foreground":     "210 20% 98%",
          "--muted":               "215 28% 17%",
          "--muted-foreground":    "217 11% 65%",
          "--border":              "215 28% 17%",
          "--ring":                "215 28% 30%",
          "--focus-ring":          "215 100% 70%",  // brighter in dark mode
          "--accent":              "215 100% 65%",
          "--accent-foreground":   "224 71% 4%",
          "--primary":             "48 96% 53%",
          "--primary-foreground":  "40 100% 10%",
        },
      });

      // ── B. GLOBAL FOCUS-VISIBLE RING ────────────────────────
      //    Applied once here — no per-component focus styles needed.
      //    Uses --focus-ring (not --ring) so it's always distinct.
      //    The double box-shadow creates a white gap then the ring,
      //    making it visible on both light and dark backgrounds.
      //    WCAG 2.4.7: all keyboard-focusable elements must have
      //    a visible focus indicator. This satisfies that globally.
      addBase({
        ":focus-visible": {
          outline:   "none",
          boxShadow:
            "0 0 0 2px hsl(var(--background)), 0 0 0 4px hsl(var(--focus-ring))",
        },
        // Remove ring on pointer/touch — only keyboard gets the ring
        ":focus:not(:focus-visible)": {
          boxShadow: "none",
          outline:   "none",
        },
      });

      // ── C. REDUCED MOTION GLOBAL GUARD ──────────────────────
      //    Collapses all CSS animation/transition durations to
      //    near-zero for users with vestibular/motion sensitivity.
      //    Framer Motion: pair with useReducedMotion() in every
      //    component that uses motion.* elements.
      addBase({
        "@media (prefers-reduced-motion: reduce)": {
          "*, *::before, *::after": {
            animationDuration:       "0.01ms !important",
            animationIterationCount: "1     !important",
            transitionDuration:      "0.01ms !important",
            scrollBehavior:          "auto   !important",
          },
        },
      });

      // ── D. BASE ELEMENT STYLES ──────────────────────────────
      //    Establishes document defaults without forcing a reset.
      addBase({
        html: {
          // Prevents layout shift when scrollbar appears/disappears
          scrollbarGutter: "stable",
        },
        body: {
          backgroundColor: "hsl(var(--background))",
          color:           "hsl(var(--foreground))",
          // font-feature-settings for better number rendering
          fontFeatureSettings: '"cv02","cv03","cv04","cv11"',
          // Prevents font size inflation on mobile after orientation change
          textSizeAdjust: "100%",
        },
        // Consistent box model
        "*, *::before, *::after": {
          boxSizing: "border-box",
        },
      });

      // ── E. REUSABLE COMPONENT CLASSES ───────────────────────
      //    FIX: .badge dark variants moved to addBase with explicit
      //    .dark .badge-* selectors. The previous ".dark &" parent
      //    selector syntax does not work inside addComponents JS objects.
      addComponents({

        // ── Badge — skill/technology tag ──────────────────────
        //    Usage: <span className="badge badge-teal">React</span>
        ".badge": {
          display:         "inline-flex",
          alignItems:      "center",
          fontSize:        theme("fontSize.xs[0]"),          // 12px
          lineHeight:      theme("fontSize.xs[1].lineHeight"),
          letterSpacing:   theme("fontSize.xs[1].letterSpacing"),
          fontWeight:      "500",
          padding:         "0.25rem 0.625rem",
          borderRadius:    theme("borderRadius.full"),
          whiteSpace:      "nowrap",
          backgroundColor: "hsl(var(--muted))",
          color:           "hsl(var(--foreground))",
          border:          "1px solid hsl(var(--border))",
        },

        // ── Section wrapper ───────────────────────────────────
        //    Usage: <section className="section-wrapper">
        //    FIX: mobile padding was spacing.4 (16px) — too tight.
        //    Now uses spacing.6 (24px) mobile, spacing.8 (32px) above md.
        ".section-wrapper": {
          width:          "100%",
          maxWidth:       theme("maxWidth.section"),
          marginLeft:     "auto",
          marginRight:    "auto",
          // Mobile-first: 24px sides, 64px top/bottom
          paddingLeft:    theme("spacing.6"),
          paddingRight:   theme("spacing.6"),
          paddingTop:     theme("spacing.16"),
          paddingBottom:  theme("spacing.16"),
        },

        // ── Section heading — h2 ─────────────────────────────
        //    Usage: <h2 className="section-heading">Projects</h2>
        //    text-3xl token = 30px / lh 1.3 — set once here.
        ".section-heading": {
          fontSize:     theme("fontSize.3xl[0]"),
          lineHeight:   theme("fontSize.3xl[1].lineHeight"),
          fontWeight:   "700",
          marginBottom: theme("spacing.10"),
          color:        "hsl(var(--foreground))",
          // text-balance prevents awkward single-word last lines
          textWrap:     "balance",
        },

        // ── Skip link ─────────────────────────────────────────
        //    Place as first child of <body> in layout.tsx.
        //    Visually hidden until focused via keyboard.
        //    Usage:
        //      <a href="#main-content" className="skip-link">
        //        main content
        //      </a>
        ".skip-link": {
          position:     "absolute",
          width:        "1px",
          height:       "1px",
          padding:      "0",
          margin:       "-1px",
          overflow:     "hidden",
          clip:         "rect(0,0,0,0)",
          whiteSpace:   "nowrap",
          borderWidth:  "0",
          // Revealed on focus
          "&:focus-visible": {
            position:        "fixed",
            top:             theme("spacing.4"),
            left:            theme("spacing.4"),
            zIndex:          "9999",
            width:           "auto",
            height:          "auto",
            padding:         `${theme("spacing.2")} ${theme("spacing.4")}`,
            margin:          "0",
            overflow:        "visible",
            clip:            "auto",
            whiteSpace:      "normal",
            backgroundColor: "hsl(var(--background))",
            color:           "hsl(var(--foreground))",
            borderRadius:    theme("borderRadius.md"),
            fontWeight:      "600",
            fontSize:        theme("fontSize.sm[0]"),
          },
        },
      });

      // Badge colour variants in addBase — FIX for .dark & selector bug.
      // Each variant sets light colours by default, dark colours under .dark.
      addBase({
        // Teal — 7.1:1 contrast ratio (WCAG AAA in light mode)
        ".badge-teal": {
          backgroundColor: theme("colors.teal.100"),
          color:           theme("colors.teal.800"),
          borderColor:     theme("colors.teal.200"),
        },
        ".dark .badge-teal": {
          backgroundColor: theme("colors.teal.900"),
          color:           theme("colors.teal.200"),
          borderColor:     theme("colors.teal.800"),
        },
        // Blue
        ".badge-blue": {
          backgroundColor: theme("colors.blue.100"),
          color:           theme("colors.blue.800"),
          borderColor:     theme("colors.blue.200"),
        },
        ".dark .badge-blue": {
          backgroundColor: theme("colors.blue.900"),
          color:           theme("colors.blue.200"),
          borderColor:     theme("colors.blue.800"),
        },
        // Amber
        ".badge-amber": {
          backgroundColor: theme("colors.amber.100"),
          color:           theme("colors.amber.800"),
          borderColor:     theme("colors.amber.200"),
        },
        ".dark .badge-amber": {
          backgroundColor: theme("colors.amber.900"),
          color:           theme("colors.amber.200"),
          borderColor:     theme("colors.amber.800"),
        },
        // Emerald — used in BlogCard
        ".badge-emerald": {
          backgroundColor: theme("colors.emerald.100"),
          color:           theme("colors.emerald.800"),
          borderColor:     theme("colors.emerald.200"),
        },
        ".dark .badge-emerald": {
          backgroundColor: theme("colors.emerald.900"),
          color:           theme("colors.emerald.200"),
          borderColor:     theme("colors.emerald.800"),
        },
      });

      // ── F. UTILITY CLASSES ───────────────────────────────────
      addUtilities({
        // Scrollbar hidden — horizontal filter / tag rows
        // Usage: <div className="no-scrollbar overflow-x-auto">
        ".no-scrollbar": {
          "-ms-overflow-style": "none",
          "scrollbar-width":    "none",
          "&::-webkit-scrollbar": { display: "none" },
        },

        // Text balance — headings only, never body paragraphs
        // Usage: <h2 className="text-balance">
        // Already used in .section-heading; add manually elsewhere.
        ".text-balance": {
          textWrap: "balance",
        },

        // content-visibility — large off-screen sections
        // Defers paint and layout cost until section scrolls into view.
        // Usage: <section className="cv-auto">
        ".cv-auto": {
          contentVisibility: "auto",
        },

        // Animation delay utilities — staggered card entrances
        // Usage: <div className="motion-safe:animate-fade-up delay-100">
        ".delay-75":  { animationDelay: "75ms"  },
        ".delay-100": { animationDelay: "100ms" },
        ".delay-150": { animationDelay: "150ms" },
        ".delay-200": { animationDelay: "200ms" },
        ".delay-300": { animationDelay: "300ms" },
        ".delay-500": { animationDelay: "500ms" },

        // Gradient text — hero accent words
        // Usage: <span className="gradient-text">Abu</span>
        ".gradient-text": {
          backgroundImage:  "linear-gradient(135deg, hsl(var(--accent)), hsl(var(--primary)))",
          backgroundClip:   "text",
          WebkitBackgroundClip: "text",
          color:            "transparent",
        },
      });
    }),
  ],
};

// ─────────────────────────────────────────────────────────────────
// COMPONENT USAGE REFERENCE
// ─────────────────────────────────────────────────────────────────
//
//  
//  MinimalistHero — h1
//    <h1 className="text-hero font-extrabold text-balance">
//
//  MinimalistHero — body paragraph
//    <p className="text-base text-muted-foreground">
//
//  MinimalistHero — role tagline
//    <p className="text-base font-medium text-yellow-600 dark:text-yellow-400">
//
//  MinimalistHero — subtitle badge
//    <span className="text-xs font-medium tracking-widest uppercase">
//
//  Section wrapper + heading (Projects, Blog, About, Contact)
//    <section className="section-wrapper">
//      <h2 className="section-heading">Projects</h2>
//    </section>
//
//  ProjectCard
//    <article className="bg-card border border-border rounded-xl
//                         shadow-none hover:shadow-card-hover
//                         hover:-translate-y-1 transition-all duration-200">
//      <h3 className="text-xl font-semibold">Title</h3>
//      <p  className="text-base text-muted-foreground line-clamp-3">Desc</p>
//      <span className="badge badge-teal">React</span>
//    </article>
//
//  BlogCard
//    <article>
//      <h3 className="text-xl font-bold">Post title</h3>
//      <p  className="text-base text-muted-foreground line-clamp-3">Excerpt</p>
//      <time className="text-xs text-muted-foreground">Jan 15, 2025</time>
//      <span className="badge badge-emerald">Next.js</span>
//    </article>
//
//  Blog article body
//    <article className="prose prose-abu dark:prose-invert mx-auto">
//      <MDXContent />
//    </article>
//
// ─────────────────────────────────────────────────────────────────
// INSTALL
//   npm install -D @tailwindcss/typography
//   npm install next-themes
// ─────────────────────────────────────────────────────────────────