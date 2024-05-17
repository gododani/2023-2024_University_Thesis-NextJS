import { createConnection } from "@/lib/db";
import { Connection, RowDataPacket } from "mysql2/promise";
import { NextRequest } from "next/server";

export async function GET(req: NextRequest) {
  let connection: Connection | null = null;
  try {
    // Connect to the database
    connection = await createConnection();

    // Get the query parameters
    const brand = req.nextUrl.searchParams.get("brand")
    const model = req.nextUrl.searchParams.get("model")
    const vintage = req.nextUrl.searchParams.get("vintage")
    const fuel = req.nextUrl.searchParams.get("fuel")

    // Create the base SQL query
    let sql = "SELECT * FROM Vehicle WHERE 1=1";

    // Add filters to the SQL query
    const filters: any[] = [];
    if (brand) {
      sql += " AND brand = ?";
      filters.push(brand);
    }
    if (model) {
      sql += " AND model = ?";
      filters.push(model);
    }
    if (vintage) {
      sql += " AND vintage = ?";
      filters.push(vintage);
    }
    if (fuel) {
      sql += " AND fuel = ?";
      filters.push(fuel);
    }

    // Get all vehicles from the database
    const [vehicleRows] = await connection.query(sql, filters);

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
