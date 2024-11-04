// import Image from "next/image";
"use client";

import { InputPromptOptions } from "@/components/input-prompt-options";
import { WalletConnectComponent } from "@/components/wallet-connect";
import { useAccount } from "wagmi";
import { useEffect, useState } from "react";

export default function Home() {
  const { isConnected } = useAccount();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen font-[family-name:var(--font-geist-sans)] bg-white">
      {/* Main Content */}
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start max-w-[800px] w-full">
        <WalletConnectComponent />
        {mounted && isConnected && <InputPromptOptions />}
      </main>

      {/* Footer */}
      <footer className="row-start-3 w-full py-6 px-8 bg-gradient-to-b from-gray-900 to-black text-white shadow-lg shadow-gray-800">
        <div className="max-w-[800px] w-full mx-auto text-center">
          <div className="text-lg font-semibold">&copy; 2024 Compass AI Lab. All Rights Reserved.</div>
        </div>
      </footer>

      {/* Anime Effects */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="animate-spin-slow w-60 h-60 border-8 border-dashed border-gray-500 rounded-full opacity-10 fixed top-10 left-10"></div>
        <div className="animate-bounce w-40 h-40 bg-gradient-to-r from-gray-600 to-gray-200 rounded-full fixed bottom-20 right-20 opacity-20"></div>
      </div>
    </div>
  );
}