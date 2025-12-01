import { readFileSync } from "fs";
import path from "path";
import yargs from "yargs";

import { second } from "./second";
import { first } from "./first";

const args = yargs(process.argv.slice(2))
  .option("test", { alias: "t", type: "boolean" })
  .option("part", { alias: "p", type: "string", choices: ["1", "2"] })
  .parseSync();

const testInput = `L68
L30
R48
L5
R60
L55
L1
L99
R14
L82`;

const input = args.test
  ? Buffer.from(testInput)
  : readFileSync(path.resolve(__dirname, "./input.txt"));

if (!args.part || args.part === "1") {
  first(input.toString());
}

if (!args.part || args.part === "2") {
  second(input.toString());
}
