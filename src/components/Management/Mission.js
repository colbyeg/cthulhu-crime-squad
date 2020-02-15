import React, { useEffect } from "react";
import startGame from "../../missionGame";

const Mission = ({ dispatch, todos }) => {
  useEffect(startGame, []);

  return (
    <>
      <div id="game"></div>
    </>
  );
};

export default Mission;
