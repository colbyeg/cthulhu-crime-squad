import { Display, Map, RNG, Scheduler, Engine, DIRS, Path } from "rot-js";

const SIZE = 32;

const tileSet = document.createElement("img");
tileSet.src = "lofi_scifi_v2_trans32x32.png";

const options = {
  layout: "tile",
  bg: "transparent",
  tileWidth: SIZE,
  tileHeight: SIZE,
  tileSet: tileSet,
  tileMap: {
    playerR0: [1 * SIZE, 15 * SIZE],
    playerR1: [2 * SIZE, 15 * SIZE],
    playerR2: [3 * SIZE, 15 * SIZE],
    playerD0: [4 * SIZE, 15 * SIZE],
    playerD1: [5 * SIZE, 15 * SIZE],
    playerD2: [6 * SIZE, 15 * SIZE],
    playerL0: [7 * SIZE, 15 * SIZE],
    playerL1: [8 * SIZE, 15 * SIZE],
    playerL2: [9 * SIZE, 15 * SIZE],
    playerU0: [10 * SIZE, 15 * SIZE],
    playerU1: [11 * SIZE, 15 * SIZE],
    playerU2: [12 * SIZE, 15 * SIZE],
    playerDead: [13 * SIZE, 15 * SIZE],
    pedroR0: [16 * SIZE, 3 * SIZE],
    pedroR1: [17 * SIZE, 3 * SIZE],
    pedroR2: [18 * SIZE, 3 * SIZE],
    pedroD0: [19 * SIZE, 3 * SIZE],
    pedroD1: [20 * SIZE, 3 * SIZE],
    pedroD2: [21 * SIZE, 3 * SIZE],
    pedroL0: [22 * SIZE, 3 * SIZE],
    pedroL1: [23 * SIZE, 3 * SIZE],
    pedroL2: [24 * SIZE, 3 * SIZE],
    pedroU0: [25 * SIZE, 3 * SIZE],
    pedroU1: [26 * SIZE, 3 * SIZE],
    pedroU2: [27 * SIZE, 3 * SIZE],
    mushroom: [2 * SIZE, 79 * SIZE],
    floor0: [9 * SIZE, 63 * SIZE],
    floor1: [9 * SIZE, 64 * SIZE],
    floor2: [9 * SIZE, 65 * SIZE],
    floor3: [9 * SIZE, 66 * SIZE],
    floor4: [8 * SIZE, 63 * SIZE],
    floor5: [8 * SIZE, 64 * SIZE],
    floor6: [8 * SIZE, 65 * SIZE],
    floor7: [8 * SIZE, 66 * SIZE],
    background0: [26 * SIZE, 65 * SIZE],
    background1: [26 * SIZE, 64 * SIZE]
  },
  width: 25,
  height: 25
};

class Game {
  constructor() {
    this.display = null;
    this.map = {};
    this.engine = null;
    this.player = null;
    this.pedro = null;
    this.ananas = null;
    this.turn = 0;
    this.display = new Display(options);
    document.getElementById("game").appendChild(this.display.getContainer());

    this._generateMap();

    const scheduler = new Scheduler.Simple();
    scheduler.add(this.player, true);
    scheduler.add(this.pedro, true);

    this.engine = new Engine(scheduler);
    this.engine.start();
  }

  _generateMap = () => {
    const digger = new Map.Digger(25, 25, {
      roomHeight: [2, 4],
      roomWidth: [2, 4],
      corridorLength: [2, 4],
      dugPercentage: 0.5
    });
    const freeCells = [];

    const digCallback = function(x, y, value) {
      if (value) {
        return;
      }

      const key = x + "," + y;
      const floorTileNumber = RNG.getPercentage();

      let tile =
        floorTileNumber % 25 === 0
          ? 4 + (floorTileNumber % 4)
          : floorTileNumber % 4;

      this.map[key] = ["floor" + tile];
      freeCells.push(key);
    };
    digger.create(digCallback.bind(this));

    this._generateBoxes(freeCells);
    this._drawWholeMap();

    this.player = this._createBeing(Player, freeCells);
    this.pedro = this._createBeing(Pedro, freeCells);
  };

  _createBeing = (what, freeCells) => {
    const index = Math.floor(RNG.getUniform() * freeCells.length);
    const key = freeCells.splice(index, 1)[0];
    const parts = key.split(",");
    const x = parseInt(parts[0]);
    const y = parseInt(parts[1]);
    return new what(x, y, this);
  };

  _generateBoxes = freeCells => {
    for (let i = 0; i < 10; i++) {
      const index = Math.floor(RNG.getUniform() * freeCells.length);
      const key = freeCells.splice(index, 1)[0];
      this.map[key].push("mushroom");
      if (i === 0) {
        this.ananas = key;
      } /* first box contains an ananas */
    }
  };

