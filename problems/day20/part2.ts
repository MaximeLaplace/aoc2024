import { parseInput } from './parseInput';
import { solve } from './part1';

export const part2 = (rawInput: string): number => {
	const input = parseInput(rawInput);
	return solve(input, 20);
};
