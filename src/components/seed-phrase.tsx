import { Button } from "@/components/ui/button";
import { RootState } from "@/store/store";
import { createSeed } from "@/store/store-slice";
import { generateMnemonic } from "bip39";
import { useDispatch, useSelector } from "react-redux";
const SeedPhrase = () => {
  const dispatch = useDispatch();
  const seedPhrase = useSelector((state: RootState) => state.seed.seedPhrase);
  return (
    <div>
      <Button
        onClick={function () {
          const mn = generateMnemonic();
          console.log(mn);

          dispatch(createSeed({ seedPhrase: mn.split(" ") }));
        }}
      >
        Create Seed Phrase
      </Button>
      <div className="flex flex-wrap gap-2 mt-4">
        {seedPhrase.map((word, index) => (
          <span
            key={index}
            className="px-2 py-1 rounded-md bg-muted text-sm font-mono border"
          >
            {word}
          </span>
        ))}
      </div>
    </div>
  );
};

export default SeedPhrase;
