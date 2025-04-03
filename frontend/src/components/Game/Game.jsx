import "./game.css";
import Button from "react-bootstrap/Button";
import { useState } from "react";

export default function Game() {
  // const [guess, setGuess] = useState("");
  const [gameStarted, setGameStarted] = useState(false);
  const [wordLength, setWordLength] = useState(4);
  const [allowDuplicates, setAllowDuplicates] = useState(true);

  function startGame(e) {
    e.preventDefault();
    console.log("Game settings:");
    console.log("Letters:", wordLength);
    console.log("Duplicates?", allowDuplicates);
    setGameStarted(true);
  }

  // function handleSubmit(e) {
  //   e.preventDefault();
  //   console.log("Du gissade:", guess);
  //   setGuess("");
  // }

  return (
    <div>
      {!gameStarted ? (
        <form onSubmit={startGame}>
          <h2>Choose Settings:</h2>

          <label>
            Amount of letters in word: {wordLength} letters
            <input
              type="range"
              min="2"
              max="8"
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
        </form>
      ) : (
        <p>Game below here</p>
      )}
    </div>
  );
}
