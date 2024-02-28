export const dynamic = "force-dynamic";

import { createConnection } from "@/lib/db";
import { Connection, RowDataPacket } from "mysql2/promise";

export async function GET() {
  let connection: Connection | null = null;
  try {
    // Connect to the database
    connection = await createConnection();

    // Get all vehicles and their associated images from the database
    const [rows] = await connection.query(`
      SELECT Vehicle.*, Image.data as imageData
      FROM Vehicle
      LEFT JOIN Image ON Vehicle.id = Image.vehicleId
    `);

    // Convert image data to a format that can be sent in the response
    const vehicles = (rows as RowDataPacket[]).map((row: any) => {
      // Convert the image data to a base64 string
      const imageData = row.imageData ? row.imageData.toString("base64") : null;

      return {
        ...row,
        imageData,
      };
    });

    // Return the vehicles
    return new Response(JSON.stringify(vehicles), {
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
