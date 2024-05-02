export const dynamic = "force-dynamic";

import { createConnection } from "@/lib/db";
import { Connection, RowDataPacket } from "mysql2/promise";

export async function GET() {
  let connection: Connection | null = null;
  try {
    // Connect to the database
    connection = await createConnection();

    // Get all vehicles from the database
    const [vehicleRows] = await connection.query("SELECT * FROM Vehicle");

    // For each vehicle, get its associated images
    const vehicles = await Promise.all(
      (vehicleRows as RowDataPacket[]).map(async (vehicleRow: any) => {
        const [imageRows] = await connection?.query(
          "SELECT data FROM Image WHERE vehicleId = ?",
          [vehicleRow.id]
        ) ?? [[]];

        // Convert the image data to base64 strings
        const images = (imageRows as RowDataPacket[]).map((imageRow: any) =>
          imageRow.data.toString("base64")
        );

        return {
          ...vehicleRow,
          images,
        };
      })
    );

    // Close the connection
    await connection.end();

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
