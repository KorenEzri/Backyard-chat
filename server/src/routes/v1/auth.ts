import { Router } from "express";
import rateLimit from "express-rate-limit";
import {
  login,
  getToken,
  register,
  loginWithToken,
  logErrorToService,
  editUser,
  checkIfUsernameIsValid,
} from "../../controllers";
import { withTryCatch } from "../../controllers/with-try-catch";
import { checkToken } from "../../middlewares";
import { ChatRequest, ChatResponse } from "../../types";

require("dotenv").config();

const apiLimiter = rateLimit({
  windowMs: 30 * 1000, // 15 minutes
  max: 10,
});

const authRouter = Router();

authRouter.post("/login", (req, res) => withTryCatch(req, res, login));

authRouter.post("/error", (req, res) =>
  withTryCatch(req, res, logErrorToService)
);

authRouter.post("/login-with-token", (req, res) =>
  withTryCatch(req, res, loginWithToken)
);

authRouter.post("/get-token", apiLimiter, (req, res) =>
  withTryCatch(req, res, getToken)
);

authRouter.post("/register", (req, res) => withTryCatch(req, res, register));

// authRouter.post("/verify-mail", (req, res) =>
//   withTryCatch(req, res, verifyMail)
// );

authRouter.put("/edit", checkToken, (req: ChatRequest, res: ChatResponse) =>
  withTryCatch(req, res, editUser)
);

authRouter.post("/check-username", (req, res) =>
  withTryCatch(req, res, checkIfUsernameIsValid)
);

export default authRouter;
