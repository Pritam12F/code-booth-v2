"use client";

import { useQuery } from "@tanstack/react-query";
import { useAppbarContext } from "./context/appbar/appbar-context";
import SidebarHeader from "./sidebar-header";
import { fetchBooths } from "@/api";
import OwnedBooths from "./owned-booths";
import { useSession } from "next-auth/react";
import AssignedBooths from "./assigned-booths";
import { useState } from "react";
import { Booth } from "@workspace/db";

export default function Sidebar() {
  const { sideBarOpen } = useAppbarContext();
  const { data: session } = useSession();
  const { data: booths } = useQuery({
    queryFn: async () => await fetchBooths(),
    queryKey: ["booths"],
  });
  const [selectedBooth, setSelectedBooth] = useState<Booth>(booths?.[0]!);

  const handleBoothChange = (booth: Booth) => {
    setSelectedBooth(booth);
  };

  if (!sideBarOpen) {
    return null;
  }

  return (
    <div className="w-80 border-r">
      {selectedBooth && <SidebarHeader selectedBooth={selectedBooth} />}
      <OwnedBooths
        booths={booths?.filter(
          (booth) => booth.interviewerId === session?.user.id
        )}
        handleBoothChange={handleBoothChange}
      />
      <AssignedBooths
        booths={booths?.filter(
          (booth) => booth.interviewerId !== session?.user.id
        )}
        changeBoothHanlder={handleBoothChange}
      />
    </div>
  );
}
