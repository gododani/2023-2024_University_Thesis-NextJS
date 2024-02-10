import { createConnection } from "@/lib/db";
import { Connection } from "mysql2/promise";

export async function GET() {
  let connection: Connection | null = null;
  try {
    // Connect to the database
    connection = await createConnection();

    // Get all vehicles from the database
    const [rows] = await connection.query("SELECT * FROM Vehicle");

    // Return the vehicles
    return new Response(JSON.stringify(rows), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    // If something went wrong, return a 500 Internal Server Error response
    return new Response("Error getting vehicles", {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  } finally {
    // Close the connection
    await connection?.end();
  }
}
