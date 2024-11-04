"use client";

import { type ReactNode } from "react";
// import { ThemeProvider, useTheme } from "next-themes";
// import { Toaster } from "sonner";
import { Analytics } from "@vercel/analytics/react";
import { config } from "@/lib/config";
import { WagmiProvider } from "wagmi";
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

const queryClient = new QueryClient()

export default function Providers({ children }: { children: ReactNode }) {
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        {children}
        <Analytics />
      </QueryClientProvider>
    </WagmiProvider>
  );
}