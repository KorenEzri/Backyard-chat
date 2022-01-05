import { generateAccessToken } from "../../auth/access-token";
import { verifyRefreshToken } from "../../auth/refresh-token";
import { createError } from "../../errors";
import { ChatRequest, ChatResponse } from "../../types";

export const getToken = async (req: ChatRequest, res: ChatResponse) => {
  const { refreshToken } = req.body;

  if (!refreshToken) {
    createError("token missing", 400);
  }

  const data = verifyRefreshToken(refreshToken);

  if (!data) {
    return createError("token invalid", 400);
  }

  const { userId, userName, role } = data;

  const accessToken = generateAccessToken(userId, userName, role);

  res.json({ accessToken });
};
