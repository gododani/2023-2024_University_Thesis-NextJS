import { createConnection } from "@/lib/db";
import { Connection, RowDataPacket } from "mysql2/promise";
import { NextRequest, NextResponse } from "next/server";
import { createEdgeRouter } from "next-connect";

interface RequestContext {
  params: {
    id: string;
  };
}

const router = createEdgeRouter<NextRequest, RequestContext>();

router
  .use((req, event, next) => {
    // Set CORS headers
    req.headers.set('Access-Control-Allow-Origin', 'https://www.bekautomotor.hu');
    req.headers.set('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    req.headers.set('Access-Control-Allow-Headers', 'Content-Type, Authorization, X-Requested-With');
    req.headers.set('Access-Control-Allow-Credentials', 'true');

    // Handle OPTIONS Method

    if (req.method === 'OPTIONS') {
      // Handle OPTIONS Method
      return NextResponse.next();
    }

    return next();
  })
  .get(async (req) => {
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
  
      // Return the vehicles
      return NextResponse.json(vehicle.length > 0 ? vehicle[0] : null);
    } catch (error) {
      // If something went wrong, return a 500 Internal Server Error response
      return NextResponse.json({ status: 500, message: "Error getting vehicle" });
    } finally {
      // Close the connection
      await connection?.end();
    }
  });

export async function GET(request: NextRequest, ctx: RequestContext) {
  return router.run(request, ctx);
}