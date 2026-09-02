import { Button } from "@/components/ui/button";

const ALPHABET = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");

interface KeyboardProps {
  guessedLetters: string[];
  disabled?: boolean;
  onSelectLetter: (letter: string) => void;
  onReset?: () => void;
}

export function Keyboard({
  guessedLetters,
  disabled = false,
  onSelectLetter,
  onReset,
}: KeyboardProps) {
  return (
    <div className="flex flex-col items-center gap-4 w-full">
      <div
        className="flex flex-wrap justify-center gap-1.5 max-w-sm"
        aria-label="Letter buttons"
      >
        {ALPHABET.map((letter) => {
          const isGuessed = guessedLetters.includes(letter);
          return (
            <Button
              key={letter}
              type="button"
              variant={isGuessed ? "secondary" : "outline"}
              size="sm"
              className="h-9 w-9 p-0 font-bold uppercase transition-transform active:scale-95"
              onClick={() => onSelectLetter(letter)}
              disabled={isGuessed || disabled}
            >
              {letter}
            </Button>
          );
        })}
      </div>

      {onReset && (
        <Button
          type="button"
          variant="default"
          onClick={onReset}
          className="mt-2 font-semibold cursor-pointer"
        >
          New Word
        </Button>
      )}
    </div>
  );
}
