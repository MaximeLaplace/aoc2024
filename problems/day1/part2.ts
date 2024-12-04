import { parseInput } from './parsing';

export const part1 = (rawInput: string) => {
	const input = parseInput(rawInput);

	const l1 = [...input[0]].toSorted();
	const l2 = input[1];

	const l2Map = {};
	for (const value of l2) {
		if (l2Map[value] === undefined) {
			l2Map[value] = 1;
		} else {
			l2Map[value] += 1;
		}
	}

	let sum = 0;

	for (const value of l1) {
		sum += value * l2Map[value];
	}

	return sum;
};
