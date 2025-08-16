import { Booth } from "@workspace/db";
import { Badge } from "@workspace/ui/components/badge";
import { MoreHorizontal } from "lucide-react";
import React from "react";

export default function BoothCard({
  selectedBooth,
  type,
  handleBoothChange,
}: {
  selectedBooth: Booth;
  type?: "OWNED" | "ASSIGNED";
  handleBoothChange?: (booth: Booth) => void;
}) {
  const concatIndex = selectedBooth?.type === "REACT" ? 16 : 10;
  return (
    <div
      onClick={() => handleBoothChange?.(selectedBooth)}
      className="flex bg-[#18181b] mt-4 justify-between rounded-md p-4 h-[70px]"
    >
      <div className="flex">
        <div className="text-3xl flex items-center">
          {selectedBooth?.icon ?? ""}
        </div>
        <div className="mx-2">
          <div className="text-sm font-semibold">
            {selectedBooth?.title.length > concatIndex
              ? selectedBooth?.title.slice(0, concatIndex).concat("...")
              : selectedBooth?.title}
          </div>
          {selectedBooth?.description && (
            <div className="text-xs">
              {selectedBooth?.description.length > concatIndex
                ? selectedBooth?.description.slice(0, concatIndex).concat("...")
                : selectedBooth?.description}
            </div>
          )}
        </div>
      </div>
      <div className="flex items-center">
        <Badge variant={"outline"} className="h-fit px-1.5 rounded-full">
          {selectedBooth?.type === "REACT" ? "React" : "HTML/CSS/JS"}
        </Badge>
        {type === "OWNED" && (
          <MoreHorizontal className="h-6.5 w-6.5 rounded-lg ml-3 cursor-pointer hover:bg-gray-900 p-1" />
        )}
      </div>
    </div>
  );
}
