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
import { BoothActions } from "./sidebar-booth-actions";
import { Booth } from "@workspace/db";
import { Plus } from "lucide-react";
import { useState } from "react";
import { BoothDialog } from "./booth-dialog";
import Link from "next/link";
import { useSession } from "next-auth/react";

export const SidebarBooths = () => {
  const { data: booths, isLoading } = useQuery({
    queryFn: async () => await fetchBooths(),
    queryKey: ["booths"],
  });
  const { data: session } = useSession();
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <SidebarGroup>
      <SidebarGroupLabel className="flex justify-between">
        <span>Booths</span>
        <Plus
          className="cursor-pointer hover:text-white transition-all duration-150"
          height={20}
          onClick={() => setIsCreateDialogOpen(true)}
        />
      </SidebarGroupLabel>
      <SidebarGroupContent>
        <SidebarMenu>
          {(booths as Booth[]).map((item) => (
            <SidebarMenuItem key={item.id}>
              <SidebarMenuButton asChild>
                <Link href={`/dashboard/${item.id}`}>{item.title}</Link>
              </SidebarMenuButton>
              <BoothActions
                boothId={item.id}
                userId={session?.user.id!}
                interviewerId={item.interviewerId}
              />
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarGroupContent>
      <BoothDialog
        setDialogOpen={setIsCreateDialogOpen}
        dialogOpen={isCreateDialogOpen}
        type="CREATE"
      />
    </SidebarGroup>
  );
};
