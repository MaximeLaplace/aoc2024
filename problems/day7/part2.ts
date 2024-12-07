import { parseInput } from './parseInput';

const getAllCombinations = (n: number) => {
	if (n === 1) {
		return [['+'], ['*'], ['|']];
	}

	return [
		...getAllCombinations(n - 1).map((l) => ['+', ...l]),
		...getAllCombinations(n - 1).map((l) => ['*', ...l]),
		...getAllCombinations(n - 1).map((l) => ['|', ...l])
	];
};

const isPossibleOperation = (result: number, operands: number[]): boolean => {
	const allOperations = getAllCombinations(operands.length - 1);

	for (const operations of allOperations) {
		let sum = operands[0];

		for (let i = 1; i < operands.length; i++) {
			const op = operations[i - 1];
			if (op === '|') {
				sum = parseInt(`${sum}${operands[i]}`);
			} else {
				sum = eval(sum + op + operands[i]);
			}
		}

		if (sum === result) {
			return true;
		}
	}

	return false;
};

export const part2 = (rawInput: string) => {
	const input = parseInput(rawInput);

	return input
		.filter((op) => isPossibleOperation(op.result, op.operands))
		.reduce((acc, { result }) => acc + result, 0);
};
