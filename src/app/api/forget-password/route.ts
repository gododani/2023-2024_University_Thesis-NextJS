import { createConnection } from "@/lib/db";
import { RowDataPacket } from "mysql2";
import crypto from "crypto";
import sgMail from "@sendgrid/mail";

export async function POST(req: Request, res: Response) {
  const { email } = await req.json();

  const locale = req.headers.get("accept-language")?.split(",")[0];

  console.log(locale);

  const dbConnection = await createConnection();
  try {
    // Check if the user exists
    const [rows] = await dbConnection.execute(
      "SELECT * FROM `User` WHERE `Email` = ?",
      [email]
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
      [passwordResetToken, passwordResetExpires, email]
    );

    // Create the reset URL
    const resetUrl = `${process.env.BASE_URL}/reset-password/${resetToken}`;

    // Set the email options
    const msg = {
      to: email,
      from: "gododani12@gmail.com",
      subject: "Forgot Password",
      text: `You are receiving this email because you (or someone else) has requested the reset the password for your account.\n\nPlease click on the following link, or paste this into your browser to complete the process:\n\n${resetUrl}\n\nIf you did not request this, please ignore this email and your password will remain unchanged.\n`,
    };

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
      [email]
    );
    return new Response("Error while sending email: " + error, {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  } finally {
    dbConnection.end();
  }
}
