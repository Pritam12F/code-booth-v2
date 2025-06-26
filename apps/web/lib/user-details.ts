import { getToken } from "@/server";
import { getSession } from "next-auth/react";

export const getUserDetails = async () => {
  return {
    email: (await getSession())?.user.email,
    id: (await getSession())?.user.id,
  };
};

export const getJWT = async (email?: string, id?: string) => {
  if (localStorage.getItem("cd-token")) {
    return localStorage.getItem("cd-token");
  }
  const token = await getToken(email, id);
  localStorage.setItem("cd-token", token ?? "");

  return token;
};
