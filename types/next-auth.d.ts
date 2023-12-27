import NextAuth from "next-auth/next";

declare module "next-auth" {
  interface Session {
    user: {
      name: string;
      firstName: string;
      lastName: string;
      phoneNumber: string;
      Email: string;
      Type: string;
    };
  }
}
