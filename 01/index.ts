import { second } from "./second";
import { first } from "./first";
import { runScriptWithArgs } from "../utils";

const testInput = `L68
L30
R48
L5
R60
L55
L1
L99
R14
L82`;

runScriptWithArgs(first, second, __dirname, testInput);
