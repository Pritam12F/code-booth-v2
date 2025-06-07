"use server";

import jwt from "jsonwebtoken";

export const getToken = async (email: string) => {
  const encoded = jwt.sign({ email }, process.env.NEXTAUTH_SECRET!);
  return encoded;
};
