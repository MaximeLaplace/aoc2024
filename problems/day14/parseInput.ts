import { Coords, extractInts } from '../../utils';

export type Robot = {
	p: Coords;
	v: Coords;
};

type ParsedInput = Robot[];

export const parseInput = (input: string): ParsedInput => {
	return input
		.split('\n')
		.map(extractInts)
		.map((robot) => ({
			p: [robot[1], robot[0]],
			v: [robot[3], robot[2]]
		}));
};
