import NextAuth from "next-auth/next";

declare module "next-auth" {
  interface Session {
    user: {
      User_ID: number;
      name: string;
      First_Name: string;
      Last_Name: string;
      Email: string;
      Type: string;
    };
  }
}
