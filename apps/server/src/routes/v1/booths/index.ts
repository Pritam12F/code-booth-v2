import { Router } from "express";
import { fetchAllRouter } from "@code-booth/server/fetchAllRouter";

export const boothRouter: any = Router();

boothRouter.use("/fetchall", fetchAllRouter);
