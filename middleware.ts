import { NextResponse, type NextRequest } from "next/server";
import { createServerClient } from "@supabase/ssr";

const securityHeaders: Record<string, string> = {
  "Permissions-Policy":
    "camera=(), microphone=(), geolocation=(), browsing-topics=(), payment=(), usb=(), display-capture=(), accelerometer=(), gyroscope=(), magnetometer=(), midi=(), picture-in-picture=(), publickey-credentials-get=(), screen-wake-lock=()",
  "X-DNS-Prefetch-Control": "on",
  "Strict-Transport-Security": "max-age=63072000; includeSubDomains; preload",
  "X-Frame-Options": "SAMEORIGIN",
  "X-Content-Type-Options": "nosniff",
  "Referrer-Policy": "origin-when-cross-origin",
};

function applySecurityHeaders(res: NextResponse) {
  Object.entries(securityHeaders).forEach(([key, value]) => {
    res.headers.set(key, value);
  });
  return res;
}

/**
 * Refreshes the Supabase auth session cookie on every request that isn't a
 * static asset. Nothing in this app uses Supabase Auth yet — every current
 * page only performs anonymous inserts — but this is the documented
 * @supabase/ssr pattern, and skipping it now means auth (e.g. an organizer
 * dashboard login) would silently break on expired cookies later.
 */
export async function middleware(request: NextRequest) {
  let response = NextResponse.next({ request });

  applySecurityHeaders(response);

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  // No credentials configured yet — skip rather than throw, so the app
  // still runs before a Supabase project is linked.
  if (!supabaseUrl || !supabaseAnonKey) {
    return response;
  }

  const supabase = createServerClient(supabaseUrl, supabaseAnonKey, {
    cookies: {
      getAll() {
        return request.cookies.getAll();
      },
      setAll(cookiesToSet) {
        cookiesToSet.forEach(({ name, value }) => request.cookies.set(name, value));
        response = NextResponse.next({ request });
        applySecurityHeaders(response);
        cookiesToSet.forEach(({ name, value, options }) =>
          response.cookies.set(name, value, options),
        );
      },
    },
  });

  // Touches the session so an expiring cookie gets refreshed before it
  // reaches a Server Component.
  await supabase.auth.getUser();

  return response;
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|icon|apple-icon|opengraph-image|twitter-image|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
