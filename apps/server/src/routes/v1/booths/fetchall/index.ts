import { prisma } from "@workspace/db/client";
import { Request, Response, Router } from "express";
import { AuthMiddleWare } from "@code-booth/server/authMiddleware";

export const fetchAllRouter: any = Router();

fetchAllRouter.post(
  "/",
  AuthMiddleWare,
  async (req: Request, res: Response) => {
    const { email } = req.body;

    if (!email) {
      res.status(400).json({
        message: "User email not provided",
      });
    }

    try {
      const booths = await prisma.user.findFirst({
        where: {
          email,
        },
        select: {
          booths: true,
          participatedBooths: true,
        },
      });

      res.json({
        booths: booths?.booths,
        participatedBooths: booths?.participatedBooths,
      });
    } catch (err) {
      console.error(err);

      res.status(500).json({
        message: "Internal server error",
      });
    }
  }
);
