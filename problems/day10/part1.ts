import { uniqBy } from 'lodash';
import { codec, getAdjacentNeighbors, Point } from '../../utils';
import { ParsedInput, parseInput } from './parseInput';

const getTrailHeadEnds = (
	input: ParsedInput,
	[i, j]: [number, number]
): Point<number>[] => {
	const currentValue = input[i][j];

	const neighbors = getAdjacentNeighbors(input, [i, j]);

	if (currentValue === 8) {
		return neighbors.filter(({ value }) => value === 9);
	}

	return neighbors
		.filter(({ value }) => value === currentValue + 1)
		.flatMap(({ position }) => getTrailHeadEnds(input, position));
};

const getTrailHeadScore = (input: ParsedInput, [i, j]: [number, number]) => {
	const ends = getTrailHeadEnds(input, [i, j]);
	return uniqBy(ends, ({ position }) => codec(position)).length;
};

export const part1 = (rawInput: string) => {
	const input = parseInput(rawInput);

	const potentialTrailheads = [];
	for (let i = 0; i < input.length; i++) {
		for (let j = 0; j < input[0].length; j++) {
			if (input[i][j] === 0) {
				potentialTrailheads.push([i, j]);
			}
		}
	}

	return potentialTrailheads.reduce(
		(a, b) => a + getTrailHeadScore(input, b),
		0
	);
};
