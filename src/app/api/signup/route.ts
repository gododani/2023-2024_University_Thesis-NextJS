import { createConnection } from "@/lib/db";
import { User } from "../../../../types/User";
import { RowDataPacket } from "mysql2";
import { hash } from "bcrypt";
import { Connection } from "mysql2/promise";

export async function POST(req: Request, res: Response) {
  const {
    firstName,
    lastName,
    username,
    email,
    password,
    confirmPassword,
    phoneNumber,
  } = await req.json();

  // Check if the passwords match
  if (password !== confirmPassword) {
    return new Response("Error: Passwords must be the same", {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
  let connection: Connection | null = null;
  try {
    // Connect to the database
    connection = await createConnection();

    // Check if the user already exists
    const [result] = await connection.execute(
      "SELECT * FROM `User` WHERE `Email` = ?",
      [email]
    );

    // If the user already exists, return a 501 Internal Server Error response
    if ((result as RowDataPacket).length > 0) {
      return new Response("Error: User already exists", {
        status: 501,
        headers: { "Content-Type": "application/json" },
      });
    }

    // Hash the password
    const hashedPassword = await hash(password, 10);

    // Create a new user object from the request body
    const user: User = {
      firstName,
      lastName,
      username,
      email,
      password: hashedPassword,
      role: "USER",
      phoneNumber,
    };

    // Insert the user object into the database
    await connection.execute(
      "INSERT INTO `User` (`firstName`, `lastName`, `email`, `password`, `username`," +
        "`role`, `phoneNumber`) VALUES (?, ?, ?, ?, ?, ?, ?)",
      [
        user.firstName,
        user.lastName,
        user.email,
        user.password,
        user.username,
        user.role,
        user.phoneNumber,
      ]
    );

    // Return a 200 OK response
    return new Response("User created successfully", {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    // If something went wrong, return a 500 Internal Server Error response
    return new Response("Error creating user", {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  } finally {
    // Close the connection
    await connection?.end();
  }
}
