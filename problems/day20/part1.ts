import { findIn2DGrid } from '../../toolkit/findIn2DGrid';
import { shortestPath } from '../../toolkit/shortestPath';
import { Coords } from '../../utils';
import { ParsedInput, parseInput } from './parseInput';

const manhattanDistance = (point1: Coords, point2: Coords) => {
	return Math.abs(point1[0] - point2[0]) + Math.abs(point1[1] - point2[1]);
};

const MIN_SAVE = 100;

export const solve = (input: ParsedInput, cheatLength: number) => {
	const [s, e] = findIn2DGrid(input, ['S', 'E']);
	const bestPath = shortestPath(input, s, e);

	let cheats = 0;

	for (let i = 0; i < bestPath.length; i++) {
		for (let j = i; j < bestPath.length; j++) {
			const minCheatLen = manhattanDistance(bestPath[i], bestPath[j]);
			if (minCheatLen > cheatLength) {
				continue;
			}

			const skips = j - i + 1;
			const save = skips - minCheatLen;

			if (save >= MIN_SAVE) {
				cheats++;
			}
		}
	}

	return cheats;
};

export const part1 = (rawInput: string): number => {
	const input = parseInput(rawInput);
	return solve(input, 2);
};
