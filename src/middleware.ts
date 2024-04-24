// import { redirect } from "next/navigation";
import { NextFetchEvent, NextRequest, NextResponse } from "next/server";

// If user tries to go on any page by chaning the url, it will help to redirect on login page if not logged in.

// Middleware runs with every request, here we will protect the routes
export async function middleware(request: NextRequest, event: NextFetchEvent) {
  const token = request.cookies.get("token")?.value;

  const response = await fetch(
    `http://localhost:3001/api/auth/is_token_valid?token=${token}`
  );

  const data = await response.json();
  console.log(data);

  // if success is false refirect to homepage again
  if (!data?.Success) {
    return NextResponse.redirect(new URL("http://localhost:3000", request.url));
  }

  // If token is valid continue
  return NextResponse.next();
}

export const config = {
  matcher: ["/profile"],
};
