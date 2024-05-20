// import { redirect } from "next/navigation";
import { NextFetchEvent, NextRequest, NextResponse } from "next/server";

// If user tries to go on any page by chaning the url, it will help to redirect on login page if not logged in.

// Middleware runs with every request, here we will protect the routes
export async function middleware(request: NextRequest, event: NextFetchEvent) {
  const token = request.cookies.get("token")?.value;

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_LOCAL_API_URL}auth/is_token_valid?token=${token}`
  );

  const data = await response.json();

  // If user is logged in and tries to go on login or register page, it will redirect to home page
  if (data?.Success) {
    if (request.url?.includes("/login") || request.url?.includes("/register")) {
      return NextResponse.redirect(
        new URL("http://localhost:3000", request.url)
      );
    }
  }

  // if success is false refirect to homepage again
  if (
    !data?.Success &&
    (request.url?.includes("/profile") ||
      request.url?.includes("/liked_videos") ||
      request.url?.includes("/watch_later") ||
      request.url?.includes("/history") ||
      request.url?.includes("/watch"))
  ) {
    return NextResponse.redirect(new URL("http://localhost:3000", request.url));
  }

  // If token is valid continue
  return NextResponse.next();
}

export const config = {
  matcher: [
    "/profile",
    "/login",
    "/register",
    "/liked_videos",
    "/watch_later",
    "/history",
    "/playlists",
  ],
};
