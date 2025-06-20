import { getSession } from "next-auth/react";

export const getUserDetails = async () => {
  return {
    email: (await getSession())?.user.email,
    id: (await getSession())?.user.id,
  };
};
