import { DirectedGraph, Graph } from "@datastructures-js/graph";
import { runScriptWithArgs } from "../utils";

const breadthFirstSearch = (
  graph: Graph<string, string>,
  root: string,
  goal: string,
  ignore?: string[],
) => {
  const pathsToCheck: string[][] = [[root]];

  const finishedPaths: string[][] = [];

  while (pathsToCheck.length > 0) {
    const path = pathsToCheck.pop()!;

    const lastNode = path[path.length - 1]!;

    for (const neighbour of graph.getConnectedVertices(lastNode)) {
      if (ignore?.includes(neighbour)) {
        continue;
      }

      if (neighbour === goal) {
        finishedPaths.push(path.concat([neighbour]));
        continue;
      }

      if (!path.includes(neighbour)) {
        pathsToCheck.push(path.concat([neighbour]));
      }
    }
  }

  return finishedPaths;
};

const testInput = (part: "1" | "2") =>
  ({
    "1": `aaa: you hhh
you: bbb ccc
bbb: ddd eee
ccc: ddd eee fff
ddd: ggg
eee: out
fff: out
ggg: out
hhh: ccc fff iii
iii: out`,
    "2": `svr: aaa bbb
aaa: fft
fft: ccc
bbb: tty
tty: ccc
ccc: ddd eee
ddd: hub
hub: fff
eee: dac
dac: fff
fff: ggg hhh
ggg: out
hhh: out`,
  })[part];

const createGraph = (input: string) => {
  const lines = input.split("\n");

  const verticesWithEdges = lines.map((line) => {
    const [vertexRaw, ...connections] = line.split(" ");
    const vertex = vertexRaw!.slice(0, -1);

    return {
      vertex,
      connections,
    };
  });

  const graph = new DirectedGraph<string, string>();

  for (const { vertex } of verticesWithEdges) {
    graph.addVertex(vertex, vertex);
  }

  graph.addVertex("out", "out");

  for (const { vertex, connections } of verticesWithEdges) {
    for (const connection of connections) {
      graph.addEdge(vertex, connection);
    }
  }

  return graph;
};

const firstPart = (input: string) => {
  const graph = createGraph(input);

  const out = breadthFirstSearch(graph, "you", "out");

  console.log(out);

  console.log(`Number of Paths: ${out.length}`);
};

const secondPart = (_input: string) => {
  console.log("Not solved yet :/");
};

runScriptWithArgs(firstPart, secondPart, __dirname, testInput);
