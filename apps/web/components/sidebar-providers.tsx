"use client";

import {
  SidebarProvider,
  SidebarTrigger,
} from "@workspace/ui/components/sidebar";
import { AppSidebar } from "./app-sidebar";
import { SidebarOpenContext } from "./context/sidebar/sidebar-context";
import { useState } from "react";

export function SidebarProviderWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <SidebarOpenContext.Provider value={{ isOpen }}>
      <SidebarProvider>
        <AppSidebar />
        <main>
          <SidebarTrigger
            className="w-7 h-7 m-2"
            onClick={() => {
              setIsOpen((c) => !c);
            }}
          />
          {children}
        </main>
      </SidebarProvider>
    </SidebarOpenContext.Provider>
  );
}
