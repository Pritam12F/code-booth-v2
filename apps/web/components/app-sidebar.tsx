"use client";

import { Calendar, Home, Inbox, Search, Settings } from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@workspace/ui/components/sidebar";
import { IconInnerShadowTop } from "@tabler/icons-react";
import { NavUser } from "./nav-user";
import { useSession } from "next-auth/react";
import { SidebarBooths } from "./sidebar-booths";

// Menu items.
const items = [
  {
    title: "Home",
    url: "#",
    icon: Home,
  },
  {
    title: "Inbox",
    url: "#",
    icon: Inbox,
  },
  {
    title: "Calendar",
    url: "#",
    icon: Calendar,
  },
  {
    title: "Search",
    url: "#",
    icon: Search,
  },
  {
    title: "Settings",
    url: "#",
    icon: Settings,
  },
];

export function AppSidebar() {
  const { data: session } = useSession();

  return (
    <Sidebar>
      <SidebarHeader>
        <LogoHeader />
      </SidebarHeader>
      <SidebarContent>
        <SidebarBooths />
      </SidebarContent>
      <SidebarFooter>
        <NavUser
          user={{
            name: session?.user.name!,
            email: session?.user.email!,
            avatar: session?.user.image!,
          }}
        />
      </SidebarFooter>
    </Sidebar>
  );
}

const LogoHeader = () => {
  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <SidebarMenuButton
          asChild
          className="data-[slot=sidebar-menu-button]:!p-1.5"
        >
          <a href="#">
            <IconInnerShadowTop className="!size-5" />
            <span className="text-base font-semibold">CodeBooth Inc.</span>
          </a>
        </SidebarMenuButton>
      </SidebarMenuItem>
    </SidebarMenu>
  );
};
