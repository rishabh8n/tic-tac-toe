import React from "react";
import Circle from "./Circle";
import Cross from "./Cross";

interface ChoiceProps {
  player1choice: string;
  setPlayer1Choice: (choice: "O" | "X") => void;
  setGameMode: (mode: string) => void;
  setGameStarted: (started: boolean) => void;
}

const Choice: React.FC<ChoiceProps> = ({
  player1choice,
  setPlayer1Choice,
  setGameMode,
  setGameStarted,
}) => {
  return (
    <div className="w-full h-screen flex flex-col justify-center items-center bg-secondary">
      <div className="flex justify-center items-center gap-1">
        <Circle className="text-accent" />
        <Cross className="text-primary" />
      </div>
      <div className="text-primary bg-white text-primary bg-opacity-5 p-3 rounded-lg mt-6 shadow-lg">
        <h2 className="text-center text-lg font-semibold">
          Pick player 1's mark
        </h2>
        <div className="flex mt-2 bg-opacity-100 rounded-md p-1 bg-secondary min-w-[270px]">
          <button
            className={`basis-1/2 flex justify-center items-center p-1 hover:bg-primary hover:text-secondary rounded-md ${
              player1choice === "O"
                ? "bg-primary text-secondary"
                : "bg-secondary text-primary"
            }`}
            onClick={() => setPlayer1Choice("O")}
          >
            <Circle />
          </button>
          <button
            className={`basis-1/2 flex justify-center items-center p-1 hover:bg-primary hover:text-secondary rounded-md ${
              player1choice === "X"
                ? "bg-primary text-secondary"
                : "bg-secondary text-primary"
            }`}
            onClick={() => setPlayer1Choice("X")}
          >
            <Cross />
          </button>
        </div>
        <p className="text-sm text-opacity-60 text-center text-primary mt-2">
          Remember O goes first
        </p>
      </div>
      <div className="mt-6 w-full max-w-[300px]">
        <button
          className="bg-accent text-white font-semibold p-2 w-full rounded-lg border-b-4 border-accent-dark shadow-md hover:border-accent"
          onClick={() => {
            setGameMode("cpu");
            setGameStarted(true);
          }}
        >
          New Game (vs CPU)
        </button>
        <button
          className="bg-primary text-secondary font-semibold p-2 w-full rounded-lg border-b-4 mt-4 shadow-md border-primary-dark hover:border-primary"
          onClick={() => {
            setGameMode("player");
            setGameStarted(true);
          }}
        >
          New Game (vs Player)
        </button>
      </div>
    </div>
  );
};

export default Choice;
