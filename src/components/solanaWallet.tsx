import { useState } from "react";
import { mnemonicToSeed } from "bip39";
import { derivePath } from "ed25519-hd-key";
import { Keypair } from "@solana/web3.js";
import nacl from "tweetnacl";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { Button } from "./ui/button";
import { Eye, EyeOff, Copy, Check } from "lucide-react";

interface Wallet {
  publicKey: string;
  secretKey: string;
}

export function SolanaWallet() {
  const mnemonicArray = useSelector(
    (state: RootState) => state.seed.seedPhrase
  );

  const mnemonic = mnemonicArray.join(" ");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [wallets, setWallets] = useState<Wallet[]>([]);
  const [visibleKeys, setVisibleKeys] = useState<Record<string, boolean>>({});
  const [copiedKey, setCopiedKey] = useState<{
    pubKey: string;
    type: "public" | "private";
  } | null>(null);
  const [disabledKeys, setDisabledKeys] = useState<
    Record<string, "public" | "private" | null>
  >({});

  const toggleVisibility = (publicKey: string) => {
    setVisibleKeys((prev) => ({
      ...prev,
      [publicKey]: !prev[publicKey],
    }));
  };

  const copyToClipboard = async (
    key: string,
    publicKey: string,
    type: "public" | "private"
  ) => {
    await navigator.clipboard.writeText(key);
    setCopiedKey({ pubKey: publicKey, type });
    setDisabledKeys((prev) => ({ ...prev, [publicKey]: type }));

    setTimeout(() => {
      setCopiedKey(null);
      setDisabledKeys((prev) => ({ ...prev, [publicKey]: null }));
    }, 2000);
  };

  return (
    <div className="w-full flex flex-col grow px-4 py-6 md:p-6 backdrop-blur-xl rounded-xl shadow-md space-y-6 border border-muted text-white">
      <h2 className="text-xl font-semibold text-center">
        Solana Wallet Generator
      </h2>

      <Button
        onClick={async () => {
          const seed = await mnemonicToSeed(mnemonic);
          const path = `m/44'/501'/${currentIndex}'/0'`;
          const derivedSeed = derivePath(path, seed.toString("hex")).key;
          const secret = nacl.sign.keyPair.fromSeed(derivedSeed).secretKey;
          const keypair = Keypair.fromSecretKey(secret);
          setCurrentIndex(currentIndex + 1);
          setWallets((prev) => [
            {
              publicKey: keypair.publicKey.toBase58(),
              secretKey: Buffer.from(secret).toString("hex"),
            },
            ...prev,
          ]);
        }}
        className="w-full h-10 md:h-12 text-sm md:text-base"
      >
        Add Solana Wallet
      </Button>

      <div className="h-[30vh] overflow-y-auto space-y-4">
        {wallets.length === 0 ? (
          <div className="text-sm text-muted-foreground text-center">
            No wallets generated yet.
          </div>
        ) : (
          wallets.map((wallet) => {
            const isVisible = visibleKeys[wallet.publicKey];
            const privateDisplay = isVisible
              ? wallet.secretKey
              : "************";

            const isPublicDisabled =
              disabledKeys[wallet.publicKey] === "public";
            const isPrivateDisabled =
              disabledKeys[wallet.publicKey] === "private";

            const copiedIsPublic =
              copiedKey?.pubKey === wallet.publicKey &&
              copiedKey.type === "public";
            const copiedIsPrivate =
              copiedKey?.pubKey === wallet.publicKey &&
              copiedKey.type === "private";

            return (
              <div
                key={wallet.publicKey}
                className="p-4 border border-muted rounded-lg bg-zinc-800 overflow-x-auto"
              >
                {/* --- Public Key --- */}
                <div className="text-sm font-mono flex flex-wrap justify-between items-center gap-2">
                  <span className="font-bold">Public Key:</span>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() =>
                        copyToClipboard(
                          wallet.publicKey,
                          wallet.publicKey,
                          "public"
                        )
                      }
                      className="hover:text-zinc-300"
                      disabled={isPublicDisabled}
                    >
                      {isPublicDisabled ? (
                        <Check size={18} />
                      ) : (
                        <Copy size={18} />
                      )}
                    </button>
                    {copiedIsPublic && (
                      <span className="text-xs text-green-400">Copied!</span>
                    )}
                  </div>
                </div>
                <div className="text-xs break-all mb-2 font-mono">
                  {wallet.publicKey}
                </div>

                {/* --- Private Key --- */}
                <div className="text-sm font-mono flex flex-wrap justify-between items-center gap-2">
                  <span className="font-bold">Private Key:</span>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => toggleVisibility(wallet.publicKey)}
                      className="hover:text-zinc-300"
                    >
                      {isVisible ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                    <button
                      onClick={() =>
                        copyToClipboard(
                          wallet.secretKey,
                          wallet.publicKey,
                          "private"
                        )
                      }
                      className="hover:text-zinc-300"
                      disabled={isPrivateDisabled}
                    >
                      {isPrivateDisabled ? (
                        <Check size={18} />
                      ) : (
                        <Copy size={18} />
                      )}
                    </button>
                    {copiedIsPrivate && (
                      <span className="text-xs text-green-400">Copied!</span>
                    )}
                  </div>
                </div>
                <div className="text-xs break-all font-mono mt-1 min-h-[1.5rem]">
                  {privateDisplay}
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
