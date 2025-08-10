"use client";

import { useAppbarContext } from "./context/appbar/appbar-context";
import SidebarHeader from "./sidebar-header";

export default function Sidebar() {
  const { sideBarOpen } = useAppbarContext();

  if (!sideBarOpen) {
    return null;
  }

  return (
    <div className="w-80 border-r">
      <SidebarHeader />
    </div>
  );
}
