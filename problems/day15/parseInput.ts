import { Direction } from '../../utils';

export type Map = string[][];

export type ParsedInput = { map: Map; moves: Direction[] };

type D = '^' | '>' | '<' | 'v';
const D_TO_DIRECTION: Record<D, Direction> = {
	'^': 'top',
	'>': 'right',
	'<': 'left',
	v: 'bottom'
};

export const parseInput = (input: string): ParsedInput => {
	const [rawMap, rawMoves] = input.split('\n\n');

	return {
		map: rawMap.split('\n').map((l) => l.split('')),
		moves: rawMoves
			.replaceAll('\n', '')
			.replaceAll(' ', '')
			.split('')
			.map((s) => D_TO_DIRECTION[s])
	};
};
