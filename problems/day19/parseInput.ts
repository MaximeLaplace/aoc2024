export type ParsedInput = {
	towels: string[];
	designs: string[];
};

export const parseInput = (input: string): ParsedInput => {
	const parts = input.split('\n\n');

	return {
		towels: parts[0].split(', '),
		designs: parts[1].split('\n')
	};
};
