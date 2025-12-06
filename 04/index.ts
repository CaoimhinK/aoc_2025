import { cloneDeep, sumBy } from "lodash";
import { runScriptWithArgs } from "../utils";

const testInput = `..@@.@@@@.
@@@.@.@.@@
@@@@@.@.@@
@.@@@@..@.
@@.@@@@.@@
.@@@@@@@.@
.@.@.@.@@@
@.@@@.@@@@
.@@@@@@@@.
@.@.@@@.@.`;

const countAround = (x: number, y: number, grid: string[][]) => {
  return sumBy(
    [
      [-1, -1],
      [-1, 0],
      [-1, 1],
      [0, -1],
      [0, 1],
      [1, -1],
      [1, 0],
      [1, 1],
    ] as [number, number][],
    ([dx, dy]) => {
      const cy = y + dy;
      const cx = x + dx;

      if (cy < 0 || cx < 0 || cy >= grid.length || cx >= grid[0]!.length) {
        return 0;
      }

      return grid[y + dy]![x + dx] === "@" ? 1 : 0;
    },
  );
};

const printGrid = (grid: string[][]) =>
  `\n${grid.map((line) => line.join("")).join("\n")}\n`;

const findAccessibleRolls = (grid: string[][]) => {
  const accessibleGrid = cloneDeep(grid);

  let accessibleRolls = 0;

  for (let y = 0; y < grid.length; y++) {
    for (let x = 0; x < grid[0]!.length; x++) {
      const content = grid[y]![x];

      if (content !== "@") {
        continue;
      }

      const count = countAround(x, y, grid);

      if (count < 4) {
        accessibleRolls++;

        accessibleGrid[y]![x] = ".";
      }
    }
  }

  return { accessibleRolls, accessibleGrid };
};

const firstPart = (input: string) => {
  const grid = input.split("\n").map((line) => line.split(""));

  console.log(printGrid(grid));

  const { accessibleGrid, accessibleRolls } = findAccessibleRolls(grid);

  console.log(printGrid(accessibleGrid));
  console.log(`Accessible Rolls: ${accessibleRolls}`);
};

const secondPart = (input: string) => {
  let grid = input.split("\n").map((line) => line.split(""));

  console.log(printGrid(grid));

  let rolls = Infinity;

  let totalRemovedRolls = 0;

  while (rolls > 0) {
    const { accessibleGrid, accessibleRolls } = findAccessibleRolls(grid);

    console.log(printGrid(grid));
    console.log(`Accessible Rolls: ${rolls}`);

    grid = accessibleGrid;
    rolls = accessibleRolls;

    totalRemovedRolls += accessibleRolls;
  }

  console.log(`Total removed rolls: ${totalRemovedRolls}`);
};

runScriptWithArgs(firstPart, secondPart, __dirname, testInput);
