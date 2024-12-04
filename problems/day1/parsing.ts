import { transpose } from '../../utils';

type ParsedInput = number[][];

export const parseInput = (rawInput: string): ParsedInput => {
	return transpose(
		rawInput.split('\n').map((l) => l.split(' ').map((e) => parseInt(e)))
	);
};
