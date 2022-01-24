import { getParticipants } from "./../../controllers/chat/channel";
import { Router } from "express";
import { getAllMessages, getChannelId, withTryCatch } from "../../controllers";

require("dotenv").config();

const chatRouter = Router();

chatRouter.post("/all-messages", (req, res) =>
  withTryCatch(req, res, getAllMessages)
);

chatRouter.post("/channelId", (req, res) =>
  withTryCatch(req, res, getChannelId)
);

chatRouter.post("/participants", (req, res) =>
  withTryCatch(req, res, getParticipants)
);
export default chatRouter;
