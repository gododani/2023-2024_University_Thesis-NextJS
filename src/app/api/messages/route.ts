import { createConnection } from "@/lib/db";
import { Connection } from "mysql2/promise";

export async function GET(req: Request) {
    let connection: Connection | null = null;
  
    try {
      // Connect to the database
      connection = await createConnection();
  
      // Fetch all messages from the database
      const [rows] = await connection.query(
        "SELECT content, username, timeStamp FROM Message ORDER BY timeStamp ASC"
      );
  
      // Return the messages as a JSON response
      return new Response(JSON.stringify(rows), { status: 200, headers: { 'Content-Type': 'application/json' } });
    } catch (error) {
      // Return a 500 response if an error occurred
      return new Response("An error occurred: " + error, { status: 500 });
    } finally {
      await connection?.end();
    }
  }

export async function POST(req: Request) {
  let connection: Connection | null = null;

  try {
    // Connect to the database
    connection = await createConnection();

    // Get the message, user ID, and timestamp from the body
    const { message, username, timeStamp } = await req.json();

    console.log("message",message)
    console.log("userId",username)
    console.log("timeStamp",timeStamp)
    // Insert the message into the database
    await connection.query(
      "INSERT INTO Message (content, username, timeStamp) VALUES (?, ?, ?)",
      [message, username, new Date(timeStamp)]
    );

    // Return a 200 response
    return new Response("Message sent successfully", { status: 200 });
  } catch (error) {
    // Return a 500 response if an error occurred
    return new Response("An error occurred: " + error, { status: 500 });
  } finally {
    await connection?.end();
  }
}
