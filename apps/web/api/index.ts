import { getUserEmail } from "@/lib/access-token";
import { getToken } from "@/server";
import axios from "axios";

export async function fetchBooths() {
  const email = await getUserEmail();
  const token = await getToken(email!);

  try {
    const res = await axios.post(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/booths`,
      { email },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    const booths = res.data;

    return [...booths.booths, ...booths.participatedBooths];
  } catch (err) {
    console.error(err);

    return [];
  }
}
