import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { createConnection } from "@/lib/db";
import { RowDataPacket } from "mysql2";
import { compare } from "bcrypt";

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
  
          // Check if the email and password are present
          if (!email || !password) {
            return null;
          }
  
          // Create a new connection for this request
          const dbConnection = await createConnection();
  
          try {
            // Get the user with the given email
            const [rows] = await dbConnection.execute(
              "SELECT * FROM `User` WHERE `Email` = ?",
              [email]
            );

            // Close the connection
            await dbConnection.end();
            
            // Assert that rows is an array
            const result = rows as RowDataPacket[];
  
            // If no user was found, return null
            if (result.length === 0) {
              return null;
            }
  
            // Get the first row
            const user = result[0];
  
            // Compare the password
            const match = await compare(password, user.password);
  
            // If the password doesn't match, return null
            if (!match) {
              return null;
            }
  
            // Return the user
            return {
              id: user.id + "",
              username: user.username,
              firstName: user.firstName,
              lastName: user.lastName,
              email: user.email,
              phoneNumber: user.phoneNumber,
              role: user.role,
            };
          } catch (e) {
            // Return null if an error occurred
            return null;
          } finally {
            // Close the connection
            await dbConnection.end();
          }
        },
      }),
    ],
    callbacks: {
      /* Adding id, firstname, lastname, username, email, phone number and role to the token from the user */
      jwt: ({ token, user }: any) => {
        if (user) {
          return {
            ...token,
            id: user.id,
            firstName: user.firstName,
            lastName: user.lastName,
            username: user.username,
            email: user.email,
            phoneNumber: user.phoneNumber,
            role: user.role,
          };
        }
        return token;
      },
  
      /* Adding id, firstname, lastname, username, email, phone number and role to the session from the token */
      session: ({ session, token }) => {
        return {
          ...session,
          user: {
            ...session.user,
            id: token.id,
            firstName: token.firstName,
            lastName: token.lastName,
            username: token.username,
            email: token.email,
            phoneNumber: token.phoneNumber,
            role: token.role,
          },
        };
      },
    },
    secret: process.env.NEXTAUTH_SECRET,
    pages: {
      signIn: "../../signin",
    },
  };