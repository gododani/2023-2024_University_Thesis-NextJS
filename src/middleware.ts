import { NextRequest, NextResponse } from "next/server";
import { withAuth } from "next-auth/middleware";
import createIntlMiddleware from "next-intl/middleware";
import { localePrefix, locales } from "./navigation";

// Pages that are public and don't need authentication
const publicPages = [
  "/",
  "/products",
  "/repair",
  "/rent",
  "/signin",
  "/signup",
  "/forget-password",
  "/reset-password:token",
  "/details/.*"
];

// Pages that are protected and only authenticated admin users can access them
const adminPages = ["/add-vehicle", "/modify-vehicle/.*"];

// Create the internationalization middleware
const intlMiddleware = createIntlMiddleware({
  locales: locales,
  localePrefix: localePrefix,
  defaultLocale: locales[0], // hu
});

// Create the admin middleware
const adminMiddleware = withAuth((req) => intlMiddleware(req), {
  callbacks: {
    authorized: ({ token }) => token != null && token.role === "ADMIN",
  },
  pages: {
    signIn: "/",
  },
});

export default async function middleware(req: NextRequest) {
  const publicPathnameRegex = RegExp(
    `^(/(${locales.join("|")}))?(${publicPages.join("|")})?/?$`,
    "i"
  );

  const adminPathnameRegex = RegExp(
    `^(/(${locales.join("|")}))?(${adminPages.join("|")})?/?$`,
    "i"
  );

  // Check if it's a reset password link
  const isResetPasswordLink = /\/reset-password\//i;

  if (
    isResetPasswordLink.test(req.nextUrl.pathname) ||
    publicPathnameRegex.test(req.nextUrl.pathname)
  ) {
    return intlMiddleware(req);
  } else if (adminPathnameRegex.test(req.nextUrl.pathname)) {
    return (adminMiddleware as any)(req);
  } else {
    return NextResponse.next();
  }
}

export const config = {
  // Skip all paths that should not be internationalized
  matcher: ["/((?!api|_next|.*\\..*).*)"],
};
