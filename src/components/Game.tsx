import React, { useEffect, useState } from "react";
import Circle from "./Circle";
import Cross from "./Cross";
import Cell from "./Cell";

type move = "O" | "X" | "";
type Board = move[][];
interface GameProps {
  gameMode: string;
  player1choice: "O" | "X";
  setGameStarted: (started: boolean) => void;
}
const Game: React.FC<GameProps> = ({
  gameMode,
  player1choice,
  setGameStarted,
}) => {
  const [turn, setTurn] = useState<"O" | "X">("O");
  const [board, setBoard] = useState<Board>([
    ["", "", ""],
    ["", "", ""],
    ["", "", ""],
  ]);
  const [winner, setWinner] = useState<"O" | "X" | "draw" | "">("");
  const [winningLine, setWinningLine] = useState<number[][]>([]);
  const [scores, setScores] = useState({ O: 0, X: 0, draw: 0 });

  const allWinningLines = [
    // Rows
    [
      [0, 0],
      [0, 1],
      [0, 2],
    ],
    [
      [1, 0],
      [1, 1],
      [1, 2],
    ],
    [
      [2, 0],
      [2, 1],
      [2, 2],
    ],
    // Columns
    [
      [0, 0],
      [1, 0],
      [2, 0],
    ],
    [
      [0, 1],
      [1, 1],
      [2, 1],
    ],
    [
      [0, 2],
      [1, 2],
      [2, 2],
    ],
    // Diagonals
    [
      [0, 0],
      [1, 1],
      [2, 2],
    ],
    [
      [0, 2],
      [1, 1],
      [2, 0],
    ],
  ];

  const checkWinner: (newBoard: Board) => move | null = (newBoard) => {
    for (const line of allWinningLines) {
      const [[a, b], [c, d], [e, f]] = line;
      if (
        newBoard[a][b] &&
        newBoard[a][b] === newBoard[c][d] &&
        newBoard[a][b] === newBoard[e][f]
      ) {
        setWinningLine(line);
        return newBoard[a][b];
      }
    }
    return null;
  };

  const isGameOver = (newBoard: Board) => {
    const winner: move | null = checkWinner(newBoard);
    if (winner) {
      setWinner(winner);
      return true;
    }
    for (let i = 0; i < 3; i++) {
      if (newBoard[i].includes("")) return false;
    }
    setWinner("draw");
    return true;
  };

  const cpuMove = () => {
    const emptyCells: number[][] = [];
    board.forEach((row, i) => {
      row.forEach((cell, j) => {
        if (!cell) emptyCells.push([i, j]);
      });
    });
    const randomCell =
      emptyCells[Math.floor(Math.random() * emptyCells.length)];

    handleClick(randomCell[0], randomCell[1]);
  };

  useEffect(() => {
    if (gameMode === "cpu" && turn !== player1choice && !winner) {
      console.log("cpu turn");
      console.log(turn);
      cpuMove();
    }
  }, [turn, board]);

  const handleClick = (i: number, j: number) => {
    if (board[i][j] || winner) return;
    const newBoard = board.map((row) => [...row]);
    newBoard[i][j] = turn;
    setBoard(newBoard);
    setTurn(turn === "O" ? "X" : "O");
    if (isGameOver(newBoard)) {
      const winner = checkWinner(newBoard);
      if (!winner) {
        setScores((prevScores) => {
          return {
            ...prevScores,
            draw: prevScores.draw + 1,
          };
        });
        return;
      }
      setScores((prevScores) => {
        return {
          ...prevScores,
          [winner]: prevScores[winner] + 1,
        };
      });
    }
  };

  return (
    <div className="w-full min-h-screen flex flex-col justify-center items-center bg-secondary">
      <div className="flex justify-between items-center gap-1 w-full max-w-[400px]">
        <div className="flex justify-center items-center gap-1">
          <Circle className="text-accent" />
          <Cross className="text-primary" />
        </div>
        <div className="flex justify-center items-center gap-2 text-primary bg-white bg-opacity-5 py-2 px-3 rounded-lg shadow-lg">
          {turn === "O" ? (
            <Circle className="text-primary size-6" />
          ) : (
            <Cross className="text-primary" />
          )}
          <span className="uppercase text-lg font-bold">turn</span>
        </div>
        <button
          className="text-secondary bg-primary p-2 rounded-lg border-b-4 border-primary-dark"
          onClick={() => {
            setGameStarted(false);
          }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="lucide lucide-rotate-cw"
          >
            <path d="M21 12a9 9 0 1 1-9-9c2.52 0 4.93 1 6.74 2.74L21 8" />
            <path d="M21 3v5h-5" />
          </svg>
        </button>
      </div>
      <div className="board w-full max-w-[400px] mt-6">
        {
          // @ts-ignore
          board.map((row, i) => (
            <div key={i} className="row flex gap-6 justify-between mt-6">
              {
                // @ts-ignore
                row.map((cell, j) => (
                  <Cell
                    key={j}
                    value={cell}
                    won={winningLine.some(
                      (line) => line[0] === i && line[1] === j
                    )}
                    onClick={() => {
                      handleClick(i, j);
                    }}
                  />
                ))
              }
            </div>
          ))
        }
      </div>
      <div className="flex justify-between items-center gap-6 mt-6 w-full max-w-[400px]">
        <div className="bg-accent text-secondary p-2 rounded-lg flex-grow basis-[33%] flex justify-center items-center flex-col uppercase">
          <p className="text-sm">
            O ({player1choice === "O" ? "you" : gameMode})
          </p>
          <p className="font-bold text-xl">{scores.O}</p>
        </div>
        <div className="bg-white bg-opacity-50 text-secondary p-2 rounded-lg flex-grow basis-[33%] flex justify-center items-center flex-col uppercase">
          <p className="text-sm">ties</p>
          <p className="font-bold text-xl">{scores.draw}</p>
        </div>
        <div className="bg-primary text-secondary p-2 rounded-lg flex-grow basis-[33%] flex justify-center items-center flex-col uppercase">
          <p className="text-sm">
            X ({player1choice === "O" ? gameMode : "you"})
          </p>
          <p className="font-bold text-xl">{scores.X}</p>
        </div>
      </div>
      {winner && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="w-full bg-secondary bg-opacity-100 text-primary p-6 shadow-lg">
            <p className="text-center text-sm font-semibold uppercase">
              {winner === "draw" ? "draw" : "You won"}
            </p>
            <h2 className="flex justify-center items-center gap-4 text-2xl font-bold uppercase text-accent">
              {winner === "draw" ? (
                <span>It's a draw</span>
              ) : winner === "O" ? (
                <>
                  <Circle className="size-12" /> <span>takes the round</span>
                </>
              ) : (
                <>
                  <Cross className="size-12" /> <span>takes the round</span>
                </>
              )}
            </h2>
            <div className="flex justify-center items-center gap-4 mt-6">
              <button
                className="bg-primary text-secondary py-2 px-6 font-semibold rounded-lg uppercase border-b-4 border-primary-dark shadow-md hover:border-primary"
                onClick={() => setGameStarted(false)}
              >
                Quit
              </button>
              <button
                className="bg-accent text-white py-2 px-6 font-semibold rounded-lg uppercase border-b-4 border-accent-dark shadow-md hover:border-accent"
                onClick={() => {
                  setBoard([
                    ["", "", ""],
                    ["", "", ""],
                    ["", "", ""],
                  ]);
                  setTurn("O");
                  setWinner("");
                  setWinningLine([]);
                }}
              >
                Next Round
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Game;
