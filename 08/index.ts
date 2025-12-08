import { includes, keys, map, reduce, sortBy, values } from "lodash";
import { runScriptWithArgs } from "../utils";

interface DistanceObj {
  v1: Vector3;
  v2: Vector3;
  distance: number;
}

interface Vector3 {
  x: number;
  y: number;
  z: number;
  toString: () => string;
}

const createVector = (x: number, y: number, z: number): Vector3 => {
  return { x, y, z, toString: () => `(${x},${y},${z})` };
};

const distance = (v1: Vector3, v2: Vector3) => {
  return Math.sqrt(
    (v1.x - v2.x) ** 2 + (v1.y - v2.y) ** 2 + (v1.z - v2.z) ** 2,
  );
};

const testInput = `162,817,812
57,618,57
906,360,560
592,479,940
352,342,300
466,668,158
542,29,236
431,825,988
739,650,466
52,470,668
216,146,977
819,987,18
117,168,530
805,96,715
346,949,466
970,615,88
941,993,340
862,61,35
984,92,344
425,690,689`;

const getSortedDistances = (input: string) => {
  const vecs = input.split("\n").map((line) => {
    const [x, y, z] = line.split(",").map((str) => parseInt(str));

    return createVector(x!, y!, z!);
  });

  const distances: DistanceObj[] = [];

  for (let i = 0; i < vecs.length; i++) {
    for (let j = i + 1; j < vecs.length; j++) {
      const v1 = vecs[i]!;
      const v2 = vecs[j]!;

      const d = distance(v1, v2);

      distances.push({ v1, v2, distance: d });
    }
  }

  return distances.sort((a, b) => a.distance - b.distance);
};

const addEdge = (edge: DistanceObj, neighbours: Record<string, string[]>) => {
  const { v1, v2 } = edge;

  const ary = neighbours[`${v1}`];

  if (ary) {
    ary.push(`${v2}`);
  } else {
    neighbours[`${v1}`] = [`${v2}`];
  }

  const ary2 = neighbours[`${v2}`];

  if (ary2) {
    ary2.push(`${v1}`);
  } else {
    neighbours[`${v2}`] = [`${v1}`];
  }
};

const createNeighboursMap = (distances: DistanceObj[]) => {
  const neighbours: Record<string, string[]> = {};

  for (const edge of distances) {
    addEdge(edge, neighbours);
  }

  return neighbours;
};

const createGraphs = (neighbours: Record<string, string[]>) => {
  const explored: string[] = [];

  const graphs: string[][] = [];

  for (const vertex of keys(neighbours)) {
    if (includes(explored, vertex)) {
      continue;
    }

    const graph: string[] = [];

    const toExplore = [vertex];
    explored.push(vertex);

    while (toExplore.length > 0) {
      const nextToExplore = toExplore.pop()!;

      graph.push(nextToExplore);

      const ns = neighbours[nextToExplore];

      if (!ns) {
        continue;
      }

      for (const n of ns) {
        if (!includes(explored, n)) {
          explored.push(n);
          toExplore.push(n);
        }
      }
    }

    if (graph.length > 0) {
      graphs.push(graph);
    }
  }

  return graphs;
};

const firstPart = (input: string, test: boolean) => {
  const distances = getSortedDistances(input);

  const closest = distances.slice(0, test ? 10 : 1000);

  const neighbours = createNeighboursMap(closest);

  const graphs = createGraphs(neighbours);

  const biggestThree = sortBy(graphs, (graph) => -graph.length)
    .slice(0, 3)
    .map((thing) => thing.length);

  console.log(
    `Result: ${biggestThree[0]! * biggestThree[1]! * biggestThree[2]!}`,
  );
};

const secondPart = (input: string) => {
  console.log("Not solved yet :/");
};

runScriptWithArgs(firstPart, secondPart, __dirname, testInput);
