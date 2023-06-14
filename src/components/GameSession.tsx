import React from "react";

type Props = {};

const gameSessionData = [
  {
    id1: "",
    points: 0,
  },
  {
    id2: "",
    points: 0,
  },
  {
    id3: "",
    points: 0,
  },
  {
    id4: "",
    points: 0,
  },
  {
    id5: "",
    points: 0,
  },
];

// Stan w którym będziemy trzymali:
// 10 stanów [true czy grał w daną lokacje, punkty]
//

export const GameSession = (props: Props) => {
  // sessionStorage.setItem("game", JSON.stringify(gameSession));
  // console.log(JSON.parse(sessionStorage.getItem("game") || "null"));
  // const [gameState, setGameState] = useState([]);

  return (
    <div>
      <h1>Game Session</h1>
    </div>
  );
};
