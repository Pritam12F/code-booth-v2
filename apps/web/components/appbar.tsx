"use client";

import {
  FileText,
  Folder,
  LogOut,
  Moon,
  Play,
  Share2,
  Terminal,
  User,
} from "lucide-react";
import { Logo } from "./navbar";
import { Badge } from "@workspace/ui/components/badge";
import { Button } from "@workspace/ui/components/button";
import { useAppbarContext } from "./context/appbar/appbar-context";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@workspace/ui/components/dropdown-menu";
import { Dispatch, SetStateAction, useState } from "react";
import { signOut } from "next-auth/react";

export const AppBar = () => {
  const { setSideBarOpen, setFileTreeOpen, setTerminalOpen } =
    useAppbarContext();
  const [isUserDropDownOpen, setIsUserDropDownOpen] = useState(false);

  return (
    <div className="w-full flex border-b justify-between">
      <div className="relative py-4 px-10">
        <Logo />
        <p className="absolute mt-[2px] tracking-wide inset-0 left-[95px] top-[40px] text-xs text-muted-foreground font-medium">
          Personal IDE
        </p>
      </div>
      <div className="flex items-center space-x-10 translate-x-18">
        <Folder
          onClick={() => setSideBarOpen((prev) => !prev)}
          className="w-8 h-8 hover:bg-gray-800 p-2 rounded-lg cursor-pointer transition-all duration-200"
        />
        <FileText
          onClick={() => setFileTreeOpen((prev) => !prev)}
          className="w-8 h-8 hover:bg-gray-800 p-2 rounded-lg cursor-pointer transition-all duration-200"
        />
        <Terminal
          onClick={() => setTerminalOpen((prev) => !prev)}
          className="w-8 h-8 hover:bg-gray-800 p-2 rounded-lg cursor-pointer transition-all duration-200"
        />
      </div>
      <div className="flex items-center mx-5 space-x-4">
        <Moon className="w-8 h-8 hover:bg-gray-800 p-2 rounded-lg cursor-pointer transition-all duration-200" />
        <div className="w-px h-6 bg-border" />
        <Badge variant={"secondary"}>HTML/CSS/JS</Badge>
        <Button className="bg-gradient-to-br from-green-600 to-green-500 text-gray-100 cursor-pointer">
          <Play />
          <div>Run Code</div>
        </Button>
        <Share2 className="w-8 h-8 hover:bg-gray-800 p-2 rounded-lg cursor-pointer transition-all duration-200" />
        <UserDropdown
          setIsOpen={setIsUserDropDownOpen}
          isOpen={isUserDropDownOpen}
        >
          <User className="w-8 h-8 hover:bg-gray-800 p-2 rounded-lg cursor-pointer transition-all duration-200" />
        </UserDropdown>
      </div>
    </div>
  );
};

function UserDropdown({
  children,
  isOpen,
  setIsOpen,
}: {
  children: React.ReactNode;
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
}) {
  return (
    <DropdownMenu
      open={isOpen}
      onOpenChange={(e) => {
        setIsOpen(e);
      }}
    >
      <DropdownMenuTrigger onClick={() => setIsOpen(true)}>
        {children}
      </DropdownMenuTrigger>
      <DropdownMenuContent className="mx-2">
        <DropdownMenuItem
          onClick={() => {
            signOut();
            localStorage.removeItem("cd-token");
          }}
          className="cursor-pointer space-x-1 flex items-center"
        >
          <LogOut />
          <div>Log Out</div>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
