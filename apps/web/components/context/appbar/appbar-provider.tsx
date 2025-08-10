import { useState } from "react";
import { AppbarContext } from "./appbar-context";

export const AppbarProvider = ({ children }: { children: React.ReactNode }) => {
  const [sidebarOpen, setSidebarOpen] = useState<boolean>(false);
  const [fileTreeOpen, setFileTreeOpen] = useState<boolean>(false);
  const [terminalOpen, setTerminalOpen] = useState<boolean>(false);

  return (
    <AppbarContext.Provider
      value={{
        sideBarOpen: sidebarOpen,
        fileTreeOpen: fileTreeOpen,
        terminalOpen: terminalOpen,
        setSideBarOpen: setSidebarOpen,
        setFileTreeOpen: setFileTreeOpen,
        setTerminalOpen: setTerminalOpen,
      }}
    >
      {children}
    </AppbarContext.Provider>
  );
};
