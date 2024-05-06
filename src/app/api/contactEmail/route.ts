import sgMail from "@sendgrid/mail";

export async function POST(req: Request, res: Response) {
  const { email, subject, message } = await req.json();
  try {
    const msg = {
      to: process.env.EMAIL!!,
      from: process.env.EMAIL!!,
      subject: subject,
      html: `
        <h1>Új üzeneted érkezett</h1><br>
        <p><strong>Email: </strong>${email}</p>
        <p><strong>Tárgy: </strong>${subject}</p>
        <p><strong>Üzenet: </strong>${message}</p>`
    };
    sgMail.setApiKey(process.env.SENDGRID_API_KEY!!);
    await sgMail.send(msg);
    return new Response("Email sent", { status: 200 });
  } catch (error) {
    return new Response("Error sending email", { status: 500 });
  }
}
