import { readFileSync } from "fs";
import path from "path";
import yargs from "yargs";

export const runScriptWithArgs = (
  first: (input: string, test: boolean) => void,
  second: (input: string, test: boolean) => void,
  dirname: string,
  testInput: string | ((part: "1" | "2") => string),
) => {
  const args = yargs(process.argv.slice(2))
    .option("solve", { alias: "s", type: "boolean" })
    .option("part", { alias: "p", type: "string", choices: ["1", "2"] })
    .parseSync();

  const input = args.solve
    ? readFileSync(path.resolve(dirname, "./input.txt"))
    : typeof testInput === "function"
      ? (part: "1" | "2") => Buffer.from(testInput(part))
      : Buffer.from(testInput);

  if (!args.part || args.part === "1") {
    first(
      typeof input === "function" ? input("1").toString() : input.toString(),
      !args.solve,
    );
  }

  if (!args.part || args.part === "2") {
    second(
      typeof input === "function" ? input("2").toString() : input.toString(),
      !args.solve,
    );
  }
};
