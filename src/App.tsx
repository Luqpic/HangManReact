import { useMemo, useState } from 'react'
import './App.css'

const WORDS: readonly string[] = ['REACT', 'VITE', 'JAVASCRIPT', 'COMPONENT', 'HOOKS']
const MAX_WRONG_GUESSES = 6

const pickRandomWord = (): string => {
  if (typeof crypto === 'undefined') return WORDS[0]

  const randomBuffer = new Uint32Array(1)
  crypto.getRandomValues(randomBuffer)
  const index = randomBuffer[0] % WORDS.length
  return WORDS[index]
}

function App() {
  const [secretWord, setSecretWord] = useState<string>(() => pickRandomWord())
  const [guessedLetters, setGuessedLetters] = useState<string[]>([])

  const wrongGuesses = useMemo(
    () => guessedLetters.filter((letter) => !secretWord.includes(letter)).length,
    [guessedLetters, secretWord],
  )

  const hasWon = useMemo(
    () => secretWord.split('').every((letter) => guessedLetters.includes(letter)),
    [guessedLetters, secretWord],
  )
  const hasLost = wrongGuesses >= MAX_WRONG_GUESSES

  const alphabet: string[] = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('')

  const guessLetter = (letter: string) => {
    if (hasWon || hasLost || guessedLetters.includes(letter)) return
    setGuessedLetters((current) => [...current, letter])
  }

  const resetGame = () => {
    setSecretWord(pickRandomWord())
    setGuessedLetters([])
  }

  return (
    <main className="app">
      <h1>Hangman Template</h1>
      <p className="subtitle">A simple React starter that you can extend.</p>

      <section className="board">
        <div className="hangman-drawing" aria-label={`Wrong guesses: ${wrongGuesses}`}>
          <div className="base"></div>
          <div className="pole"></div>
          <div className="beam"></div>
          <div className="rope"></div>
          {wrongGuesses >= 1 && <div className="head"></div>}
          {wrongGuesses >= 2 && <div className="body"></div>}
          {wrongGuesses >= 3 && <div className="arm left"></div>}
          {wrongGuesses >= 4 && <div className="arm right"></div>}
          {wrongGuesses >= 5 && <div className="leg left"></div>}
          {wrongGuesses >= 6 && <div className="leg right"></div>}
        </div>

        <div className="word" aria-label="Hidden word">
          {secretWord.split('').map((letter, index) => (
            <span className="letter" key={`${letter}-${index}`}>
              {guessedLetters.includes(letter) || hasLost ? letter : '_'}
            </span>
          ))}
        </div>

        <p className="status">
          {hasWon && 'You won!'}
          {hasLost && `You lost! The word was ${secretWord}.`}
          {!hasWon && !hasLost && `${MAX_WRONG_GUESSES - wrongGuesses} guesses left.`}
        </p>

        <div className="keyboard" aria-label="Letter buttons">
          {alphabet.map((letter) => (
            <button
              key={letter}
              type="button"
              className="key"
              onClick={() => guessLetter(letter)}
              disabled={guessedLetters.includes(letter) || hasWon || hasLost}
            >
              {letter}
            </button>
          ))}
        </div>
      </section>

      <button type="button" className="reset" onClick={resetGame}>
        New Word
      </button>
    </main>
  )
}

export default App
