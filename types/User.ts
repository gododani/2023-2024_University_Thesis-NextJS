export type User = {
  id?: number;
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  password: string;
  role: "USER" | "ADMIN";
  phoneNumber: string;
  passwordResetToken?: string;
  passwordResetExpires?: Date;
};
