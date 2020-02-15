import { Display, Map, RNG } from "rot-js";

const startGame = () => {
  const SIZE = 32;

  var tileSet = document.createElement("img");
  tileSet.src = "preview_env.png";

  const options = {
    layout: "tile",
    bg: "transparent",
    tileWidth: SIZE,
    tileHeight: SIZE,
    tileSet: tileSet,
    tileMap: {
      "*": [13 * SIZE, 6 * SIZE],
      ".": [0, 0]
    },
    width: 25,
    height: 25
  };

  const display = new Display(options);
  document.getElementById("game").appendChild(display.getContainer());

  const digger = new Map.Digger(25, 25, {
    roomHeight: [2, 4],
    roomWidth: [2, 4],
    corridorLength: [2, 4],
    dugPercentage: 0.5
  });
  const freeCells = [];
  const map = {};

  const digCallback = (x, y, value) => {
    if (value) {
      return;
    }

    const key = x + "," + y;
    map[key] = ".";
    freeCells.push(key);
  };

  digger.create(digCallback);

  for (let i = 0; i < 10; i++) {
    const index = Math.floor(RNG.getUniform() * freeCells.length);
    const key = freeCells.splice(index, 1)[0];
    map[key] = "*";
  }

  tileSet.onload = () => {
    for (const key in map) {
      const parts = key.split(",");
      const x = parseInt(parts[0]);
      const y = parseInt(parts[1]);
      display.draw(x, y, map[key]);
    }
  };
};

export default startGame;
