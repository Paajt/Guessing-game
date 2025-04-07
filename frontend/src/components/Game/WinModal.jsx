import "./winModal.css";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import { useState } from "react";
import { formatTime } from "../../utils/formatTime";

export default function WinModal({
  show,
  onClose,
  attempts,
  elapsedTime,
  onSave,
  onPlayAgain,
}) {
  const [playerName, setPlayerName] = useState("");

  const formattedTime =
    elapsedTime !== null && elapsedTime !== undefined
      ? formatTime(elapsedTime)
      : "–";

  function handleSave() {
    onSave(playerName);
    setPlayerName("");
  }

  function handlePlayAgain() {
    onClose();
    onPlayAgain();
  }

  return (
    <Modal
      show={show}
      onHide={handlePlayAgain}
      centered
      backdrop="static"
      dialogClassName="winModal"
    >
      <Modal.Header closeButton>
        <Modal.Title>🌟YOU GUESSED CORRECT!🌟</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>
          You guessed the word in <strong>{attempts}</strong>
          {attempts === 1 ? " attempt" : " attempts"}!
        </p>
        <p>
          Time taken: <strong>{formattedTime}</strong>
        </p>
        <input
          type="text"
          placeholder="Enter your name"
          className="form-control"
          value={playerName}
          onChange={(e) => setPlayerName(e.target.value)}
        />
      </Modal.Body>
      <Modal.Footer>
        <Button variant="success" onClick={handlePlayAgain}>
          Play again
        </Button>
        <Button
          variant="warning"
          onClick={handleSave}
          disabled={playerName.trim() === ""}
        >
          Send to highscore
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
