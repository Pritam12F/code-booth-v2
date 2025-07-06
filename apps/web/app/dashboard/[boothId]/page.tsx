"use client";

import { Browser } from "@/components/browser";
import { useSidebarOpenContext } from "@/components/context/sidebar/sidebar-context";
import { EditorWrapper } from "@/components/editor";

export default function BoothPage() {
  const { isOpen } = useSidebarOpenContext();

  return (
    <div
      className={`w-${isOpen ? "[1215px]" : "screen"} space-x-${isOpen ? "28" : "3"} h-screen flex justify-center`}
    >
      <EditorWrapper />
      <Browser />
    </div>
  );
}
