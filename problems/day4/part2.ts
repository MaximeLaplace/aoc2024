import { getCornerNeighbors } from '../../utils';
import { parseInput } from './parsing';

export const part2 = (rawInput: string): number => {
	const input = parseInput(rawInput);

	let total = 0;
	for (let i = 0; i < input.length; i++) {
		for (let j = 0; j < input[0].length; j++) {
			if (input[i][j] !== 'A') {
				continue;
			}

			const neighbors = getCornerNeighbors(input, [i, j]);

			const neighborsWord = neighbors.map(({ value }) => value).join('');

			const validWords = ['MMSS', 'MSMS', 'SSMM', 'SMSM'];

			if (validWords.includes(neighborsWord)) {
				total += 1;
			}
		}
	}
	return total;
};
