import { parseInput, type Rule } from './parseInput';

const isSafePrint = (rules: Rule[], print: number[]) => {
	for (const [first, second] of rules) {
		if (print.includes(first) && print.includes(second)) {
			if (print.indexOf(second) < print.indexOf(first)) {
				return false;
			}
		}
	}
	return true;
};

export const part1 = (rawInput: string) => {
	const input = parseInput(rawInput);

	const safePrints = input.prints.filter((print) =>
		isSafePrint(input.rules, print)
	);

	const vals = safePrints.map((print) => print[Math.floor(print.length / 2)]);

	return vals.reduce((a, b) => a + b, 0);
};
