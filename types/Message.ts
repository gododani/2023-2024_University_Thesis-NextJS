export type Message = {
  id?: number;
  username: string;
  content: string;
  role: "USER" | "ADMIN";
  timeStamp: Date;
};
