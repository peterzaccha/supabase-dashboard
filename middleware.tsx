import { createServerClient, type CookieOptions } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";
import { env } from "./lib/env.server";

export async function middleware(request: NextRequest) {
  assert_origin: {
    const origin = new URL(
      request.headers.get("referer") ?? env.NEXT_PUBLIC_ORIGIN
    ).origin;
    if (origin !== env.NEXT_PUBLIC_ORIGIN) {
      throw new Error(
        `You are trying to access the application from ${origin}, but the origin defined in the NEXT_PUBLIC_ORIGIN environment variable is ${env.NEXT_PUBLIC_ORIGIN}.\nYou must access the application from ${env.NEXT_PUBLIC_ORIGIN}, because some integrations will not work otherwise.`
      );
    }
  }

  let response = NextResponse.next({
    request: {
      headers: request.headers,
    },
  });

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          return request.cookies.get(name)?.value;
        },
        set(name: string, value: string, options: CookieOptions) {
          request.cookies.set({
            name,
            value,
            ...options,
          });
          response = NextResponse.next({
            request: {
              headers: request.headers,
            },
          });
          response.cookies.set({
            name,
            value,
            ...options,
          });
        },
        remove(name: string, options: CookieOptions) {
          request.cookies.set({
            name,
            value: "",
            ...options,
          });
          response = NextResponse.next({
            request: {
              headers: request.headers,
            },
          });
          response.cookies.set({
            name,
            value: "",
            ...options,
          });
        },
      },
    }
  );

  await supabase.auth.getSession();

  const {
    data: { user },
  } = await supabase.auth.getUser();
  console.log(user);

  // if user is signed in and the current path is / redirect the user to /account
  if (user && request.nextUrl.pathname === "/admin/public/login") {
    console.log("redirect");
    return NextResponse.redirect(
      new URL("/admin/internal/dashboard", request.url)
    );
  }

  // if user is not signed in and the current path is not / redirect the user to /
  if (!user && request.nextUrl.pathname === "/admin/internal/dashboard") {
    return NextResponse.redirect(new URL("/admin/public/login", request.url));
  }

  return response;
}

export const config = {
  matcher: ["/admin/internal/dashboard", "/admin/public/login"],
};
