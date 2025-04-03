import Button from "react-bootstrap/Button";
import Game from "./components/Game/Game";

export default function App() {
  return (
    <Game />
    // <div className="Bg">
    //   <div className="content">
    //     <h1>Wordle look-alike</h1>
    //     <h2>Welcome!</h2>
    //     <p>This is a word guessing game.</p>
    //     <p>Click 'Play game' to try it out!</p>
    //   </div>
    //   <div className="buttons">
    //     <Button variant="info">Info</Button>
    //     <Button variant="success">Play game</Button>
    //     <Button variant="warning">Highscore</Button>
    //   </div>
    // </div>
  );
}
