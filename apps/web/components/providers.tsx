"use client";

import * as React from "react";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { SessionProvider } from "next-auth/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { CodeContext } from "./context/code-context";

const queryClient = new QueryClient();

export function Providers({ children }: { children: React.ReactNode }) {
  const [htmlCode, setHtmlCode] = React.useState<undefined | string>("");
  const [cssCode, setCssCode] = React.useState<undefined | string>("");
  const [jsCode, setJsCode] = React.useState<undefined | string>("");

  return (
    <NextThemesProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
      enableColorScheme
    >
      <SessionProvider>
        <QueryClientProvider client={queryClient}>
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
        </QueryClientProvider>
      </SessionProvider>
    </NextThemesProvider>
  );
}
