import useGameContext from "context/useGameContext";
import React, { useRef } from "react";
import { Link, useParams } from "react-router-dom";

type Props = {};

export const PlayerView = ({}: Props) => {
  const inputRef = useRef<HTMLInputElement>(null);

  const { gameData, setGameData } = useGameContext();

  const onClick = () => {
    if (inputRef.current) {
      const userName = inputRef.current.value;
      setGameData((prevGameData) => ({
        ...prevGameData,
        user: userName,
      }));
    }
  };

  return (
    <div>
      <p>Player Name</p>
      <br />
      <input className="input" ref={inputRef} id="user" />
      <br />
      <br />
      <Link to={`/table`} className="button" onClick={onClick} id="user">
        Play
      </Link>
    </div>
  );
};

export default PlayerView;
