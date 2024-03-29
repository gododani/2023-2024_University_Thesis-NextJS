export type Vehicle = {
  id?: number;
  brand: string;
  model: string;
  vintage: string;
  fuel: Fuel;
  transmission: Transmission;
  horsepower: number;
  cylinderCapacity: number;
  technicalValidity: Date;
  km: number;
  price: number;
  description: string;
};

export type Fuel = "benzin" | "diesel" | "electric" | "hybrid";

export type Transmission = "manual" | "automatic";
