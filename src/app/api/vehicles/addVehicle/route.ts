import { createConnection } from "@/lib/db";
import { Connection, RowDataPacket } from "mysql2/promise";
import { Vehicle } from "../../../../../types/Vehicle";

export async function POST(req: Request, res: Response) {
  let connection: Connection | null = null;
  try {
    // Connect to the database
    connection = await createConnection();

    // Get the request body
    const body = await req.json();

    // Create vehicle object from request body
    const vehicle: Vehicle = {
      brand: body.brand,
      model: body.model,
      vintage: body.vintage,
      fuel: body.fuel,
      transmission: body.transmission,
      horsepower: body.horsepower,
      cylinderCapacity: body.cylinderCapacity,
      technicalValidity: new Date(body.technicalValidity),
      km: body.km,
      price: body.price,
      description: body.description,
    };

    // Convert technicalValidity to a string
    const vehicleForDb = {
      ...vehicle,
      technicalValidity: vehicle.technicalValidity.toISOString().slice(0, 10),
    };

    console.log(vehicleForDb);

    // Create a new vehicle in the database
    const [result] = await connection.query(
      "INSERT INTO Vehicle SET ?",
      vehicleForDb
    );

    // If no rows were affected, return a 501 Internal Server Error response
    if ((result as RowDataPacket).affectedRows === 0) {
      return new Response("Error creating vehicle", {
        status: 500,
        headers: { "Content-Type": "application/json" },
      });
    }
    // Return a 200 OK response
    return new Response("User created successfully", {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    // If something went wrong, return a 500 Internal Server Error response
    return new Response("Error creating user", {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  } finally {
    // Close the connection
    await connection?.end();
  }
}
