import { runScriptWithArgs } from "../utils";

const bold = (str: unknown) => {
  return `\x1b[1m${str}\x1b[0m`;
};

const firstPart = (input: string) => {
  const banks = input
    .split("\n")
    .map((bank) => bank.split("").map((thing) => parseInt(thing)));

  console.log(banks);

  let totalJoltage = 0;

  for (const bank of banks) {
    let firstBattery: number = NaN;
    let secondBattery: number = NaN;

    for (const [index, value] of bank.entries()) {
      if (isNaN(firstBattery)) {
        firstBattery = value;
        continue;
      }

      if (index < bank.length - 1 && firstBattery < value) {
        firstBattery = value;
        secondBattery = NaN;
        continue;
      }

      if (!secondBattery) {
        secondBattery = value;
        continue;
      }

      if (secondBattery < value) {
        secondBattery = value;
      }
    }

    console.log(`Joltage: ${firstBattery}${secondBattery}`);

    totalJoltage += firstBattery * 10 + secondBattery;
  }

  console.log(`Total Joltage: ${totalJoltage}`);
};

const secondPart = (input: string) => {
  console.log("Not yet solved :/");
};

const testInput = `987654321111111
811111111111119
234234234234278
818181911112111`;

runScriptWithArgs(firstPart, secondPart, __dirname, testInput);
