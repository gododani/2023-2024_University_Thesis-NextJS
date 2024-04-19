import { createConnection } from "@/lib/db";
import { Connection, RowDataPacket } from "mysql2/promise";
import crypto from "crypto";

export async function POST(req: Request, res: Response) {
  const { token } = await req.json();

  let connection: Connection | null = null;
  try {
    // Connect to the database
    connection = await createConnection();

    // Hash the token
    const hasedToken = crypto.createHash("sha256").update(token).digest("hex");

    // Get the current date
    const now = new Date(Date.now());

    // Check if the user exists
    const [rows] = await connection.execute(
      "SELECT * FROM `User` WHERE `PasswordResetToken` = ? AND `PasswordResetExpires` > ?",
      [hasedToken, now]
    );
    // If the user does not exist, return an error
    const result = rows as RowDataPacket[];
    if (result.length === 0) {
      return new Response("Error: User does not exists", {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }

    return new Response(JSON.stringify(result[0]), { status: 200 });
  } catch (error: any) {
    return new Response(error, { status: 500 });
  } finally {
    await connection?.end();
  }
}
