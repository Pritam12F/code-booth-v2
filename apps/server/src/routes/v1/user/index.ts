import { Router } from "express";
import { signUpRouter } from "@code-booth/server/signupRouter";

export const userRouter: any = Router();

userRouter.use("/signup", signUpRouter);
