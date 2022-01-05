import { Request, Response } from "express";
import Logger from "../logger/logger";
import { ChatRequest, ChatResponse } from "../types";

export const withTryCatch = async (
  req: ChatRequest,
  res: ChatResponse,
  cb: (
    req: ChatRequest,
    res: ChatResponse
  ) => Promise<void> | Promise<Response<any, Record<string, any>>>
) => {
  try {
    await cb(req, res);
  } catch (e: any) {
    if (e?.customMessage) {
      return res.status(e?.status || 500).json({ error: e.customMessage });
    }
    Logger.error(e.message);
    return res.status(500).json({ error: "error occurred" });
  }
};
