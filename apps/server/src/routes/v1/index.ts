import { Router } from "express";
import { userRouter } from "@code-booth/server/userRouter";
import { boothRouter } from "@code-booth/server/boothRouter";

export const v1Router: any = Router();

v1Router.use("/user", userRouter);
v1Router.use("/booths", boothRouter);
