export const dynamic = "force-dynamic";

import { createConnection } from "@/lib/db";
import { Connection, RowDataPacket } from "mysql2/promise";

export async function GET(req: Request, res: Response) {
  let connection: Connection | null = null;
  try {
    // Connect to the database
    connection = await createConnection();

    // Get the vehicle ID from the request parameters
    const vehicleId = req.url.split("/").pop();

    // Get the vehicle and its associated image from the database
    const [rows] = await connection.query(
      `
      SELECT Vehicle.*, Image.data as imageData
      FROM Vehicle
      LEFT JOIN Image ON Vehicle.id = Image.vehicleId
      WHERE Vehicle.id = ?
    `,
      [vehicleId]
    );

    // Convert image data to a format that can be sent in the response
    const vehicle = (rows as RowDataPacket[]).map((row: any) => {
      // Convert the image data to a base64 string
      const imageData = row.imageData ? row.imageData.toString("base64") : null;

      return {
        ...row,
        imageData,
      };
    });

    console.log(vehicle);

    // Return the vehicles
    return new Response(JSON.stringify(vehicle.length > 0 ? vehicle[0]: null), {
      status: 200,
      headers: { 
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*", // Allow any origin
        "Access-Control-Allow-Methods": "GET", // Allow only GET method
        "Access-Control-Allow-Headers": "Content-Type" // Allow only Content-Type header
      },
    });
  } catch (error) {
    // If something went wrong, return a 500 Internal Server Error response
    return new Response("Error getting vehicle", {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  } finally {
    // Close the connection
    await connection?.end();
  }
}
