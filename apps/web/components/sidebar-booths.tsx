import { fetchBooths } from "@/api";
import { useQuery } from "@tanstack/react-query";
import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@workspace/ui/components/sidebar";
import { useSession } from "next-auth/react";
import { BoothActions } from "./sidebar-booth-actions";
import { Booth } from "@workspace/db";

export const SidebarBooths = () => {
  const { data: session } = useSession();
  const { data: booths, isLoading } = useQuery({
    queryFn: async () => await fetchBooths(),
    queryKey: ["booths"],
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <SidebarGroup>
      <SidebarGroupLabel>Booths</SidebarGroupLabel>
      <SidebarGroupContent>
        <SidebarMenu>
          {(booths as Booth[]).map((item) => (
            <SidebarMenuItem key={item.id}>
              <SidebarMenuButton asChild>
                <span>{item.title}</span>
              </SidebarMenuButton>
              <BoothActions boothId={item.id} />
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  );
};
