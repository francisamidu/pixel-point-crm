// components/app-providers.tsx
"use client";

import { ThemeProvider } from "@/components/theme-provider";
import { MenuContextProvider } from "@/contexts/MenuContext";

export function AppProviders({ children }: { children: React.ReactNode }) {
  return (
    <MenuContextProvider>
      <ThemeProvider
        attribute="class"
        defaultTheme="light"
        enableSystem
        disableTransitionOnChange
      >
        {children}
      </ThemeProvider>
    </MenuContextProvider>
  );
}
