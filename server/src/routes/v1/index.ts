import { Router } from "express";
import { checkToken } from "../../middlewares";
import authRouter from "./auth";
import chatRouter from "./chat";

const router = Router();

router.use("/auth", authRouter);
router.use(checkToken);
router.use("/chat", chatRouter);

export default router;
