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
import { UpdateDialog } from "./booth-dialog";

export const BoothActions = ({ boothId }: { boothId: string }) => {
  const [open, setOpen] = useState<boolean>(false);
  const isMobile = useIsMobile();

  return (
    <div>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <SidebarMenuAction showOnHover>
            <MoreHorizontal />
            <span className="sr-only">More</span>
          </SidebarMenuAction>
        </DropdownMenuTrigger>
        <DropdownMenuContent
          className="w-56 rounded-lg"
          side={isMobile ? "bottom" : "right"}
          align={isMobile ? "end" : "start"}
        >
          <DropdownMenuItem>
            <Link className="text-muted-foreground" />
            <span>Copy Link</span>
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => {
              setOpen(true);
            }}
          >
            <Edit className="text-muted-foreground" />
            Update Booth
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem>
            <Trash2 className="text-red-500" />
            <span>Delete</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <UpdateDialog
        dialogOpen={open}
        setDialogOpen={setOpen}
        boothId={boothId}
        type="UPDATE"
      />
    </div>
  );
};
