"use client";

import { Browser } from "@/components/browser";
import { useSidebarOpenContext } from "@/components/context/sidebar/sidebar-context";
import { EditorWrapper } from "@/components/editor";
import { cn } from "@workspace/ui/lib/utils";

export default function BoothPage() {
  const { isOpen } = useSidebarOpenContext();

  return (
    <div className="min-h-screen bg-black p-6">
      <div
        className={cn(
          "mx-auto flex gap-6 h-[calc(100vh-3rem)]",
          isOpen ? "min-w-[1170px]" : "min-w-[1420px]"
        )}
      >
        <div className="flex-1 min-w-0">
          <EditorWrapper />
        </div>
        <div className="flex-1 min-w-0">
          <Browser />
        </div>
      </div>
    </div>
  );
}
