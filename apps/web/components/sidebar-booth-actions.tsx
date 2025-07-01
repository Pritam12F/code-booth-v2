import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@workspace/ui/components/dropdown-menu";
import { SidebarMenuAction } from "@workspace/ui/components/sidebar";
import { useIsMobile } from "@workspace/ui/hooks/use-mobile";
import { Edit, Link, MoreHorizontal, Trash2 } from "lucide-react";
import { useState } from "react";
import { BoothDialog } from "./booth-dialog";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteBooth } from "@/api";

export const BoothActions = ({ boothId }: { boothId: string }) => {
  const [open, setOpen] = useState<boolean>(false);
  const isMobile = useIsMobile();
  const queryClient = useQueryClient();

  const { mutateAsync: deleteBoothHandler } = useMutation({
    mutationFn: deleteBooth,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["booths"] });
    },
  });

  return (
    <div>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <SidebarMenuAction showOnHover>
            <MoreHorizontal className="cursor-pointer" />
            <span className="sr-only">More</span>
          </SidebarMenuAction>
        </DropdownMenuTrigger>
        <DropdownMenuContent
          className="w-56 rounded-lg"
          side={isMobile ? "bottom" : "right"}
          align={isMobile ? "end" : "start"}
        >
          <DropdownMenuItem className="cursor-pointer">
            <Link className="text-muted-foreground" />
            <span>Copy Link</span>
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => {
              setOpen(true);
            }}
            className="cursor-pointer"
          >
            <Edit className="text-muted-foreground" />
            Update Booth
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            onClick={async () => {
              await deleteBoothHandler(boothId);
            }}
            className="cursor-pointer"
          >
            <Trash2 className="text-red-500" />
            <span>Delete</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <BoothDialog
        dialogOpen={open}
        setDialogOpen={setOpen}
        boothId={boothId}
        type="UPDATE"
      />
    </div>
  );
};
