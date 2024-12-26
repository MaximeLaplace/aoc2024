import { codec, combinations, isValidIndex } from '../../utils';
import { ParsedInput, parseInput } from './parseInput';

const computeAntinodes = (
	input: ParsedInput,
	[x1, y1]: [number, number],
	[x2, y2]: [number, number]
) => {
	if (input[x1][y1] === '.' || input[x2][y2] === '.') {
		return [];
	}

	if (input[x1][y1] !== input[x2][y2]) {
		return [];
	}

	const h = x1 - x2;
	const v = y1 - y2;

	const antinodes: [number, number][] = [];

	let m = 0;
	while (true) {
		const p1: [number, number] = [x1 + h * m, y1 + v * m];
		const p2: [number, number] = [x2 - h * m, y2 - v * m];

		const newAntinodes = [p1, p2].filter(isValidIndex(input));

		if (newAntinodes.length === 0) {
			break;
		}

		antinodes.push(...newAntinodes);
		m++;
	}

	return antinodes;
};

export const part2 = (rawInput: string): number => {
	const input = parseInput(rawInput);

	const points: [number, number][] = [];
	for (let i = 0; i < input.length; i++) {
		for (let j = 0; j < input[0].length; j++) {
			if (input[i][j] !== '.') {
				points.push([i, j]);
			}
		}
	}

	const pairs = combinations(points, 2);

	const antinodes = new Set<string>();

	for (const [p1, p2] of pairs) {
		const newAntinodes = computeAntinodes(input, p1, p2).map(codec);
		for (const newAntinode of newAntinodes) {
			antinodes.add(newAntinode);
		}
	}

	return antinodes.size;
};