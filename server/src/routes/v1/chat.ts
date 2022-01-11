import { Router } from "express";
import rateLimit from "express-rate-limit";
import { getAllMessages, withTryCatch } from "../../controllers";

require("dotenv").config();

const apiLimiter = rateLimit({
  windowMs: 30 * 1000, // 15 minutes
  max: 10,
});

const chatRouter = Router();

chatRouter.post("/all-messages", apiLimiter, (req, res) =>
  withTryCatch(req, res, getAllMessages)
);

export default chatRouter;
