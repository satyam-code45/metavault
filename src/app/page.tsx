"use client";

import { EthWallet } from "@/components/ethereumWallet";
import SeedPhrase from "@/components/seed-phrase";
import { SolanaWallet } from "@/components/solanaWallet";
import { RootState } from "@/store/store";
import { useSelector } from "react-redux";

const Page = () => {
  const mnemonicArray = useSelector(
    (state: RootState) => state.seed.seedPhrase
  );

  return (
    <div className="flex flex-col min-h-screen w-full max-w-screen-lg mx-auto px-4 pt-20 items-center justify-start gap-10">
      <SeedPhrase />
      {mnemonicArray && mnemonicArray.length > 0 && (
        <div className="flex flex-col lg:flex-row gap-4 w-full  items-stretch">
          <div className="flex-1 flex flex-col">
            <SolanaWallet />
          </div>

          <div className="flex-1 flex flex-col">
            <EthWallet />
          </div>
        </div>
      )}
    </div>
  );
};

export default Page;
