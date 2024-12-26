export type ParsedInput = string[][];

export const parseInput = (input: string): ParsedInput => {
	return input.split('\n').map((l) => l.split(''));
};
