import { parseInput } from './parseInput';
import { computeMachineCost } from './part1';

export const part2 = (rawInput: string): number => {
	const input = parseInput(rawInput);

	return input
		.map((m) => ({
			...m,
			t: { x: m.t.x + 10000000000000, y: m.t.y + 10000000000000 }
		}))
		.reduce((a, b) => a + computeMachineCost(b), 0);
};
