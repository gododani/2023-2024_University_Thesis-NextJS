export async function getVehicles() {
  const response = await fetch(
    `${process.env.BASE_URL}/api/vehicles/getVehicles`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      cache: "no-cache",
      next: { revalidate: 0}
    }
  );
  const data = await response.json();
  return data;
}
