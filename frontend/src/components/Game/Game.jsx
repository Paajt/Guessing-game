import "./game.css";
import Button from "react-bootstrap/Button";
import { useState } from "react";
import feedback from "../../utils/feedback.js";

async function loadWordsFromTxt() {
  const response = await fetch("/words_eng.txt");
  const text = await response.text();

  const words = text
    .split("\n")
    .map((w) => w.trim())
    .filter((w) => /^[a-zA-Z]+$/.test(w))
    .map((w) => w.toUpperCase());

  return words;
}

export default function Game() {
  const [gameStarted, setGameStarted] = useState(false);
  const [wordLength, setWordLength] = useState(4);
  const [allowDuplicates, setAllowDuplicates] = useState(true);
  const [targetWord, setTargetWord] = useState("");
  const [guess, setGuess] = useState("");
  const [guesses, setGuesses] = useState([]);

  async function startGame(e) {
    e.preventDefault();

    const words = await loadWordsFromTxt();
    console.log("Number of total words loaded:", words.length);

    const filtered = words.filter((word) => {
      if (word.length !== wordLength) return false;
      if (!allowDuplicates) {
        const uniqueLetters = new Set(word);
        if (uniqueLetters.size !== word.length) return false;
      }
      return true;
    });
    console.log("Amount of letters chosen:", wordLength);
    console.log("Allow duplicates?", allowDuplicates);
    console.log("Number of words after filtering:", filtered.length);
    console.log("Preview:", filtered.slice(0, 10));

    if (filtered.length === 0) {
      alert("No words found with chosen settings!");
      return;
    }

    const randomWord = filtered[Math.floor(Math.random() * filtered.length)];

    setTargetWord(randomWord);
    setGameStarted(true);
    console.log("Chosen word:", randomWord);
  }

  function handleGuessSubmit(e) {
    e.preventDefault();

    if (guess.length !== wordLength) {
      alert(`Guess must be exacly ${wordLength} letters.`);
      return;
    }

    const result = feedback(guess.toUpperCase(), targetWord);
    console.log("Guess:", guess.toUpperCase());
    console.log("Feedback:", result);

    setGuesses([...guesses, result]);
    setGuess("");
  }

  return (
    <main className="Bg">
      {!gameStarted ? (
        <form onSubmit={startGame}>
          <h2 className="h2-header">Choose Settings:</h2>

          <label>
            Amount of letters in word:
            <br />
            <strong>{wordLength}</strong> letters <br />
            <input
              type="range"
              min="2"
              max="10"
              value={wordLength}
              onChange={(e) => setWordLength(Number(e.target.value))}
            />
          </label>

          <br />

          <label>
            Allow duplicate letters?
            <input
              type="checkbox"
              checked={allowDuplicates}
              onChange={(e) => setAllowDuplicates(e.target.checked)}
            />
          </label>

          <br />
          <Button variant="success" type="submit">
            Start game
          </Button>
          <div className="buttons">
            <Button variant="info">Info</Button>
            <Button variant="primary">Back to menu</Button>
            <Button variant="warning">Highscore</Button>
          </div>
        </form>
      ) : (
        <div>
          <form onSubmit={handleGuessSubmit}>
            <p>
              Guess the word (<strong>{wordLength} letters</strong>)
            </p>
            <p>
              {allowDuplicates === true
                ? "Duplicate letters is on ✅"
                : "Duplicate letters is off ❌"}
            </p>
            <input
              type="text"
              value={guess}
              onChange={(e) => setGuess(e.target.value.toUpperCase())}
              maxLength={wordLength}
              placeholder="Your guess"
            />
            <p>
              {guess.length === wordLength
                ? `Letters: ${guess.length} ☑️`
                : `Letters: ${guess.length} ⚠️`}
            </p>
            <Button type="submit" variant="primary">
              Guess
            </Button>
          </form>
          {guesses.length >= 0 && (
            <div className="guess-grid">
              {guesses.map((feedbackRow, rowIndex) => (
                <div className="guess-row" key={rowIndex}>
                  {feedbackRow.map((item, i) => (
                    <span key={i} className={`tile ${item.result}`}>
                      {item.letter}
                    </span>
                  ))}
                </div>
              ))}
            </div>
          )}
          <footer>
            <div className="buttons">
              <Button variant="info">Info</Button>
              <Button variant="success"> Play again</Button>
              <Button variant="warning">Highscore</Button>
            </div>
          </footer>
        </div>
      )}
    </main>
  );
}
