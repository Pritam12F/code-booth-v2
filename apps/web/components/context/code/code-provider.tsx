import { ReactNode, useState } from "react";
import { CodeContext } from "./code-context";

export const CodeContextProvider = ({ children }: { children: ReactNode }) => {
  const [htmlCode, setHtmlCode] = useState<undefined | string>("");
  const [cssCode, setCssCode] = useState<undefined | string>("");
  const [jsCode, setJsCode] = useState<undefined | string>("");

  return (
    <CodeContext.Provider
      value={{
        html: htmlCode,
        css: cssCode,
        javascript: jsCode,
        setHtml: setHtmlCode,
        setCss: setCssCode,
        setJavascript: setJsCode,
      }}
    >
      {children}
    </CodeContext.Provider>
  );
};
