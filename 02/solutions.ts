import { sum } from "lodash";

const parseRanges = (input: string) => {
  const rangeParts = input.split(",");

  const ranges = [];

  for (const part of rangeParts) {
    const [startStr, endStr] = part.split("-");

    const start = startStr ? parseInt(startStr) : NaN,
      end = endStr ? parseInt(endStr) : NaN;

    if (isNaN(start) || isNaN(end)) {
      throw new Error("Parsing was not successfull!");
    }

    ranges.push({ start, end });
  }

  return ranges;
};

const checkIfTwice = (i: number) => {
  return i.toString().match(/^(\d+)\1$/);
};

const checkIfRepeats = (i: number) => {
  return i.toString().match(/^(\d+)\1+$$/);
};

const prepare = (
  input: string,
  callback: (i: number, nums: number[]) => void,
) => {
  const ranges = parseRanges(input);

  const nums: number[] = [];

  for (const range of ranges) {
    for (let i = range.start; i <= range.end; i++) {
      callback(i, nums);
    }
  }

  console.log(`Sum: ${sum(nums)}`);
};

export const first = (input: string) => {
  prepare(input, (i, nums) => {
    if (checkIfTwice(i)) {
      console.log(i);
      nums.push(i);
    }
  });
};

export const second = (input: string) => {
  prepare(input, (i, nums) => {
    if (checkIfRepeats(i)) {
      console.log(i);
      nums.push(i);
    }
  });
};
