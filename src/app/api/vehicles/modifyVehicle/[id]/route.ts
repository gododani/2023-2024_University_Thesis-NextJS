import { createConnection } from "@/lib/db";
import { Connection, RowDataPacket } from "mysql2/promise";
import { Fuel, Transmission, Vehicle } from "../../../../../../types/Vehicle";

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
      cylinderCapacity: Number(formData.get("cylinderCapacity")),
      technicalValidity: new Date(formData.get("technicalValidity") as string),
      km: Number(formData.get("km")),
      price: Number(formData.get("price")),
      description: formData.get("description") as string,
    };

    // Get the images from the request body
    const images = JSON.parse(formData.get("images") as string);

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
    if (images) {
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

      // Create an array of image objects
      const newImagesBase64 = Array.isArray(images) ? images : [images];

      // Find the images to delete and the images to insert
      const imagesToDelete = oldImagesBase64.filter(
        (image: any) => !newImagesBase64.includes(image)
      );
      const imagesToInsert = newImagesBase64.filter(
        (image) => !oldImagesBase64.includes(image)
      );

      // Delete the old images that are not in the new images array
      for (const imageToDelete of imagesToDelete) {
        await connection.query(
          "DELETE FROM Image WHERE vehicleId = ? AND data = ?",
          [vehicleId, Buffer.from(imageToDelete, "base64")]
        );
      }

      // Insert the new images that are not in the old images array
      for (const imageToInsert of imagesToInsert) {
        await connection.query(
          "INSERT INTO Image (vehicleId, data) VALUES (?, ?)",
          [vehicleId, Buffer.from(imageToInsert.split(",")[1], "base64")]
        );
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
