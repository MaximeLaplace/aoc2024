import { extractInts } from '../../utils';

export type ParsedInput = number[];

export const parseInput = (input: string): ParsedInput => {
	return input.split('\n').flatMap((l) => extractInts(l));
};
