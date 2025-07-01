import { getJWT, getUserDetails } from "@/lib/user-details";
import axios from "axios";

export async function fetchBooths() {
  const { email, id } = await getUserDetails();
  const token = await getJWT(email, id);

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
  const token = await getJWT(email, id);

  try {
    const res = await axios.get(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/booths/${boothId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

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

    return res.data as { id: string; email: string }[] | null;
  } catch (err) {
    return null;
  }
}

export async function updateBooth({
  boothId,
  boothName,
  intervieweeId,
  rating,
  review,
  passed,
  tasks,
}: {
  boothId: string;
  boothName?: string;
  intervieweeId?: string;
  rating?: string;
  review?: string;
  passed?: boolean;
  tasks?: any[];
}) {
  const { email, id } = await getUserDetails();
  const token = await getJWT(email, id);

  try {
    const res = await axios.post(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/booths/${boothId}`,
      {
        intervieweeId,
        title: boothName,
        passed,
        rating,
        tasks,
        review,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return res.data as string[];
  } catch (err) {
    return null;
  }
}

export async function deleteTask(taskId: string) {
  const { email, id } = await getUserDetails();
  const token = await getJWT(email, id);

  try {
    const res = await axios.delete(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/booths/task/${taskId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return true;
  } catch (err) {
    console.error("Error deleting task:", err);
    return null;
  }
}

export async function deleteBooth(boothId: string) {
  const { email, id } = await getUserDetails();
  const token = await getJWT(email, id);

  try {
    const res = await axios.delete(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/booths/${boothId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return true;
  } catch (err) {
    console.error("Error deleting booth:", err);
    return null;
  }
}

export async function createBooth({
  boothName,
  intervieweeId,
  rating,
  review,
  passed,
  tasks,
}: {
  boothName: string;
  intervieweeId: string;
  rating?: string;
  review?: string;
  passed?: boolean;
  tasks?: any[];
}) {
  const { email, id } = await getUserDetails();
  const token = await getJWT(email, id);

  try {
    const res = await axios.post(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/booths/create`,
      {
        title: boothName,
        intervieweeId,
        rating,
        review,
        passed,
        tasks,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return res.data;
  } catch (err) {
    console.error("Error deleting task:", err);
    return null;
  }
}
