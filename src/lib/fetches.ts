export async function getVehicles() {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/vehicles/getVehicles`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      cache: "no-store",
    }
  );
  const data = await response.json();
  return data;
}

export async function getVehicle(id: string) {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/vehicles/getVehicle/${id}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      cache: "no-store",
    }
  );
  const data = await response.json();
  return data;
}

export async function getVehicleImages(id: number) {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/vehicles/getVehicleImages/${id}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      cache: "no-store",
    }
  );
  const data = await response.json();
  return data;
}
