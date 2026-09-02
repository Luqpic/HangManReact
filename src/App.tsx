import { useMemo, useState } from "react";
import { HangmanDrawing } from "./components/HangmanDrawing";
import { Keyboard } from "./components/Keyboard";
import "./App.css";

import { generate } from "random-words";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertTitle } from "@/components/ui/alert";
import logo from "./assets/logo.svg";

const MAX_WRONG_GUESSES = 6;
const MIN_WORD_LENGTH = 3;
const MAX_WORD_LENGTH = 10;
const WINS_PER_LEVEL = 3;

function pickRandomWord(wordLength: number): string {
  const word = generate({ maxLength: wordLength }) as string;
  return word.toUpperCase();
}

function App() {
  const [wordLength, setWordLength] = useState(MIN_WORD_LENGTH);
  const [streak, setStreak] = useState(0);
  const [secretWord, setSecretWord] = useState<string>(() =>
    pickRandomWord(MIN_WORD_LENGTH),
  );
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
    let nextWordLength = wordLength;
    if (hasWon) {
      const nextStreak = streak + 1;
      if (nextStreak >= WINS_PER_LEVEL) {
        nextWordLength = Math.min(wordLength + 1, MAX_WORD_LENGTH);
        setStreak(0);
      } else {
        setStreak(nextStreak);
      }
      setWordLength(nextWordLength);
    } else if (hasLost) {
      setStreak(0);
    }
    setSecretWord(pickRandomWord(nextWordLength));
    setGuessedLetters([]);
  };
  const isMaxLevel = wordLength >= MAX_WORD_LENGTH;
  return (
    <main className="min-h-screen flex items-center justify-center p-4 bg-gray-50">
      <Card className="w-full max-w-md mx-auto shadow-md">
        <CardHeader className="flex flex-row items-center justify-center space-y-0 pb-2 gap-3">
          <img src={logo} alt="logo" className="w-20 h-20" />
          <CardTitle className="text-lg font-bold ">Hangman Game</CardTitle>
        </CardHeader>
        <section className="board w-full flex items-center justify-center">
          <CardContent className="flex w-full flex-col items-center justify-center p-6">
            <Alert className="mb-4 w-full text-center flex flex-col items-center justify-center">
              <AlertTitle className="text-center">
                {isMaxLevel
                  ? `Max difficulty reached! Word length: ${wordLength}`
                  : `Level: ${wordLength} letters · Streak ${streak}/${WINS_PER_LEVEL} to next level`}
              </AlertTitle>
            </Alert>
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
