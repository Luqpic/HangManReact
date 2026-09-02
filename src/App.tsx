import { useMemo, useState } from "react";
import { HangmanDrawing } from "./components/HangmanDrawing";
import { Keyboard } from "./components/Keyboard";
import "./App.css";

const WORDS: readonly string[] = [
  "REACT",
  "VITE",
  "JAVASCRIPT",
  "COMPONENT",
  "HOOKS",
];
const MAX_WRONG_GUESSES = 6;

function pickRandomWord(): string {
  const randomIndex = Math.floor(Math.random() * WORDS.length);
  return WORDS[randomIndex];
}

function App() {
  const [secretWord, setSecretWord] = useState<string>(() => pickRandomWord());
  const [guessedLetters, setGuessedLetters] = useState<string[]>([]);
  const wrongGuesses = useMemo(
    () =>
      guessedLetters.filter((letter) => !secretWord.includes(letter)).length,
    [guessedLetters, secretWord],
  );
  const hasWon = useMemo(
    () =>
      secretWord.split("").every((letter) => guessedLetters.includes(letter)),
    [guessedLetters, secretWord],
  );
  const hasLost = wrongGuesses >= MAX_WRONG_GUESSES;
  const isGameOver = hasWon || hasLost;
  const guessLetter = (letter: string) => {
    if (isGameOver || guessedLetters.includes(letter)) return;
    setGuessedLetters((current) => [...current, letter]);
  };
  const resetGame = () => {
    setSecretWord(pickRandomWord());
    setGuessedLetters([]);
  };
  return (
    <main className="app">
      <h1>Hangman Template</h1>
      <p className="subtitle">A simple React starter that you can extend.</p>
      <section className="board">
        {/* Separated Drawing Component */}
        <HangmanDrawing wrongGuesses={wrongGuesses} />
        <div className="word" aria-label="Hidden word">
          {secretWord.split("").map((letter, index) => (
            <span className="letter" key={`${letter}-${index}`}>
              {guessedLetters.includes(letter) || hasLost ? letter : "_"}
            </span>
          ))}
        </div>
        <p className="status">
          {hasWon && "You won!"}
          {hasLost && `You lost! The word was ${secretWord}.`}
          {!hasWon &&
            !hasLost &&
            `${MAX_WRONG_GUESSES - wrongGuesses} guesses left.`}
        </p>

        <Keyboard
          guessedLetters={guessedLetters}
          disabled={isGameOver}
          onSelectLetter={guessLetter}
          onReset={resetGame}
        />
      </section>
    </main>
  );
}

export default App;
