import { useContext } from "react";
import GameContext from "./GameContext";

const useGameContext = () => {
  const context = useContext(GameContext);

  if (!context) {
    throw new Error("Error: no context");
  }

  return context;
};

export default useGameContext;
