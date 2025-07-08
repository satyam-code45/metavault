import { useState } from "react";
import { mnemonicToSeed } from "bip39";
import { derivePath } from "ed25519-hd-key";
import { Keypair} from "@solana/web3.js";
import nacl from "tweetnacl";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { Button } from "./ui/button";

interface Wallet {
  publicKey: string;
  secretKey: string;
}

export function SolanaWallet() {
  const mnemonicArray = useSelector(
    (state: RootState) => state.seed.seedPhrase
  );

  const mnemonic = mnemonicArray.join(" ");
  console.log(mnemonic);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [wallets, setWallets] = useState<Wallet[]>([]);

  return (
    <div>
      <Button
        onClick={async function () {
          const seed = await mnemonicToSeed(mnemonic);
          const path = `m/44'/501'/${currentIndex}'/0'`;
          const derivedSeed = derivePath(path, seed.toString("hex")).key;
          const secret = nacl.sign.keyPair.fromSeed(derivedSeed).secretKey;
          const keypair = Keypair.fromSecretKey(secret);
          setCurrentIndex(currentIndex + 1);
          setWallets((prev) => [
            ...prev,
            {
              publicKey: keypair.publicKey.toBase58(),
              secretKey: Buffer.from(secret).toString("hex"),
            },
          ]);
        }}
      >
        Add wallet
      </Button>
      {wallets.map((p) => (
        <div key={p.publicKey} className="flex felx-col"> 
            <span>Public Key: {p.publicKey}</span>
            <span>Private Key: {p.secretKey}</span>
        </div>
      ))}
    </div>
  );
}
