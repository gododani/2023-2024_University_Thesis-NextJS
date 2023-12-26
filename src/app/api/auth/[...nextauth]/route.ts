// import { prisma } from "@/lib/prisma";
// import { User } from "@prisma/client";
import { NextAuthOptions } from "next-auth";
import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";
//import { compare } from "bcrypt";

export const authOptions: NextAuthOptions = {
  session: {
    strategy: "jwt",
    maxAge: 1 * 60 * 60, // 1 hour
  },
  providers: [
    CredentialsProvider({
      name: "Sign in",
      credentials: {},
      async authorize(credentials) {
        const { email, password } = credentials as {
          email: string;
          password: string;
        };
        if (!email || !password) {
          return null;
        }

        const user = {
          User_ID: 1,
          User_Name: "Vertox",
          First_Name: "Godó",
          Last_Name: "Dániel",
          Email: "gododani12@gmail.com",
        };
        // Check if the provided email and password match the hardcoded user
        if (email === user.Email && password === "asd123") {
          return {
            id: user.User_ID + "",
            User_ID: user.User_ID + "",
            name: user.User_Name,
            First_Name: user.First_Name,
            Last_Name: user.Last_Name,
            email: user.Email,
          };
        } else {
          return null;
        }
      },
    }),
  ],
  callbacks: {
    /* Addig id, firstname, lastname and phone number to the token when the user logged in */
    jwt: ({ token, user }) => {
      const u = user as unknown as any;
      if (user) {
        return {
          ...token,
          id: u.User_ID,
          User_ID: u.User_ID,
          First_Name: u.First_Name,
          Last_Name: u.Last_Name,
        };
      }
      return token;
    },

    /* Adding id, firstname, lastname and phone number to the session from the token */
    session: ({ session, token }) => {
      return {
        ...session,
        user: {
          ...session.user,
          id: token.id,
          name: token.name,
          email: token.email,
          User_ID: token.User_ID,
          First_Name: token.First_Name,
          Last_Name: token.Last_Name,
        },
      };
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: "../../signin",
  },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
