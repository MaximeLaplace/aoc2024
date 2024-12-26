import { combinations } from '../../utils';
import { ParsedInput, parseInput } from './parseInput';
import { analyzeNetworks, encodeNet } from './part1';

export const part2 = (rawInput: string): string => {
	const input = parseInput(rawInput);
	const net = analyzeNetworks(input);

	let biggest = -Infinity;
	let bestSet: string;

	for (const [comp, conns] of net.entries()) {
		let potentialBiggest = conns.size;

		while (conns.size > biggest && potentialBiggest >= 3) {
			const peersComb = combinations(Array.from(conns), potentialBiggest).map(
				(c) => [comp, ...c]
			);

			for (const comb of peersComb) {
				const pairs = combinations(comb, 2);
				let isGood = true;
				for (const pair of pairs) {
					if (!net.get(pair[0]).has(pair[1])) {
						isGood = false;
						continue;
					}
				}
				if (!isGood) continue;
				biggest = potentialBiggest + 1;
				bestSet = encodeNet(comb);
				break;
			}

			potentialBiggest--;
		}
	}

	return bestSet;
};
