import { Router } from "express";
import { checkToken } from "../../middlewares";
import authRouter from "./auth";
const router = Router();

router.use("/auth", authRouter);
router.use(checkToken);

export default router;
