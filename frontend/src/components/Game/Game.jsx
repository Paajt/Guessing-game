import "./game.css";
import Button from "react-bootstrap/Button";
import { useState, useEffect, useRef } from "react";
import feedback from "../../utils/feedback.js";
import WinModal from "./WinModal.jsx";

export default function Game() {
  //useState
  const [gameStarted, setGameStarted] = useState(false);
  const [wordLength, setWordLength] = useState(4);
  const [allowDuplicates, setAllowDuplicates] = useState(false);
  const [targetWord, setTargetWord] = useState("");
  const [guess, setGuess] = useState("");
  const [guesses, setGuesses] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [attempts, setAttempts] = useState(0);
  const [startTime, setStartTime] = useState(null);
  const [elapsedTime, setElapsedTime] = useState(null);
  const [guessError, setGuessError] = useState("");

  //useRef
  const guessGridRef = useRef(null);

  //useEffect
  useEffect(() => {
    if (elapsedTime !== null) {
      setShowModal(true);
    }
  }, [elapsedTime]);

  useEffect(() => {
    if (guessGridRef.current) {
      guessGridRef.current.scrollTop = guessGridRef.current.scrollHeight;
    }
  }, [guesses]);

  async function startGame(e) {
    e.preventDefault();

    try {
      const res = await fetch(
        `/api/word?length=${wordLength}&duplicates=${allowDuplicates}`
      );
      const data = await res.json();

      if (!data.word) {
        alert("No word returned from server!");
        return;
      }

      setTargetWord(data.word);
      setGameStarted(true);
      setStartTime(Date.now());
      setElapsedTime(null);

      console.log("Fetched word:", data.word);
    } catch (err) {
      console.error("Failed to fetch word:", err);
      alert("Could not start game - check connection to backend!");
    }
  }

  //   const words = await loadWordsFromTxt();
  //   console.log("Number of total words loaded:", words.length);

  //   const filtered = words.filter((word) => {
  //     if (word.length !== wordLength) return false;
  //     if (!allowDuplicates) {
  //       const uniqueLetters = new Set(word);
  //       if (uniqueLetters.size !== word.length) return false;
  //     }
  //     return true;
  //   });
  //   console.log("Amount of letters chosen:", wordLength);
  //   console.log("Allow duplicates?", allowDuplicates);
  //   console.log("Number of words after filtering:", filtered.length);
  //   console.log("Preview:", filtered.slice(0, 10));

  //   if (filtered.length === 0) {
  //     alert("No words found with chosen settings!");
  //     return;
  //   }

  //   const randomWord = filtered[Math.floor(Math.random() * filtered.length)];

  //   setTargetWord(randomWord);
  //   setGameStarted(true);
  //   console.log("Chosen word:", randomWord);

  //   setStartTime(Date.now());
  //   setElapsedTime(null);
  // }

  function handleGuessSubmit(e) {
    e.preventDefault();

    if (guess.length !== wordLength) {
      setGuessError(`Guess must be exactly ${wordLength} letters`);
      return;
    }

    if (!/^[A-Z]+$/.test(guess)) {
      setGuessError("Only letters A-Z are allowed!");
      return;
    }

    setGuessError("");

    const result = feedback(guess.toUpperCase(), targetWord);
    console.log("Guess:", guess.toUpperCase());
    console.log("Feedback:", result);

    const updatedGuesses = [...guesses, result];
    setGuesses(updatedGuesses);
    setAttempts(updatedGuesses.length);

    setGuess("");

    if (result.every((item) => item.result === "correct")) {
      const endTime = Date.now();
      const duration = Math.floor((endTime - startTime) / 1000);
      setElapsedTime(duration);
    }
  }

  function handleSaveHighscore(name) {
    fetch("/api/highscore", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name,
        attempts,
        time: elapsedTime,
        wordLength,
        allowDuplicates,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log("Highscore saved!", data);
      })
      .catch((err) => {
        console.error("Error saving highscore:", err);
      });

    setShowModal(false);
    resetGame();
  }

  function resetGame() {
    setGameStarted(false);
    setTargetWord("");
    setGuess("");
    setGuesses([]);
    setAttempts(0);
    setAllowDuplicates(false);
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
            <a href="/highscores" className="btn btn-warning" id="btn-warning">
              Highscores
            </a>
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
            {guessError && <p className="guess-error">{guessError}</p>}
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
            <div className="guess-grid" ref={guessGridRef}>
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
              <Button variant="success" onClick={resetGame}>
                Play again
              </Button>
              <a
                href="/highscores"
                className="btn btn-warning"
                id="btn-warning"
              >
                Highscores
              </a>
            </div>
          </footer>
        </div>
      )}
      <WinModal
        show={showModal}
        onClose={() => setShowModal(false)}
        attempts={attempts}
        elapsedTime={elapsedTime}
        allowDuplicates={allowDuplicates}
        onSave={handleSaveHighscore}
        onPlayAgain={resetGame}
      />
    </main>
  );
}
