import { parseInput } from './parseInput';
import { simComputer } from './part1';

export const part2 = (rawInput: string) => {
	const input = parseInput(rawInput);

	let valids: Record<number, boolean> = {};
	let minValid = 8n ** 17n;

	const check = (depth: number, score: bigint) => {
		if (depth == 16) {
			valids[Number(score)] = true;
			if (score < minValid) minValid = score;
			return;
		}

		for (let i = 0; i < 8; i++) {
			if (
				Number(simComputer(input, BigInt(i) + 8n * score)[0]) ===
				input.operations[15 - depth]
			) {
				check(depth + 1, BigInt(i) + 8n * score);
			}
		}
	};

	check(0, 0n);

	return parseInt(minValid.toString());
};
