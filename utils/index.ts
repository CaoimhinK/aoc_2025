import { readFileSync } from "fs";
import path from "path";
import yargs from "yargs";

export const runScriptWithArgs = (
  first: (input: string) => void,
  second: (input: string) => void,
  dirname: string,
  testInput: string,
) => {
  const args = yargs(process.argv.slice(2))
    .option("solve", { alias: "s", type: "boolean" })
    .option("part", { alias: "p", type: "string", choices: ["1", "2"] })
    .parseSync();

  const input = args.solve
    ? readFileSync(path.resolve(dirname, "./input.txt"))
    : Buffer.from(testInput);

  if (!args.part || args.part === "1") {
    first(input.toString());
  }

  if (!args.part || args.part === "2") {
    second(input.toString());
  }
};
