import * as jwt from "jsonwebtoken";

export interface AuthPayload {
  userId: number;
}

export const auth = (header: string): AuthPayload => {
  const token = header.split(" ")[1];

  if (!token) {
    throw new Error("No token found");
  }

  return jwt.verify(
    token,
    process.env.SECRET_TOKEN as jwt.Secret
  ) as AuthPayload;
};
