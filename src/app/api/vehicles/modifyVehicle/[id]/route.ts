import { createConnection } from "@/lib/db";
import { Connection, RowDataPacket } from "mysql2/promise";
import {
  Fuel,
  Transmission,
  Vehicle,
  Wheel,
} from "../../../../../../types/Vehicle";

export async function POST(req: Request): Promise<Response> {
  let connection: Connection | null = null;
  try {
    // Connect to the database
    connection = await createConnection();

    // Get the vehicle ID from the request parameters
    const vehicleId = req.url.split("/").pop();

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
      zip: formData.get("zip") as string,
      city: formData.get("city") as string,
      street: formData.get("street") as string,
      description: formData.get("description") as string,
    };

    // Get the images from the request body
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

    // Update the vehicle in the database
    const [result] = await connection.query(
      "UPDATE Vehicle SET ? WHERE id = ?",
      [vehicleForDb, vehicleId]
    );

    // If no rows were affected, return a 501 Internal Server Error response
    if ((result as RowDataPacket).affectedRows === 0) {
      return new Response("Error while updating the vehicle", {
        status: 501,
        headers: { "Content-Type": "application/json" },
      });
    }

    // If images were provided, modify the images in the database
    if (images.length > 0) {
      // Get the old images from the database
      const [rows] = await connection.query(
        "SELECT data FROM Image WHERE vehicleId = ?",
        [vehicleId]
      );

      // Convert the rows to an array of images
      const oldImages = Array.isArray(rows) ? rows : [rows];

      // Convert the old images to base64 strings
      const oldImagesBase64 = oldImages.map((image: any) =>
        Buffer.from(image.data).toString("base64")
      );

      // Find the images to delete and the images to insert
      const imagesToDelete = oldImagesBase64.filter(
        (image: any) => !images.includes(image)
      );
      const imagesToInsert = images.filter(
        (image) => !oldImagesBase64.includes(image)
      );

      // Delete the old images that are not in the new images array
      if (imagesToDelete.length > 0) {
        const deleteQuery =
          "DELETE FROM Image WHERE vehicleId = ? AND data IN (?)";
        await connection.query(deleteQuery, [
          vehicleId,
          imagesToDelete.map((image) => Buffer.from(image, "base64")),
        ]);
      }

      // Insert the new images that are not in the old images array
      if (imagesToInsert.length > 0) {
        const insertQuery = "INSERT INTO Image (vehicleId, data) VALUES ?";
        const insertValues = imagesToInsert.map((image) => [
          vehicleId,
          Buffer.from(image.split(",")[1], "base64"),
        ]);
        await connection.query(insertQuery, [insertValues]);
      }
    }

    // Close the connection
    await connection.end();

    // Return a 200 OK response
    return new Response("Vehicle updated successfully", {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    // If something went wrong, return a 500 Internal Server Error response
    return new Response("Error while updating vehicle", {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  } finally {
    // Close the connection
    await connection?.end();
  }
}
