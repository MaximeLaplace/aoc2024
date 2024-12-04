type ParsedInput = number[][];

export const parseInput = (rawInput: string): ParsedInput => {
	return rawInput.split('\n').map((l) => l.split(' ').map((e) => parseInt(e)));
};
