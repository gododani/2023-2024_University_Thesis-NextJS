import { createConnection } from "@/lib/db";
import { User } from "../../../../types/User";
import { RowDataPacket } from "mysql2";
import { hash } from "bcrypt";

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

  // Check if the user already exists
  const dbConnection1 = await createConnection();
  const [rows] = await dbConnection1.execute(
    "SELECT * FROM `User` WHERE `Email` = ?",
    [email]
  );
  const result = rows as RowDataPacket[];
  await dbConnection1.end();
  if (result.length !== 0) {
    return new Response("Error: User already exists", {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }

  // Hash the password
  const hashedPassword = await hash(password, 10);

  // Create the user in the database
  const user: User = {
    firstName,
    lastName,
    username,
    email,
    password: hashedPassword,
    role: "USER",
    phoneNumber,
  };

  // Create a new connection for this request
  const dbConnection2 = await createConnection();
  try {
    // Insert the user into the database
    await dbConnection2.execute(
      "INSERT INTO `User` (`firstName`, `lastName`, `email`, `password`, `username`, `role`, `phoneNumber`) VALUES (?, ?, ?, ?, ?, ?, ?)",
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
    await dbConnection2.end();
  }
}
