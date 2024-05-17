import { createConnection } from "@/lib/db";
import { Connection, RowDataPacket } from "mysql2/promise";
import {
  Fuel,
  Transmission,
  Vehicle,
  Wheel,
} from "../../../../../types/Vehicle";

export async function POST(req: Request): Promise<Response> {
  let connection: Connection | null = null;
  try {
    // Connect to the database
    connection = await createConnection();

    // Get the request body
    const formData = await req.formData();

    // Create vehicle object from request body
    const vehicle: Vehicle = {
      brand: formData.get("brand") as string,
      model: formData.get("model") as string,
      vintage: formData.get("vintage") as string,
      fuel: formData.get("fuel") as Fuel,
      transmission: formData.get("transmission") as Transmission,
      horsepower: Number(formData.get("horsepower")),
      drive: formData.get("drive") as Wheel,
      technicalValidity: new Date(formData.get("technicalValidity") as string),
      km: Number(formData.get("km")),
      price: Number(formData.get("price")),
      description: formData.get("description") as string,
    };

    // Get the images from the FormData
    const images: string[] = [];
    let index = 0;
    while (formData.has(`images[${index}]`)) {
      images.push(formData.get(`images[${index}]`) as string);
      index++;
    }

    // Convert technicalValidity to a string
    const vehicleForDb = {
      ...vehicle,
      technicalValidity: vehicle.technicalValidity.toISOString().slice(0, 10),
    };

    // Create a new vehicle in the database
    const [result] = await connection.query(
      "INSERT INTO Vehicle SET ?",
      vehicleForDb
    );

    // If no rows were affected, return a 501 Internal Server Error response
    if ((result as RowDataPacket).affectedRows === 0) {
      return new Response("Error creating vehicle", {
        status: 501,
        headers: { "Content-Type": "application/json" },
      });
    }

    // If images were provided, save them to the database
    if (images.length > 0) {
      // Get the ID of the new vehicle
      const vehicleId = (result as RowDataPacket).insertId;

      // Prepare the images for the batch insert query
      const imagesData = images.map((image) => [
        vehicleId,
        Buffer.from(image.split(",")[1], "base64"),
      ]);

      // Execute the batch insert query
      await connection.query("INSERT INTO Image (vehicleId, data) VALUES ?", [
        imagesData,
      ]);
    }

    // Close the connection
    await connection.end();

    // Return a 200 OK response
    return new Response("Vehicle created successfully", {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    // If something went wrong, return a 500 Internal Server Error response
    return new Response("Error creating vehicle", {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  } finally {
    // Close the connection
    await connection?.end();
  }
}
