export type Rule = number[];
type ParsedInput = {
	rules: Rule[];
	prints: number[][];
};

export const parseInput = (input: string): ParsedInput => {
	const [rulesR, printsR] = input.split('\n\n');

	const rules = rulesR
		.split('\n')
		.map((l) => l.split('|').map((e) => parseInt(e)));
	const prints = printsR
		.split('\n')
		.map((l) => l.split(',').map((e) => parseInt(e)));

	return {
		rules,
		prints
	};
};
