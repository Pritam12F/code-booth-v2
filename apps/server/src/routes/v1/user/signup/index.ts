import { Request, Response, Router } from "express";
import { prisma } from "@workspace/db/client";
import { SignUpSchema } from "@workspace/common";
import bcrypt from "bcrypt";

export const signUpRouter: any = Router();

signUpRouter.post("/", async (req: Request, res: Response) => {
  const { success, data } = SignUpSchema.safeParse(req.body);

  if (!success) {
    return res.status(400).json({
      error: "Invalid input",
      details: data,
    });
  }

  try {
    const { email, password, confirmPassword } = data;

    const userExists = await prisma.user.findFirst({
      where: {
        email,
      },
    });

    if (userExists) {
      res.status(402).json({
        message: "Email is already registered",
      });

      return;
    }

    await prisma.user.create({
      data: {
        email,
        password: bcrypt.hashSync(password, 10),
        accountType: "CREDENTIALS",
      },
    });

    res.json({
      message: "Signed up user",
    });
  } catch (e) {
    console.error("Error during signup:", e);
    res.status(500).json({
      error: "Internal server error",
    });

    return;
  }
});
