import { parseInput } from './parseInput';

const countWaysToBuildDesign = (design: string, towels: string[]): number => {
	const substringsCount = new Array(design.length + 1).fill(0);
	substringsCount[0] = 1;
	for (let i = 1; i <= design.length; i++) {
		for (const towel of towels) {
			const len = towel.length;
			if (i >= len && design.slice(i - len, i) === towel) {
				substringsCount[i] += substringsCount[i - len];
			}
		}
	}
	return substringsCount[design.length];
};

export const part2 = (rawInput: string): number => {
	const input = parseInput(rawInput);
	return input.designs.reduce(
		(sum, d) => sum + countWaysToBuildDesign(d, input.towels),
		0
	);
};
