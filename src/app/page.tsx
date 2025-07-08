"use client";

import { EthWallet } from "@/components/ethereumWallet";
import SeedPhrase from "@/components/seed-phrase";
import { SolanaWallet } from "@/components/solanaWallet";

const Page = () => {
  return (
    <div className="flex flex-col min-w-screen mt-40 items-center justify-center">
      <SeedPhrase />
    <div className="flex gap-2">
      <SolanaWallet />
      <EthWallet />
    </div>
    </div>
  );
};

export default Page;
