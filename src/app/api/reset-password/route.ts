import { createConnection } from "@/lib/db";
import { RowDataPacket } from "mysql2";
import { hash } from "bcrypt";

export async function POST(req: Request, res: Response) {
  const { email, password, confirmPassword } = await req.json();

  // Check if the email, password and confirm password are provided
  console.log(email, password, confirmPassword);

  const dbConnection = await createConnection();

  try {
    // Check if the email exists
    const [rows] = await dbConnection.execute<RowDataPacket[]>(
      "SELECT * FROM User WHERE email = ?",
      [email]
    );

    if (rows.length === 0) {
      return new Response("Email not found", { status: 404 });
    }

    // Check if the password and confirm password match
    if (password !== confirmPassword) {
      return new Response("Passwords do not match", { status: 400 });
    }

    // Hash the password
    const hashedPassword = await hash(password, 10);

    // Update the password in the database and delete the token and token expiry
    await dbConnection.execute(
      "UPDATE User SET password = ?, PasswordResetToken = NULL, PasswordResetExpires = NULL WHERE email = ?",
      [hashedPassword, email]
    );

    return new Response("Password updated", { status: 200 });
  } catch (error: any) {
    return new Response(error.message, { status: 500 });
  } finally {
    await dbConnection.end();
  }
}
