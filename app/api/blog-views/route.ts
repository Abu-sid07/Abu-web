import { NextRequest, NextResponse } from "next/server"

export const dynamic = "force-dynamic"

const BLOG_SLUGS = new Set(["college", "chennai", "kosal", "teaching"])

function supabaseConfig() {
  const url = process.env.SUPABASE_URL
  const serviceKey = process.env.SUPABASE_SECRET_KEY || process.env.SUPABASE_SERVICE_ROLE_KEY
  if (!url || !serviceKey) throw new Error("Supabase environment variables are not configured")
  return { url: url.replace(/\/$/, ""), serviceKey }
}

function headers(serviceKey: string) {
  const result: Record<string, string> = {
    apikey: serviceKey,
    "Content-Type": "application/json",
  }
  // New Supabase sb_secret_* keys belong in apikey only. Legacy service_role
  // JWTs may also be used as a Bearer token.
  if (!serviceKey.startsWith("sb_")) result.Authorization = `Bearer ${serviceKey}`
  return result
}

async function ensureSupabaseOk(response: Response, operation: string) {
  if (response.ok) return
  const details = (await response.text()).slice(0, 1000)
  console.error(`${operation}: Supabase returned HTTP ${response.status}: ${details}`)
  throw new Error(`${operation}: Supabase HTTP ${response.status}: ${details}`)
}

export async function GET(request: NextRequest) {
  const slug = request.nextUrl.searchParams.get("slug")
  if (!slug || !BLOG_SLUGS.has(slug)) {
    return NextResponse.json({ error: "Unknown blog" }, { status: 400 })
  }

  try {
    const { url, serviceKey } = supabaseConfig()
    const response = await fetch(
      `${url}/rest/v1/blog_view_counts?slug=eq.${encodeURIComponent(slug)}&select=views`,
      { headers: headers(serviceKey), cache: "no-store" },
    )
    await ensureSupabaseOk(response, "Blog view count lookup")
    const rows = (await response.json()) as { views: number }[]
    return NextResponse.json({ views: rows[0]?.views ?? 0 })
  } catch (error) {
    console.error("Unable to load blog views", error)
    return NextResponse.json({
      error: "Unable to load views",
      ...(process.env.NODE_ENV === "development" && { details: error instanceof Error ? error.message : "Unknown error" }),
    }, { status: 503 })
  }
}

export async function POST(request: NextRequest) {
  let body: { slug?: unknown; visitorId?: unknown }
  try {
    body = await request.json()
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 })
  }

  const { slug, visitorId } = body
  if (typeof slug !== "string" || !BLOG_SLUGS.has(slug)) {
    return NextResponse.json({ error: "Unknown blog" }, { status: 400 })
  }
  if (typeof visitorId !== "string" || !/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(visitorId)) {
    return NextResponse.json({ error: "Invalid visitor ID" }, { status: 400 })
  }

  try {
    const { url, serviceKey } = supabaseConfig()
    const response = await fetch(`${url}/rest/v1/rpc/record_blog_view`, {
      method: "POST",
      headers: headers(serviceKey),
      body: JSON.stringify({ p_slug: slug, p_visitor_id: visitorId }),
      cache: "no-store",
    })
    await ensureSupabaseOk(response, "Blog view increment")
    const views = (await response.json()) as number
    return NextResponse.json({ views })
  } catch (error) {
    console.error("Unable to record blog view", error)
    return NextResponse.json({
      error: "Unable to record view",
      ...(process.env.NODE_ENV === "development" && { details: error instanceof Error ? error.message : "Unknown error" }),
    }, { status: 503 })
  }
}
