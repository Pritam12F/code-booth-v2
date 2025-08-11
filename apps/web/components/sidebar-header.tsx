import { Booth } from "@workspace/db";
import { Badge } from "@workspace/ui/components/badge";
import { Plus, Search, User } from "lucide-react";
import React from "react";

export default function SidebarHeader({
  selectedBooth,
}: {
  selectedBooth: Booth;
}) {
  const concatIndex = selectedBooth.type === "REACT" ? 24 : 14;
  return (
    <div className="flex flex-col p-4 border-b">
      <div className="flex justify-between items-center">
        <div className="text-base font-semibold">Playgrounds</div>
        <div className="flex space-x-4">
          <Plus className="w-7 h-7 hover:bg-gray-900 cursor-pointer rounded-md p-1 transition-all duration-200" />
          <Search className="w-7 h-7 hover:bg-gray-900 cursor-pointer rounded-md p-1 transition-all duration-200" />
        </div>
      </div>
      <div className="flex bg-[#18181b] mt-4 justify-between rounded-md p-4 h-[70px]">
        <div className="flex">
          <div className="text-3xl flex items-center">{selectedBooth.icon}</div>
          <div className="mx-2">
            <div className="text-sm font-semibold">
              {selectedBooth.title.length > concatIndex
                ? selectedBooth.title.slice(0, concatIndex).concat("...")
                : selectedBooth.title}
            </div>
            {selectedBooth.description && (
              <div className="text-xs">
                {selectedBooth.description.length > concatIndex
                  ? selectedBooth.description
                      .slice(0, concatIndex)
                      .concat("...")
                  : selectedBooth.description}
              </div>
            )}
          </div>
        </div>
        <Badge variant={"outline"} className="h-fit px-1.5 rounded-full">
          {selectedBooth.type === "REACT" ? "React" : "HTML/CSS/JS"}
        </Badge>
      </div>
    </div>
  );
}
