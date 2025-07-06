import { createContext, useContext } from "react";

interface CodeProps {
  html?: string;
  css?: string;
  javascript?: string;
  setHtml: React.Dispatch<React.SetStateAction<string | undefined>>;
  setCss: React.Dispatch<React.SetStateAction<string | undefined>>;
  setJavascript: React.Dispatch<React.SetStateAction<string | undefined>>;
}

export const CodeContext = createContext<CodeProps | undefined>(undefined);

export function useCodeContext() {
  const code = useContext(CodeContext);

  if (!code) {
    throw new Error("useCodeContext must be used with CodeContext.Provider");
  }

  return code;
}
