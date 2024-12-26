import { parseInput } from './parseInput';

const changeStone = (stone: number): number[] => {
	if (stone === 0) {
		return [1];
	}

	const sString = stone.toString();
	if (sString.length % 2 === 0) {
		const firstHalf = sString.slice(0, sString.length / 2);
		const secondHalf = sString.slice(sString.length / 2);

		return [parseInt(firstHalf), parseInt(secondHalf)];
	}

	return [stone * 2024];
};

const changeStones = (stones: number[]): number[] => {
	return stones.flatMap(changeStone);
};

export const part1 = (rawInput: string) => {
	const input = parseInput(rawInput);

	let stones = [...input];
	for (let i = 0; i < 25; i++) {
		stones = changeStones(stones);
	}
	return stones.length;
};
