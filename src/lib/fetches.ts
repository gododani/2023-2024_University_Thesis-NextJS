export async function getVehicles({ brand, model, vintage, fuel }: any) {
  const url = new URL(`${process.env.NEXT_PUBLIC_BASE_URL}/api/vehicles/getVehicles`);
  if (brand) url.searchParams.append('brand', brand);
  if (model) url.searchParams.append('model', model);
  if (vintage) url.searchParams.append('vintage', vintage);
  if (fuel) url.searchParams.append('fuel', fuel);
  const response = await fetch(
    url.toString(),
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

export async function deleteVehicle(id: number) {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/vehicles/deleteVehicle/${id}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      cache: "no-store",
    }
  );
  return response;
}

export async function sendEmail(values: any){
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/contactEmail`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      cache: "no-store",
      body: JSON.stringify(values)
    }
  );
  return response;
}
