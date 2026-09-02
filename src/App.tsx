import { useMemo, useState } from "react";
import { HangmanDrawing } from "./components/HangmanDrawing";
import { Keyboard } from "./components/Keyboard";
import "./App.css";

import { generate } from "random-words";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const MAX_WRONG_GUESSES = 10;

function pickRandomWord(): string {
  const word = generate() as string;
  return word.toUpperCase();
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
    <main className="min-h-screen flex items-center justify-center p-4">
      <Card className="w-full max-w-md mx-auto shadow-md">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-lg font-bold ">Hangman Game</CardTitle>
        </CardHeader>
        <section className="board flex items-center">
          <CardContent className="flex flex-col items-center justify-center p-6">
            <HangmanDrawing wrongGuesses={wrongGuesses} />
            <div className="word" aria-label="Hidden word">
              {secretWord.split("").map((letter, index) => (
                <span className="letter" key={`${letter}-${index}`}>
                  {guessedLetters.includes(letter) || hasLost ? letter : "_"}
                </span>
              ))}
            </div>
            <Badge className="status">
              {hasWon && "You won!"}
              {hasLost && `You lost! The word was ${secretWord}.`}
              {!hasWon &&
                !hasLost &&
                `${MAX_WRONG_GUESSES - wrongGuesses} guesses left`}
            </Badge>

            <Keyboard
              guessedLetters={guessedLetters}
              disabled={isGameOver}
              onSelectLetter={guessLetter}
              onReset={resetGame}
            />
          </CardContent>
        </section>
      </Card>
    </main>
  );
}

export default App;
