export type Vehicle = {
  id?: number;
  brand: string;
  model: string;
  vintage: string;
  fuel: Fuel;
  transmission: Transmission;
  horsepower: number;
  drive: Wheel;
  technicalValidity: Date;
  km: number;
  price: number;
  zip: string;
  city: string;
  street: string;
  description: string;
  images?: string;
};

export type Wheel = "All wheels" | "Front wheel" | "Rear Wheel";

export type Fuel = "benzin" | "diesel" | "electric" | "hybrid" | "all";

export type Transmission = "manual" | "automatic";
