# Live blog view counts

The blog view counter uses Supabase Postgres. This portfolio currently opens posts
inside `/blog?post=<slug>`; opening a post calls the view API automatically.

## Setup

1. Create a Supabase project and open its SQL Editor.
2. Run [`blog-views.sql`](blog-views.sql). It creates the totals and unique
   per-browser event tables and initializes the totals to 698, 713, 734, and 754
   for `college`, `chennai`, `kosal`, and `teaching`. On a later rerun, existing
   totals are preserved.
   If you already ran an older version of the schema, run
   [`set-blog-view-baselines.sql`](set-blog-view-baselines.sql) once to set your
   supplied totals. Do not rerun that baseline script after live increments begin.
3. Copy `.env.example` to `.env.local` and fill in `SUPABASE_URL` and
   `SUPABASE_SECRET_KEY` from Supabase project settings. Keep the secret key
   server-only: do not prefix it with `NEXT_PUBLIC_` or expose it in client code.
4. Restart the Next.js development server. Set the same environment variables in
   your production host before deploying.

`app/api/blog-views/route.ts` handles count reads and increments. It accepts only
the four known post slugs and keeps Supabase credentials on the server.
`app/blog/page.tsx` sends one increment the first time each browser profile opens
each post. Supabase's `(slug, visitor_id)` primary key is the final duplicate guard
if the browser repeats a request. Clearing local storage or using another browser
profile creates a new visitor and can count again; this is anonymous analytics, not
identity verification or fraud prevention.
