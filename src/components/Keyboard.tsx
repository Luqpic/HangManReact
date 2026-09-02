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
    <div className="keyboard-container">
      <div className="keyboard" aria-label="Letter buttons">
        {ALPHABET.map((letter) => {
          const isGuessed = guessedLetters.includes(letter);
          return (
            <button
              key={letter}
              type="button"
              className="key"
              onClick={() => onSelectLetter(letter)}
              disabled={isGuessed || disabled}
            >
              {letter}
            </button>
          );
        })}
      </div>

      {onReset && (
        <button type="button" className="reset" onClick={onReset}>
          New Word
        </button>
      )}
    </div>
  );
}
