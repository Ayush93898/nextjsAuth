import { NextResponse, NextRequest } from "next/server";

// this fn can be marked as async if using await inside
// this is the logic part
export function middleware(request: NextRequest) {
  //    so we have public path i.e login and signup ,if somebody has token they should not be able to access those paths
  // and there are some protected path also , like someone who is not logged in cannot be see the profile page
  // now first we have to indentify the paths
  const path = request.nextUrl.pathname;
  //  lets see the public path
  const isPublicPath =
    path === "/login" || path === "/signup" || path === "/verifyemail";
  const token = request.cookies.get("token")?.value || "";

  // so if the path is public and u have a token. that means u should not visit the login and signup
  if (isPublicPath && token) {
    return NextResponse.redirect(new URL("/", request.nextUrl));
  }

  // so if url is not public and u dont have token also
  if (!isPublicPath && !token) {
    return NextResponse.redirect(new URL("/login", request.nextUrl));
  }
}

// see Matching pairs below to learn more
// this is the matching part, on what route u have to match and run middleware
export const config = {
  matcher: [
    "/", // exact homepage
    "/login", // exact login page
    "/signup",
    "/verifyemail", // exact signup page
    "/profile/:path*", // match /profile and any subpaths like /profile/edit
  ],
};
