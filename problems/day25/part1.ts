import { parseInput } from './parseInput';

const fits = (key: number[], lock: number[], slotHeight: number) => {
	for (let i = 0; i < key.length; i++) {
		if (key[i] + lock[i] > slotHeight) {
			return false;
		}
	}
	return true;
};

export const part1 = (rawInput: string): number => {
	const input = parseInput(rawInput);
	const locks = input.locks;
	const keys = input.keys;

	let pairs = 0;

	for (const key of keys) {
		for (const lock of locks) {
			if (fits(key, lock, input.slotHeight)) {
				pairs++;
			}
		}
	}

	return pairs;
};
