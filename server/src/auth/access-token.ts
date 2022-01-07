import jwt, { Secret } from "jsonwebtoken";
import { Falsy, EncodeResult } from "../types";

require("dotenv").config();

export const generateAccessToken = (
  id: string,
  username: string,
  role: string
) =>
  jwt.sign(
    {
      userId: id,
      username,
      role,
    },
    process.env.ACCESS_TOKEN_SECRET as Secret,
    { expiresIn: "15m" }
  );

export const verifyAccessToken = (token: string): Falsy<EncodeResult> => {
  try {
    const data = <EncodeResult>(
      jwt.verify(token, process.env.ACCESS_TOKEN_SECRET as Secret)
    );

    return data;
  } catch {
    return false;
  }
};
