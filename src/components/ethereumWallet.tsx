import { useState } from "react";
import { mnemonicToSeed } from "bip39";
import { HDNodeWallet } from "ethers";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { Button } from "./ui/button";

interface Wallets {
  publicKey: string;
  secretKey: string;
}

export const EthWallet = () => {
  const mnemonicArray = useSelector(
    (state: RootState) => state.seed.seedPhrase
  );

  const mnemonic = mnemonicArray.join(" ");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [wallets, setWallets] = useState<Wallets[]>([]);

  return (
    <div>
      <Button
        onClick={async () => {
          const seed = await mnemonicToSeed(mnemonic);
          const derivationPath = `m/44'/60'/${currentIndex}'/0/0`;
          const hdNode = HDNodeWallet.fromSeed(seed).derivePath(derivationPath);

          setWallets((prev) => [
            ...prev,
            {
              publicKey: hdNode.address,
              secretKey: hdNode.privateKey,
            },
          ]);

          setCurrentIndex(currentIndex + 1);
        }}
      >
        Add ETH wallet
      </Button>

      <div className="mt-4 space-y-2">
        {wallets.map((w, i) => (
          <div key={i}>
            <div><strong>Public:</strong> {w.publicKey}</div>
            <div><strong>Private:</strong> {w.secretKey}</div>
          </div>
        ))}
      </div>
    </div>
  );
};
