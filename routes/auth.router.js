import { authController } from "#controllers/AuthController/authContoller";
import { Router } from "express";

export const authRouter = Router();

authRouter.post("/signin", authController.signIn);

authRouter.post("/signup", authController.signUp);
