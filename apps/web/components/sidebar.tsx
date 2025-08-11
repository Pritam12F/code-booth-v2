"use client";

import { useQuery } from "@tanstack/react-query";
import { useAppbarContext } from "./context/appbar/appbar-context";
import SidebarHeader from "./sidebar-header";
import { fetchBooths } from "@/api";

export default function Sidebar() {
  const { sideBarOpen } = useAppbarContext();

  const { data: booths } = useQuery({
    queryFn: async () => await fetchBooths(),
    queryKey: ["booths"],
  });

  if (!sideBarOpen) {
    return null;
  }

  return (
    <div className="w-80 border-r">
      <SidebarHeader selectedBooth={booths?.[0]!} />
    </div>
  );
}
