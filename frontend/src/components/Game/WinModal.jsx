import "./winModal.css";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import { useState } from "react";

export default function WinModal({ show, onClose, attempts, onSave }) {
  const [playerName, setPlayerName] = useState("");

  function handleSave() {
    onSave(playerName);
    setPlayerName("");
  }

  return (
    <Modal show={show} onHide={onClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>🌟YOU GUESSED CORRECT!🌟</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>
          You guessed the word in <strong>{attempts}</strong>
          {attempts === 1 ? " attempt" : " attempts"}!
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
        <Button
          variant="success"
          onClick={handleSave}
          disabled={playerName.trim() === ""}
        >
          Send to highscore
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
