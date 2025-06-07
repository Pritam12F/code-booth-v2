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
      <SidebarGroupLabel>Application</SidebarGroupLabel>
      <SidebarGroupContent>
        <SidebarMenu>
          {(booths as any[]).map((item: any) => (
            <SidebarMenuItem key={item.id}>
              <SidebarMenuButton asChild>
                <span>{item.title}</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  );
};
