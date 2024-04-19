import { AuthOptions } from "next-auth";
import NextAuth from "next-auth/next";

import { authOptions } from "@/lib/authOptions";

const handler = NextAuth(authOptions as AuthOptions);
export { handler as GET, handler as POST };
