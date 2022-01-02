// import { Router } from "express";
// import { withTryCatch } from "../../utils";
// import rateLimit from "express-rate-limit";
// import { getChannels, logErrorToService } from "../../controllers";

// require("dotenv").config();

// const apiLimiter = rateLimit({
//   windowMs: 30 * 1000, // 15 minutes
//   max: 10,
// });

// const chatRouter = Router();

// chatRouter.get("/channels", (req, res) => withTryCatch(req, res, getChannels));

// export default chatRouter;
