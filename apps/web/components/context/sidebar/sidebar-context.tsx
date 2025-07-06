import { createContext, Dispatch, SetStateAction, useContext } from "react";

interface SidebarOpenContextProps {
  isOpen: boolean;
}

export const SidebarOpenContext = createContext<
  SidebarOpenContextProps | undefined
>(undefined);

export function useSidebarOpenContext() {
  const state = useContext(SidebarOpenContext);

  if (state === undefined) {
    throw new Error(
      "useSidebarOpenContext should be used with SidebarOpenContext Provider"
    );
  }

  return state;
}
