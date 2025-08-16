import { Booth } from "@workspace/db";
import { Plus, Search } from "lucide-react";
import React, { useState } from "react";
import BoothCard from "./booth-card";
import { BoothDialog } from "./booth-dialog";

export default function SidebarHeader({
  selectedBooth,
}: {
  selectedBooth: Booth;
}) {
  const [isNewDialogOpen, setIsNewDialogOpen] = useState(false);

  return (
    <div className="flex flex-col p-4 border-b">
      <div className="flex justify-between items-center">
        <div className="text-base font-semibold">Playgrounds</div>
        <div className="flex space-x-4">
          <Plus
            onClick={() => setIsNewDialogOpen(true)}
            className="w-7 h-7 hover:bg-gray-900 cursor-pointer rounded-md p-1 transition-all duration-200"
          />
          <Search className="w-7 h-7 hover:bg-gray-900 cursor-pointer rounded-md p-1 transition-all duration-200" />
        </div>
      </div>
      <BoothCard selectedBooth={selectedBooth} />
      <BoothDialog
        dialogOpen={isNewDialogOpen}
        setDialogOpen={setIsNewDialogOpen}
        type="CREATE"
      />
    </div>
  );
}
