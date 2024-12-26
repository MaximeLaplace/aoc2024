import { uniqBy } from 'lodash';
import { codec, Coords, getAdjacentNeighbors } from '../../utils';
import { ParsedInput, parseInput } from './parseInput';

const getTrailHeadPaths = (
	input: ParsedInput,
	positions: [number, number][]
): Coords[][] => {
	const [i, j] = positions.at(-1);
	const currentValue = input[i][j];

	const neighbors = getAdjacentNeighbors(input, [i, j]);

	if (currentValue === 8) {
		const ends = neighbors.filter(({ value }) => value === 9);
		return ends.map(({ position }) => [...positions, position]);
	}

	const next = neighbors.filter(({ value }) => value === currentValue + 1);

	return next.flatMap(({ position }) =>
		getTrailHeadPaths(input, [...positions, position])
	);
};

const getTrailHeadScore = (input: ParsedInput, [i, j]: [number, number]) => {
	const ends = getTrailHeadPaths(input, [[i, j]]);
	return uniqBy(ends, (positions) => positions.map(codec).join('|')).length;
};

export const part2 = (rawInput: string) => {
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
