import { useState } from "react";

export default function Game() {
  const [guess, setGuess] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    console.log("Du gissade:", guess);
    setGuess("");
  }

  return (
    <div>
      <h2>Gissa ordet</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={guess}
          onChange={(e) => setGuess(e.target.value)}
        />
        <button type="submit">Gissa</button>
      </form>
    </div>
  );
}
