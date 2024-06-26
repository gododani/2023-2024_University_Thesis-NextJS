import { z } from "zod";

export const signinSchema = z.object({
  email: z
    .string()
    .nonempty({ message: "Email is required" })
    .email({ message: "Invalid email" }),
  password: z.string().nonempty({ message: "Password is required" }),
});

export const signupSchema = z
  .object({
    username: z
      .string()
      .nonempty({ message: "Username is required" })
      .min(4, { message: "Username must be at least 4 characters" }),
    firstName: z.string().nonempty({ message: "Firstname is required" }),
    lastName: z.string().nonempty({ message: "Lastname is required" }),
    email: z
      .string()
      .nonempty({ message: "Email is required" })
      .email({ message: "Invalid email" }),
    password: z
      .string()
      .nonempty({ message: "Password required" })
      .min(6, { message: "Password must be at least 6 characters" }),
    confirmPassword: z
      .string()
      .nonempty({ message: "Confirm Password required" })
      .min(6, { message: "Password must be at least 6 characters" }),
    country: z.string().nonempty({ message: "Country is required" }),
    phoneNumber: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export const forgetPasswordSchema = z.object({
  email: z
    .string()
    .nonempty({ message: "Email is required" })
    .email({ message: "Invalid email" }),
});

export const resetPasswordSchema = z
  .object({
    password: z
      .string()
      .nonempty({ message: "Password required" })
      .min(6, { message: "Password must be at least 6 characters" }),
    confirmPassword: z
      .string()
      .nonempty({ message: "Confirm Password required" })
      .min(6, { message: "Password must be at least 6 characters" }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export const vehicleSchema = z.object({
  brand: z.string().nonempty(),
  model: z.string().nonempty(),
  vintage: z.string().nonempty(),
  fuel: z.enum(["benzin", "diesel", "electric", "hybrid"]),
  transmission: z.enum(["manual", "automatic"]),
  horsepower: z
    .number()
    .transform((val) => Number(val))
    .refine((val) => val > 0, {
      message: "Horsepower must be a positive number",
    }),
  drive: z.enum(["All Wheels", "Front Wheel", "Rear Wheel"]),
  km: z
    .number()
    .transform((val) => Number(val))
    .refine((val) => val > 0, {
      message: "Km must be a positive number",
    }),
  price: z
    .number()
    .transform((val) => Number(val))
    .refine((val) => val > 0, {
      message: "Price must be a positive number",
    }),
  zip: z
    .string()
    .nonempty({ message: "Zip is required" })
    .min(4, { message: "Zip must be at least 4 characters" }),
  city: z.string().nonempty(),
  street: z.string().nonempty(),
  description: z.string().nonempty(),
  images: z
    .any()
    .refine((files) => files?.length >= 1, { message: "Image is required." }),
});

export const emailSchema = z.object({
  email: z
    .string()
    .nonempty({ message: "Email is required" })
    .email({ message: "Invalid email" }),
  subject: z.string().min(1).nonempty({ message: "Subject is required" }),
  message: z.string().min(1).nonempty({ message: "Message is required" }),
});
