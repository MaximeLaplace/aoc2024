import { codec, Coords } from '../../utils';
import { parseInput } from './parseInput';
import { solve } from './part1';

export const part2 = (rawInput: string): string => {
	const input = parseInput(rawInput);
	let take = 1024;
	// brute force, incr of 1.
	// Could do much better with more clever algorithm or just a simple bisect.
	for (let i = take; i < input.length; i++) {
		if (solve(70, input, i) === null) {
			return codec([...input[i - 1]].toReversed() as Coords);
		}
	}
};
