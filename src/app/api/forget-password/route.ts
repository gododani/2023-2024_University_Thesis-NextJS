import { createConnection } from "@/lib/db";
import { RowDataPacket } from "mysql2";
import crypto from "crypto";
import sgMail from "@sendgrid/mail";

export async function POST(req: Request, res: Response) {
  const { email, translations } = await req.json();

  const dbConnection = await createConnection();
  try {
    // Check if the user exists
    const [rows] = await dbConnection.execute(
      "SELECT * FROM `User` WHERE `Email` = ?",
      [email.email]
    );
    const result = rows as RowDataPacket[];
    if (result.length === 0) {
      return new Response("Error: User does not exists", {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }

    // Generate a reset token
    const resetToken = crypto.randomBytes(32).toString("hex");

    // Hash the reset token
    const passwordResetToken = crypto
      .createHash("sha256")
      .update(resetToken)
      .digest("hex");

    // Set the password reset token expiry date
    const passwordResetExpires = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes

    // Create and set the password reset token and expiry date in the database
    await dbConnection.execute(
      "UPDATE `User` SET `PasswordResetToken` = ?, `PasswordResetExpires` = ? WHERE `Email` = ?",
      [passwordResetToken, passwordResetExpires, email.email]
    );

    // Create the reset URL
    const resetUrl = `${process.env.BASE_URL}/reset-password/${resetToken}`;

    // Set the email options
    const msg = {
      from: "gododani12@gmail.com",
      personalizations: [
        {
          to: [
            {
              email: email.email,
            },
          ],
          dynamic_template_data: {
            subject: translations.subject,
            text1: translations.text1,
            text2: translations.text2,
            text3: translations.text3,
            buttonText: translations.buttonText,
            resetUrl: resetUrl,
          },
        },
      ],
      template_id: "d-1c57d62da2ff4e94a2c04032682bb747",
    } as unknown as any;

    // Set the SendGrid API key
    sgMail.setApiKey(process.env.SENDGRID_API_KEY || "");

    // Send the email to the user
    await sgMail.send(msg);

    return new Response("Email successfully sent", {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    // Delete the password reset token and expiry date from the database if the email fails to send
    await dbConnection.execute(
      "UPDATE `User` SET `PasswordResetToken` = NULL, `PasswordResetExpires` = NULL WHERE `Email` = ?",
      [email.email]
    );
    return new Response("Error while sending email: " + error, {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  } finally {
    dbConnection.end();
  }
}