  _drawWholeMap = () => {
    for (const key in this.map) {
      const parts = key.split(",");
      const x = parseInt(parts[0]);
      const y = parseInt(parts[1]);
      this.display.draw(x, y, this.map[key]);
    }
    for (let x = 0; x < options.width; x++) {
      for (let y = 0; y < options.height; y++) {
        const key = x + "," + y;
        if (!this.map[key]) {
          this.display.draw(x, y, "background0");
        }
      }
    }
  };
}

class Player {
  constructor(x, y, game) {
    this._x = x;
    this._y = y;
    this._game = game;
    this.direction = "D";
    this._draw();
  }

  getSpeed = () => {
    return 100;
  };
  getX = () => {
    return this._x;
  };
  getY = () => {
    return this._y;
  };

  act = () => {
    this._game.engine.lock();
    window.addEventListener("keydown", this);
  };

  handleEvent = e => {
    const code = e.keyCode;
    if (code === 13 || code === 32) {
      this._checkBox();
      return;
    }

    const keyMap = {};
    keyMap[38] = 0;
    // keyMap[33] = 1;
    keyMap[39] = 2;
    // keyMap[34] = 3;
    keyMap[40] = 4;
    // keyMap[35] = 5;
    keyMap[37] = 6;
    // keyMap[36] = 7;

    /* one of numpad directions? */
    if (!(code in keyMap)) {
      return;
    }

    /* is there a free space? */
    const [x, y] = DIRS[8][keyMap[code]];

    if (x === 0) {
      y === 1 ? (this.direction = "D") : (this.direction = "U");
    } else {
      x === 1 ? (this.direction = "R") : (this.direction = "L");
    }

    const newX = this._x + x;
    const newY = this._y + y;
    const newKey = newX + "," + newY;
    if (!(newKey in this._game.map)) {
      return;
    }

    this._game.display.draw(
      this._x,
      this._y,
      this._game.map[this._x + "," + this._y]
    );
    this._x = newX;
    this._y = newY;
    this._game.turn++;
    this._draw();
    window.removeEventListener("keydown", this);
    this._game.engine.unlock();
  };

  _draw = () => {
    for (let x = 0; x < options.width; x++) {
      for (let y = 0; y < options.height; y++) {
        const key = x + "," + y;
        if (!this._game.map[key]) {
          this._game.display.draw(x, y, `background${this._game.turn % 2}`);
        }
      }
    }
    this._game.display.draw(
      this._x,
      this._y,
      this._game.map[this._x + "," + this._y].concat(
        `player${this.direction + (this._game.turn % 3)}`
      )
    );
  };

  _checkBox = () => {
    const key = this._x + "," + this._y;
    if (!this._game.map[key].includes("mushroom")) {
      alert("There is no box here!");
    } else if (key === this._game.ananas) {
      alert("Hooray! You found an ananas and won this game.");
      this._game.engine.lock();
      window.removeEventListener("keydown", this);
    } else {
      alert("This box is empty :-(");
    }
  };
}
class Pedro {
  constructor(x, y, game) {
    this._x = x;
    this._y = y;
    this._game = game;
    this.direction = "D";
    this._draw();
  }

  getSpeed = () => {
    return 100;
  };

  act = () => {
    let x = this._game.player.getX();
    let y = this._game.player.getY();

    const passableCallback = (x, y) => {
      return x + "," + y in this._game.map;
    };
    const astar = new Path.AStar(x, y, passableCallback, { topology: 4 });

    const path = [];
    const pathCallback = (x, y) => {
      path.push([x, y]);
    };
    astar.compute(this._x, this._y, pathCallback);

    path.shift();
    if (path.length < 2) {
      this._game.engine.lock();
      alert("Game over - you were captured by Pedro!");
    } else {
      x = path[0][0];
      y = path[0][1];
      if (this._x - x === 0) {
        y - this._y === 1 ? (this.direction = "D") : (this.direction = "U");
      } else {
        x - this._x === 1 ? (this.direction = "R") : (this.direction = "L");
      }
      this._game.display.draw(
        this._x,
        this._y,
        this._game.map[this._x + "," + this._y]
      );

      this._x = x;
      this._y = y;
      this._draw();
    }
  };

  _draw = () => {
    this._game.display.draw(
      this._x,
      this._y,
      this._game.map[this._x + "," + this._y].concat(
        `pedro${this.direction + (this._game.turn % 3)}`
      )
    );
  };
}
const startGame = () => {
  tileSet.onload = () => {
    new Game();
  };
};

export default startGame;
