import NextAuth from "next-auth/next";

declare module "next-auth" {
  interface Session {
    user: {
      id: number
      firstName: string;
      lastName: string;
      username: string;
      email: string;
      phoneNumber: string;
      role: "USER" | "ADMIN";
    };
  }
}
