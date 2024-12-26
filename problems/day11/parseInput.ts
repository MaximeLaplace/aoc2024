export type ParsedInput = number[];

export const parseInput = (input: string): ParsedInput => {
	return input.split(' ').map((l) => parseInt(l));
};
