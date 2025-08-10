import { createContext, SetStateAction, useContext } from "react";

export interface AppbarProps {
  sideBarOpen: boolean;
  fileTreeOpen: boolean;
  terminalOpen: boolean;
  setSideBarOpen: React.Dispatch<SetStateAction<boolean>>;
  setFileTreeOpen: React.Dispatch<SetStateAction<boolean>>;
  setTerminalOpen: React.Dispatch<SetStateAction<boolean>>;
}

export const AppbarContext = createContext<AppbarProps | undefined>(undefined);

export const useAppbarContext = () => {
  const data = useContext(AppbarContext);

  if (!data) {
    throw new Error(
      "useAppBar context should be used withing AppbarContextProvider"
    );
  }

  return data;
};
