import { ParsedInput, parseInput } from './parseInput';

export const simComputer = (
	input: ParsedInput,
	initialValueForA?: bigint
): bigint[] => {
	const registers = [input.registers.A, input.registers.B, input.registers.C];
	const operations = input.operations.map(BigInt);

	let pointer = 0;
	let A = initialValueForA ?? registers[0];
	let B = BigInt(0);
	let C = BigInt(0);
	const outputs: bigint[] = [];

	const getComboOperator = (ptr) => {
		let val = operations[ptr + 1];
		if (val < 4n) return val;
		if (val == 4n) return A;
		if (val == 5n) return B;
		if (val == 6n) return C;
	};

	while (pointer < operations.length) {
		let cmd = operations[pointer];

		if (cmd === 0n) A = A >> getComboOperator(pointer);
		else if (cmd === 1n) B = B ^ operations[pointer + 1];
		else if (cmd === 2n) B = getComboOperator(pointer) % 8n;
		else if (cmd === 3n && A !== 0n)
			pointer = Number(operations[pointer + 1]) - 2;
		else if (cmd === 4n) B = B ^ C;
		else if (cmd === 5n) outputs.push(getComboOperator(pointer) % 8n);
		else if (cmd === 6n) B = A >> getComboOperator(pointer);
		else if (cmd === 7n) C = A >> getComboOperator(pointer);

		pointer += 2;
	}

	return outputs;
};

export const part1 = (rawInput: string) => {
	const input = parseInput(rawInput);
	const outs = simComputer(input);
	return outs.join(',');
};
