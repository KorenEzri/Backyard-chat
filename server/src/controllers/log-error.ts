import { createError } from "../errors";
import Error from "../mongo/schemas/error";
import { ChatRequest, ChatResponse } from "../types";

export const logErrorToService = async (
  req: ChatRequest,
  res: ChatResponse
) => {
  const { info, platform, user, error } = req.body;

  const payload = {
    info: JSON.stringify(error),
    platform,
    user,
    error: JSON.stringify(error),
  };

  if (!user) delete payload.user;

  if (!user && !info && !error) createError("not enough data provided", 400);

  // TODO validation
  const newError = new Error(payload);

  const savedError = await newError.save();

  res.json({ created: savedError });
};
