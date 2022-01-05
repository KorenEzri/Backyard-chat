import jwt, { Secret } from "jsonwebtoken";
import { Falsy, EncodeResult } from "../types";
import Logger from "../logger/logger";
import { createError } from "../errors";
import RefreshToken from "../mongo/schemas/refresh-token";
import User from "../mongo/schemas/user";

require("dotenv").config();

export const generateRefreshToken = async (
  id: string,
  userName: string,
  role: string
): Promise<string | void> => {
  try {
    const user = await User.findById(id);

    if (!user) {
      throw new Error("user not found");
    }

    await RefreshToken.deleteMany({ userId: id });

    const token = jwt.sign(
      {
        userId: id,
        userName,
        role,
      },
      process.env.REFRESH_TOKEN_SECRET as Secret,
      { expiresIn: "1y" }
    );

    const newRefreshToken = new RefreshToken({
      userId: id,
      token,
    });

    await newRefreshToken.save();

    return token;
  } catch ({ message }) {
    if (typeof message === "string") {
      createError(message, 402);
    }
    //TODO  change status
    Logger.error(message);
  }
};

export const verifyRefreshToken = (token: string): Falsy<EncodeResult> => {
  try {
    const data = <EncodeResult>(
      jwt.verify(token, process.env.REFRESH_TOKEN_SECRET as Secret)
    );

    return data;
  } catch {
    return false;
  }
};
