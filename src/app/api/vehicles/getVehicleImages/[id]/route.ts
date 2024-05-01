import { createConnection } from "@/lib/db";
import { Connection } from "mysql2/promise";

export async function GET(req: Request, res: Response) {
  let connection: Connection | null = null;

  try {
    // Connect to the database
    connection = await createConnection();

    // Get the vehicle ID from the request parameters
    const vehicleId = req.url.split("/").pop();

    // Get the images for the vehicle with the given ID
    const [rows] = await connection.query(
      `
      SELECT data
      FROM Image
      WHERE vehicleId = ?
    `,
      [vehicleId]
    );

    // Close the connection
    await connection.end();

    // Convert the image data to base64
    const images = (rows as any[]).map((row) => row.data.toString("base64"));

    // Send the images as a JSON response
    return new Response(JSON.stringify(images), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    // If something went wrong, return a 500 Internal Server Error response
    return new Response(JSON.stringify({ message: "Error getting images for the vehicle" }), {
        status: 500,
        headers: { "Content-Type": "application/json" },
      });
  } finally{
    // Close the connection
    await connection?.end();
  }
}
