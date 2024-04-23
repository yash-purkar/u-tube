// import { redirect } from "next/navigation";
import { NextFetchEvent, NextRequest, NextResponse } from "next/server";

// If user tries to go on any page by chaning the url, it will help to redirect on login page if not logged in.

// Middleware runs with every request, here we will protect the routes
export async function middleware(request: NextRequest, event: NextFetchEvent) {
  const token = request.cookies.get("token")?.value;
  console.log(process.env.MONGODB_URI);
  event.waitUntil(
    fetch(`http://localhost:3001/api/auth/is_token_valid?token=${token}`)
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        console.log(data);
        if (!data.Success) {
          console.log("Heyy");
          return NextResponse.redirect(new URL("/login", request.url));
        }
      })
      .catch((err) => console.log("error", err))
  );
}

export const config = {
  matcher: ["/profile"],
};
