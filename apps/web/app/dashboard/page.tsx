"use client";

import { fetchBooths } from "@/api";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function DashboardPage() {
  const { data: booths } = useQuery({
    queryFn: async () => await fetchBooths(),
    queryKey: ["booths"],
  });

  const router = useRouter();

  useEffect(() => {
    if (booths) {
      router.push(`/dashboard/${booths?.booths[0]?.id}`);
    }
  }, [booths]);

  return null;
}
