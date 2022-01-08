import { Router } from "express";
import rateLimit from "express-rate-limit";
import { logErrorToService, withTryCatch } from "../../controllers";

require("dotenv").config();

const apiLimiter = rateLimit({
  windowMs: 30 * 1000, // 15 minutes
  max: 10,
});

const chatRouter = Router();

// chatRouter.get("/channels", (req, res) => withTryCatch(req, res));

export default chatRouter;
