import React from "react";
import Circle from "./Circle";
import Cross from "./Cross";

interface CellProps {
  value: string;
  won: boolean;
  onClick: () => void;
}

const Cell: React.FC<CellProps> = ({ value, won, onClick }) => {
  return (
    <button
      className={`flex-1 aspect-square rounded-lg shadow-lg flex justify-center items-center ${
        won ? "bg-primary text-secondary" : "bg-white bg-opacity-5"
      }`}
      onClick={onClick}
    >
      {value ? (
        value === "O" ? (
          <Circle
            className={`${won ? "text-secondary" : "text-accent"} size-10`}
          />
        ) : (
          <Cross
            className={`${won ? "text-secondary" : "text-primary"} size-10`}
          />
        )
      ) : (
        ""
      )}
    </button>
  );
};

export default Cell;
