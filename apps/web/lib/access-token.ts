import { getSession } from "next-auth/react";

export const getUserEmail = async () => {
  return (await getSession())?.user.email;
};
