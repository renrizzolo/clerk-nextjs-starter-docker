import { authMiddleware } from "@clerk/nextjs";
import { NextResponse } from "next/server";

export default authMiddleware({
  // Set the paths that don't require the user to be signed in
  // Sign in and sign up pages are already made public by Clerk
  publicRoutes: ["/", "/api/healthcheck"],

  beforeAuth: (req) => {
    console.log(req.nextUrl);
    const url = new URL(req.nextUrl.origin);
    console.log(url.host, url.origin, url.port);
    for (const [k, v] of req.headers.entries()) {
      console.log({ [k]: v });
    }
    // hack fix for clerk flagging as CO
    req.headers.set("x-forwarded-port", "");
    const res = NextResponse.next();
    return res;
  },
  debug: true,
});

export const config = { matcher: "/((?!_next/image|_next/static|favicon.ico|.*.svg).*)" };
