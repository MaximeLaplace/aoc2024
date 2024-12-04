import { isValidIndex, transpose } from '../../utils';
import { ParsedInput, parseInput } from './parsing';

const getDiagonalWords = (input: ParsedInput, [i, j]: [number, number]) => {
	let tlw = 'X';
	let trw = 'X';
	let blw = 'X';
	let brw = 'X';

	let a = i - 1;
	let b = j - 1;
	while (isValidIndex(input)([a, b])) {
		tlw += input[a][b];
		a -= 1;
		b -= 1;
	}
	a = i - 1;
	b = j + 1;
	while (isValidIndex(input)([a, b])) {
		trw += input[a][b];
		a -= 1;
		b += 1;
	}
	a = i + 1;
	b = j - 1;
	while (isValidIndex(input)([a, b])) {
		blw += input[a][b];
		a += 1;
		b -= 1;
	}
	a = i + 1;
	b = j + 1;
	while (isValidIndex(input)([a, b])) {
		brw += input[a][b];
		a += 1;
		b += 1;
	}

	return [tlw, trw, blw, brw]
		.map((w) => w.slice(0, 4))
		.filter((w) => w === 'XMAS').length;
};

const reg = /XMAS/gm;
const regr = /SAMX/gm;

export const part1 = (rawInput: string): number => {
	const input = parseInput(rawInput);

	let total = 0;

	// horizontal
	for (let i = 0; i < input.length; i++) {
		const w = input[i].join('');
		// left to right
		total += w.match(reg)?.length ?? 0;
		// right to left
		total += w.match(regr)?.length ?? 0;
	}

	// vertical
	const tInput = transpose(input);
	for (let i = 0; i < tInput.length; i++) {
		const w = tInput[i].join('');
		// left to right
		total += w.match(reg)?.length ?? 0;
		// right to left
		total += w.match(regr)?.length ?? 0;
	}

	// diagonals
	for (let i = 0; i < input.length; i++) {
		for (let j = 0; j < input[0].length; j++) {
			const letter = input[i][j];

			if (letter !== 'X') {
				continue;
			}

			total += getDiagonalWords(input, [i, j]);
		}
	}

	return total;
};
