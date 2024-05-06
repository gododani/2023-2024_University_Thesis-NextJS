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
  images?: string;
};

export type Fuel = "benzin" | "diesel" | "electric" | "hybrid" | "all";

export type Transmission = "manual" | "automatic";
