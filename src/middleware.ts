import { NextRequest } from "next/server";
import { withAuth } from "next-auth/middleware";
import createIntlMiddleware from "next-intl/middleware";
import { localePrefix, locales } from "./navigation";

const publicPages = [
  "/",
  "/products",
  "/rent",
  "/signin",
  "/signup",
  "/forget-password",
  "/reset-password:token",
];

const intlMiddleware = createIntlMiddleware({
  locales: locales,
  localePrefix: localePrefix,
  defaultLocale: locales[0], // hu
});

const authMiddleware = withAuth((req) => intlMiddleware(req), {
  callbacks: {
    authorized: ({ token }) => token != null,
  },
  pages: {
    signIn: "/signin",
  },
});

export default async function middleware(req: NextRequest) {
  const publicPathnameRegex = RegExp(
    `^(/(${locales.join("|")}))?(${publicPages.join("|")})?/?$`,
    "i"
  );

  // Check if it's a reset password link
  const isResetPasswordLink = /\/reset-password\//i;

  if (
    isResetPasswordLink.test(req.nextUrl.pathname) ||
    publicPathnameRegex.test(req.nextUrl.pathname)
  ) {
    return intlMiddleware(req);
  } else {
    return (authMiddleware as any)(req);
  }
}

export const config = {
  // Skip all paths that should not be internationalized
  matcher: ["/((?!api|_next|.*\\..*).*)"],
};
