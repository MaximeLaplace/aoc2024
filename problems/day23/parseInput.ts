export type ParsedInput = [string, string][];

export const parseInput = (input: string): ParsedInput => {
	return input.split('\n').map((l) => l.split('-') as [string, string]);
};
