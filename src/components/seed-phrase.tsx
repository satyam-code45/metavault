import { Button } from "@/components/ui/button";
import { RootState } from "@/store/store";
import { createSeed } from "@/store/store-slice";
import { generateMnemonic } from "bip39";
import { useDispatch, useSelector } from "react-redux";
import { Input } from "./ui/input";
import { useState } from "react";
import { toast } from "sonner";

const SeedPhrase = () => {
  const [seedPhraseProvided, setSeedPhraseProvided] = useState<string | null>(
    ""
  );
  const dispatch = useDispatch();
  const seedPhrase = useSelector((state: RootState) => state.seed.seedPhrase);

  function onSubmit() {
    if (seedPhraseProvided && seedPhraseProvided !== "") {
      const seedPhrase = seedPhraseProvided.trim().split(/\s+/);
      if (seedPhrase.length === 12) {
        dispatch(createSeed({ seedPhrase }));
      } else {
        toast.error("Please provide a valid 12-word seed phrase");
      }
    } else {
      const mn = generateMnemonic();
      dispatch(createSeed({ seedPhrase: mn.split(" ") }));
    }
  }

  const handleCopy = async () => {
    if (seedPhrase.length === 12) {
      await navigator.clipboard.writeText(seedPhrase.join(" "));
      toast.success("Seed phrase copied to clipboard!");
    }
  };

  return (
    <div className="flex flex-col items-center">
      <div className="flex gap-3 flex-col md:flex-row max-w-screen min-w-screen lg:min-w-7xl md:min-w-3xl px-10 lg:px-50 items-center">
        <Input
          placeholder="Enter seed phrase (Leave blank to generate)"
          className="backdrop-blur-2xl md:h-12"
          onChange={(e) => setSeedPhraseProvided(e.target.value)}
        />
        <Button onClick={onSubmit} className="w-fit md:h-12 ">
          Create Seed Phrase
        </Button>
      </div>

      {seedPhrase.length > 0 && (
        <>
          <div
            className="grid grid-flow-col grid-rows-4 md:grid-rows-3 max-w-[500px] gap-4 mt-4 cursor-pointer select-none"
            onClick={handleCopy}
            title="Click to copy seed phrase"
          >
            {seedPhrase.map((word, index) => (
              <div key={index}>
                <div className="px-2 py-2 rounded-md bg-muted text-sm font-mono border w-full text-center">
                  {word}
                </div>
              </div>
            ))}
          </div>
          <p className="text-xs text-muted-foreground mt-2">
            Click anywhere on the seed phrase to copy.
          </p>
        </>
      )}
    </div>
  );
};

export default SeedPhrase;
