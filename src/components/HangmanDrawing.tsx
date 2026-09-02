interface HangmanDrawingProps {
  wrongGuesses: number;
}

export function HangmanDrawing({ wrongGuesses }: HangmanDrawingProps) {
  return (
    <div
      className="hangman-drawing"
      aria-label={`Wrong guesses: ${wrongGuesses}`}
    >
      <div className="base" />
      <div className="pole" />
      <div className="beam" />
      <div className="rope" />
      {wrongGuesses >= 1 && <div className="head" />}
      {wrongGuesses >= 2 && <div className="body" />}
      {wrongGuesses >= 3 && <div className="arm left" />}
      {wrongGuesses >= 4 && <div className="arm right" />}
      {wrongGuesses >= 5 && <div className="leg left" />}
      {wrongGuesses >= 6 && <div className="leg right" />}
    </div>
  );
}
