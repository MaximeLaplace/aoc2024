import { parseInput, Robot } from './parseInput';

export const moveRobot = (
	robot: Robot,
	move: number,
	inputSize: [number, number]
): Robot => {
	const x = (robot.p[0] + robot.v[0] * move) % inputSize[0];
	const y = (robot.p[1] + robot.v[1] * move) % inputSize[1];
	const nextX = x < 0 ? inputSize[0] + x : x;
	const nextY = y < 0 ? inputSize[1] + y : y;
	return { ...robot, p: [nextX, nextY] };
};

let X = 103;
let Y = 101;

export const part1 = (rawInput: string): number => {
	const input = parseInput(rawInput);

	const newRobots = input.map((r) => moveRobot(r, 100, [X, Y]));
	const q1 = newRobots.filter(
		({ p: [x, y] }) => x < Math.floor(X / 2) && y < Math.floor(Y / 2)
	).length;
	const q2 = newRobots.filter(
		({ p: [x, y] }) => x < Math.floor(X / 2) && y > Math.floor(Y / 2)
	).length;
	const q3 = newRobots.filter(
		({ p: [x, y] }) => x > Math.floor(X / 2) && y < Math.floor(Y / 2)
	).length;
	const q4 = newRobots.filter(
		({ p: [x, y] }) => x > Math.floor(X / 2) && y > Math.floor(Y / 2)
	).length;

	return q1 * q2 * q3 * q4;
};
