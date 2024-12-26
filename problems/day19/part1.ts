import { parseInput } from './parseInput';

export const part1 = (rawInput: string): number => {
	const input = parseInput(rawInput);
	const regex = new RegExp(`^(${input.towels.join('|')})+\$`, 'm');
	return input.designs.filter((d) => regex.test(d)).length;
};
