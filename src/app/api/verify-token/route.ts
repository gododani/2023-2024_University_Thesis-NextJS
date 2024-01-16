import { createConnection } from "@/lib/db";
import { RowDataPacket } from "mysql2";
import crypto from "crypto";

export async function POST(req: Request, res: Response) {
  const { token } = await req.json();

  const dbConnection = await createConnection();

  try {
    const hasedToken = crypto.createHash("sha256").update(token).digest("hex");

    const now = new Date(Date.now());

    // Check if the user exists
    const [rows] = await dbConnection.execute(
      "SELECT * FROM `User` WHERE `PasswordResetToken` = ? AND `PasswordResetExpires` > ?",
      [hasedToken, now]
    );
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
    await dbConnection.end();
  }
}
