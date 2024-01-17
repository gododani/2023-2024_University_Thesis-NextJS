export type Vehicle = {
    id?: number;
    brand: string;
    model: string;
    vintage: string;
    fuel: "benzin" | "diesel" | "electric" | "hybrid";
    transmission: "manual" | "automatic";
    power: number;
    cylinderCapacity: number;
    technicalValidity: Date;
    km: number;
    price: number;
    description: string;
  };
  