"use client";

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
import Link from "next/link";
import Image from "next/image";

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
          <Link href="/" className="flex items-center my-2">
            <Image src={"/cropped.png"} alt="" width={30} height={30} />
            <span className="text-base font-semibold">CodeBooth Inc.</span>
          </Link>
        </SidebarMenuButton>
      </SidebarMenuItem>
    </SidebarMenu>
  );
};
