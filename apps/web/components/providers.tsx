"use client";

import * as React from "react";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { SessionProvider } from "next-auth/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { CodeContextProvider } from "./context/code/code-provider";

const queryClient = new QueryClient();

export function Providers({ children }: { children: React.ReactNode }) {
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
          <CodeContextProvider>{children}</CodeContextProvider>
        </QueryClientProvider>
      </SessionProvider>
    </NextThemesProvider>
  );
}
