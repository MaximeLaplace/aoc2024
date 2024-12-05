import { parseInput, Rule } from './parseInput';

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

const sortFn = (rules: Rule[]) => (a: number, b: number) => {
	for (const [first, second] of rules) {
		if (first === a && second === b) {
			return 1;
		} else if (first === b && second === a) {
			return -1;
		}
	}

	return 0;
};

export const part2 = (rawInput: string) => {
	const input = parseInput(rawInput);

	const unsafePrints = input.prints.filter(
		(print) => !isSafePrint(input.rules, print)
	);
	const ordered = unsafePrints.map((print) => print.sort(sortFn(input.rules)));

	const vals = ordered.map((print) => print[Math.floor(print.length / 2)]);

	return vals.reduce((a, b) => a + b, 0);
};
