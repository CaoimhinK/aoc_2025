import { entries, reduce, sumBy, values } from "lodash";
import { runScriptWithArgs } from "../utils";
import { MinPriorityQueue } from "@datastructures-js/priority-queue";

interface Node {
  value: number;
  edges: Record<number, Node>;
}

const reconstructPath = (cameFrom: Record<number, Node>, currentNode: Node) => {
  const totalPath = [currentNode.value];

  let current: Node | undefined = currentNode;

  while (true) {
    current = cameFrom[current.value];

    if (!current || current.value === 0) {
      break;
    }

    totalPath.unshift(current.value);
  }

  return totalPath;
};

interface Entry {
  cost: number;
  node: Node;
}

const aStar = (start: Node, goal: Node) => {
  const setIncludes: Record<number, boolean> = {};
  setIncludes[start.value] = true;
  const openSet = new MinPriorityQueue<Entry>(
    (entry) => entry.cost,
    [{ cost: 0, node: start }],
  );

  const cameFrom: Record<number, Node> = {};

  const gScore: Record<number, number> = {};
  gScore[start.value] = 0;

  while (!openSet.isEmpty()) {
    const current = openSet.dequeue()!;

    if (current?.node.value === goal.value) {
      return reconstructPath(cameFrom, current.node);
    }

    for (const neighbour of values(current.node.edges)) {
      const tentativeGScore = (gScore[current.node.value] ?? Infinity) + 1;

      if (tentativeGScore < (gScore[neighbour.value] ?? Infinity)) {
        cameFrom[neighbour.value] = current.node;
        gScore[neighbour.value] = tentativeGScore;

        if (
          !openSet.contains((entry) => entry.node.value === neighbour.value)
        ) {
          openSet.enqueue({ cost: tentativeGScore, node: neighbour });
        }
      }
    }
  }
};

const testInput = `[.##.] (3) (1,3) (2) (2,3) (0,2) (0,1) {3,5,4,7}
[...#.] (0,2,3,4) (2,3) (0,4) (0,1,2) (1,2,3,4) {7,5,12,7,2}
[.###.#] (0,1,2,3,4) (0,3,4) (0,1,2,4,5) (1,2) {10,11,11,5,10,5}`;

interface Machine {
  turnOnState: number;
  buttons: number[];
  joltageRequirements: number[];
}

const parseMachine = (line: string): Machine => {
  const parts = line.split(" ");

  const machineState = parts[0]?.slice(1, -1);
  const machineLength = machineState!.length;

  const turnOnState = reduce(
    machineState,
    (acc, light, index) =>
      light === "." ? acc : acc + 2 ** (machineLength - index - 1),
    0,
  );

  const buttons = parts
    .slice(1, -1)
    .map((button) =>
      reduce(
        button.slice(1, -1).split(","),
        (acc, lightIndex) =>
          acc + 2 ** (machineLength - parseInt(lightIndex) - 1),
        0,
      ),
    );

  const joltageRequirements = parts[parts.length - 1]!.slice(1, -1)
    .split(",")
    .map((v) => parseInt(v));

  return {
    turnOnState,
    buttons,
    joltageRequirements,
  };
};

const parseMachines = (input: string) => {
  const lines = input.split("\n");

  return lines.map((line) => parseMachine(line));
};

const createGraph = (machine: Machine) => {
  const graph: Record<number, Node> = { 0: { value: 0, edges: {} } };

  const queue = machine.buttons.map((button) => [0, button]);

  while (queue.length > 0) {
    const [v, button] = queue.pop() as [number, number];

    const newValue = v ^ button;

    let currentNode = graph[v]!;
    let newNode = graph[newValue];

    if (!newNode) {
      newNode = {
        value: newValue,
        edges: {},
      };
      graph[newValue] = newNode;

      queue.push(...machine.buttons.map((button) => [newValue, button]));
    }

    const currentEdge = currentNode.edges[button];
    const newEdge = newNode.edges[button];

    if (!currentEdge) {
      currentNode.edges[button] = newNode;
    }
    if (!newEdge) {
      newNode.edges[button] = currentNode;
    }
  }

  return graph;
};

const firstPart = (input: string) => {
  const machines = parseMachines(input);

  const paths = [];

  for (const machine of machines) {
    const graph = createGraph(machine);

    const path = aStar(graph[0]!, graph[machine!.turnOnState]!);

    paths.push(path);
  }

  console.log(`Min Button Pushes: ${sumBy(paths, (path) => path!.length)}`);
};

const secondPart = (_input: string) => {
  console.log("Not solved yet :/");
};

runScriptWithArgs(firstPart, secondPart, __dirname, testInput);
