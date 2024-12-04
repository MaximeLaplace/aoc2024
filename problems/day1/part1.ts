import { parseInput } from './parsing';

export const part1 = (rawInput: string) => {
	const input = parseInput(rawInput);

	const l1 = [...input[0]].toSorted();
	const l2 = [...input[1]].toSorted();

	let sum = 0;

	for (let i = 0; i < l1.length; i++) {
		sum += Math.abs(l1[i] - l2[i]);
	}

	return sum;
};
