"use server";

import jwt from "jsonwebtoken";

export const getToken = async (email?: string, id?: string) => {
  if (!email || !id) {
    return null;
  }
  const encoded = jwt.sign({ email, id }, process.env.NEXTAUTH_SECRET!);
  return encoded;
};
