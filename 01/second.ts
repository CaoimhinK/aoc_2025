class Clock {
  rotation: number;
  mod: number;

  constructor(rotation: number) {
    this.rotation = rotation;
    this.mod = 0;
  }

  static parseRotation(str: string) {
    const direction = str[0];
    const ticks = parseInt(str.slice(1));

    if (isNaN(ticks)) {
      throw new Error("Ticks is no valid integer!");
    }

    const returnTicks =
      ticks * (direction === "L" ? -1 : direction === "R" ? 1 : NaN);

    if (isNaN(returnTicks)) {
      throw new Error("Direction is not valid!");
    }

    return returnTicks;
  }

  turn(ticks: number) {
    const newRotation = this.rotation + ticks;
    const clicks =
      newRotation < 0
        ? Math.floor(newRotation / 100)
        : Math.ceil(newRotation / 100);

    this.mod +=
      clicks > 0 ? clicks - 1 : this.rotation === 0 ? clicks + 1 : clicks;

    const thing = newRotation % 100;

    this.rotation = newRotation >= 0 ? thing : thing === 0 ? 0 : 100 + thing;
  }
}

export const second = (input: string) => {
  const clock = new Clock(50);

  let counter = 0;

  console.log(`The dial starts by pointing at ${clock.rotation}`);

  for (const line of input.split("\n")) {
    const ticks = Clock.parseRotation(line);

    const before = clock.mod;

    clock.turn(ticks);

    const after = clock.mod;

    if (clock.rotation === 0) {
      counter++;
    }

    const things = Math.abs(before - after);

    counter += things;

    console.log(
      `The dial is rotated ${line} to point at ${clock.rotation}` +
        (things > 0
          ? `; during this rotation, it points at 0 ${things} times.`
          : "."),
    );
  }

  console.log(clock, `Counter: ${counter}`);
};
