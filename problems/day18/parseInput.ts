import { Coords, extractInts } from '../../utils';

export type ParsedInput = Coords[];

export const parseInput = (input: string): ParsedInput => {
	return input.split('\n').map((l) => extractInts(l).toReversed() as Coords);
};
