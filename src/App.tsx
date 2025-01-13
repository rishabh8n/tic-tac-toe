import { useState } from "react";
import Choice from "./components/Choice";
import Game from "./components/Game";

function App() {
  const [player1choice, setPlayer1Choice] = useState<"O" | "X">("O");
  const [gameStarted, setGameStarted] = useState(false);
  const [gameMode, setGameMode] = useState("cpu");
  return (
    <>
      {gameStarted ? (
        <Game
          gameMode={gameMode}
          player1choice={player1choice}
          setGameStarted={setGameStarted}
        />
      ) : (
        <Choice
          player1choice={player1choice}
          setPlayer1Choice={setPlayer1Choice}
          setGameMode={setGameMode}
          setGameStarted={setGameStarted}
        />
      )}
    </>
  );
}

export default App;
