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

type StoneMap = Map<number, number>;

const getStoneMap = (stones: number[]): StoneMap => {
	const stonesMap = new Map<number, number>();
	for (const stone of stones) {
		const v = stonesMap.get(stone);
		stonesMap.set(stone, v ? v + 1 : 1);
	}

	return stonesMap;
};

const changeStones = (stoneMap: StoneMap): StoneMap => {
	const stones = Array.from(stoneMap.keys());
	const newStoneMap = new Map<number, number>();

	for (const stone of stones) {
		const newStones = changeStone(stone);
		const m = stoneMap.get(stone);
		newStones.forEach((v) => {
			const vv = newStoneMap.get(v);

			newStoneMap.set(v, vv ? vv + m : m);
		});
	}

	return newStoneMap;
};

export const part2 = (rawInput: string): number => {
	const input = parseInput(rawInput);

	let stones: StoneMap = getStoneMap(input);

	for (let i = 0; i < 75; i++) {
		stones = changeStones(stones);
	}

	return Array.from(stones.values()).reduce((a, b) => a + b, 0);
};
