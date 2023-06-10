import React, { useState } from "react";

export const Button = ({ error }: any) => {
  const [isActive, setIsActive] = useState(false);

  const handleClick = () => {
    console.log("nothing");
    setIsActive((current) => !current);
  };
  return (
    <>
      <button
        onClick={handleClick}
        style={{ backgroundColor: isActive ? "red" : "" }}
      >
        {!error ? "Click me!" : "Blocked"}
      </button>
    </>
  );
};
