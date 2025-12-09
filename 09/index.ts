import { isNull } from "lodash";
import { runScriptWithArgs } from "../utils";

interface Tile {
  x: number;
  y: number;
}

const testInput = `7,1
11,1
11,7
9,7
9,5
2,5
2,3
7,3`;

const spanRect = (tileA: Tile, tileB: Tile) => {
  if (tileA.x === tileB.x || tileA.y === tileB.y) {
    return null;
  }

  return (Math.abs(tileA.x - tileB.x) + 1) * (Math.abs(tileA.y - tileB.y) + 1);
};

const parseTiles = (input: string) => {
  return input.split("\n").map((point): Tile => {
    const [strX, strY] = point.split(",");

    return { x: parseInt(strX!), y: parseInt(strY!) };
  });
};

const firstPart = (input: string) => {
  const tiles = parseTiles(input);

  let biggestArea = 0;

  for (let i = 0; i < tiles.length; i++) {
    for (let j = i + 1; j < tiles.length; j++) {
      const tileA = tiles[i]!;
      const tileB = tiles[j]!;

      const rectArea = spanRect(tileA, tileB);

      console.log(tileA, tileB, rectArea);

      if (isNull(rectArea)) {
        continue;
      }

      if (biggestArea < rectArea) {
        biggestArea = rectArea;
      }
    }
  }

  console.log(`Biggest Rect Area: ${biggestArea}`);
};

const secondPart = (input: string) => {
  console.log("Not solved yet :/");
};

runScriptWithArgs(firstPart, secondPart, __dirname, testInput);
