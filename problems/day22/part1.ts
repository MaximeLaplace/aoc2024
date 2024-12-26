import { parseInput } from './parseInput';

export const getNext = (n: bigint): bigint => {
	let a = ((n << 6n) ^ n) & 0xffffffn;
	a = ((a >> 5n) ^ a) & 0xffffffn;
	a = ((a << 11n) ^ a) & 0xffffffn;
	return a;
};

export const part1 = (rawInput: string): number => {
	const input = parseInput(rawInput);
	let res = 0;
	for (const init of input) {
		let a = BigInt(init);
		for (let i = 0; i < 2000; i++) {
			a = getNext(a);
		}
		res += Number(a);
	}
	return res;
};
