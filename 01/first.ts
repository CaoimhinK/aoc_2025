interface DialRotation {
  ticks: number;
  direction: "R" | "L";
}

const rotateDial = (currentRotation: number, dialRotation: DialRotation) => {
  if (dialRotation.direction === "L") {
    const newRotation = (currentRotation - dialRotation.ticks) % 100;

    if (newRotation < 0) {
      return 100 + newRotation;
    } else {
      return newRotation;
    }
  } else {
    return (currentRotation + dialRotation.ticks) % 100;
  }
};

const parseRotation = (str: string) => {
  const ticks = parseInt(str.slice(1));
  const direction = str[0];

  if (direction !== "L" && direction !== "R") {
    throw new Error(`DIRECTION IS KAPUTT: direction: ${direction}`);
  }

  return {
    ticks,
    direction: direction as "R" | "L",
    toString: () => `${direction}${ticks}`,
  };
};

export const first = (input: string) => {
  let currentRotation = 50;

  let zeroCounter = 0;

  console.log(`The dial starts pointing at ${currentRotation}`);

  const rotStrings = input.split("\n");

  for (const rotString of rotStrings) {
    const dialRotation = parseRotation(rotString);

    currentRotation = rotateDial(currentRotation, dialRotation);

    console.log(
      `The dial is rotated ${dialRotation} to point at ${currentRotation}.`,
    );

    zeroCounter += currentRotation > 0 ? 0 : 1;
  }

  console.log(`Final Rotation: ${currentRotation}`);

  console.log(`The password is ${zeroCounter}`);
};
