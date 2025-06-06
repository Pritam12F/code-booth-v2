import { Router } from "express";
import { userRouter } from "@code-booth/server/userRouter";

export const v1Router: any = Router();

v1Router.use("/user", userRouter);
