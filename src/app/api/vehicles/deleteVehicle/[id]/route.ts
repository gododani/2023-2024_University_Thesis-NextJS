import { createConnection } from "@/lib/db";
import { Connection, RowDataPacket } from "mysql2/promise";

export async function POST(req: Request) {
  let connection: Connection | null = null;

  try {
    // Connect to the database
    connection = await createConnection();

    // Get the vehicle ID from the request parameters
    const vehicleId = req.url.split("/").pop();

    // Delete the vehicle from the database
    const [result] = await connection.query(
      "DELETE FROM Vehicle WHERE id = ?",
      [vehicleId]
    );

    // Close the connection
    await connection.end();

    // If no rows were affected, return a 501 Internal Server Error response
    if ((result as RowDataPacket).affectedRows === 0) {
      return new Response("Error while deleting the vehicle", {
        status: 501,
        headers: { "Content-Type": "application/json" },
      });
    }

    // Return a 200 OK response
    return new Response("Vehicle deleted", {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    // If an error occurred, return a 500 Internal Server Error response
    return new Response("Error while deleting the vehicle", {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  } finally{

  }
}
