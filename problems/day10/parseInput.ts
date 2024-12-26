export type ParsedInput = number[][];

export const parseInput = (input: string): ParsedInput => {
	return input.split('\n').map((l) => l.split('').map((e) => parseInt(e)));
};
