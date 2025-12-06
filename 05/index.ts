import { clone, isArray, some, sumBy } from "lodash";
import { runScriptWithArgs } from "../utils";

const testInput = `3-5
10-14
16-20
12-18

1
5
8
11
17
32`;

interface NumberRange {
  from: number;
  to: number;
}

const numberRange = (from: number, to: number): NumberRange => ({ from, to });

const rangeIncludes = (range: NumberRange, n: number) =>
  n >= range.from && n <= range.to;

const firstPart = (input: string) => {
  const [rangesString, idsString] = input.split("\n\n");

  const ranges = rangesString!.split("\n").map((line) => {
    const [from, to] = line.split("-");

    return numberRange(parseInt(from!), parseInt(to!));
  });

  const ids = idsString!.split("\n").map((value) => parseInt(value));

  const freshCount = sumBy(ids, (id) => {
    return some(ranges, (range) => {
      return rangeIncludes(range, id);
    })
      ? 1
      : 0;
  });

  console.log(`Fresh Ingredients: ${freshCount}`);
};

const secondPart = (_input: string) => {
  console.log("Not solved yet :/");
};

runScriptWithArgs(firstPart, secondPart, __dirname, testInput);
