import { getUserDetails } from "@/lib/access-token";
import { getToken } from "@/server";
import { Booth, User } from "@workspace/db";
import axios from "axios";

export async function fetchBooths() {
  const { email, id } = await getUserDetails();
  const token = await getToken(email, id);

  try {
    const res = await axios.get(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/booths`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    const booths = res.data;

    return [...booths.booths, ...booths.participatedBooths];
  } catch (err) {
    return [];
  }
}

export async function fetchBooth(boothId: string) {
  const { email, id } = await getUserDetails();
  const token = await getToken(email, id);

  try {
    const res = await axios.get(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/booths/${boothId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    console.log(res.data.booth);

    return res.data.booth;
  } catch (err) {
    return null;
  }
}

export async function fetchUsers() {
  const { email } = await getUserDetails();

  try {
    const res = await axios.get(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/user?email=${email}`
    );

    return res.data as string[];
  } catch (err) {
    return null;
  }
}
