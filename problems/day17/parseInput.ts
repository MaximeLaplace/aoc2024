import { extractInts } from '../../utils';

type Register = {
	A: bigint;
	B: bigint;
	C: bigint;
};

export type ParsedInput = {
	registers: Register;
	operations: number[];
};

export const parseInput = (input: string): ParsedInput => {
	const rawRegisters = input
		.split('\n\n')[0]
		.split('\n')
		.flatMap((l) => extractInts(l));

	const operations = extractInts(input.split('\n\n')[1]);

	return {
		registers: {
			A: BigInt(rawRegisters[0]),
			B: BigInt(rawRegisters[1]),
			C: BigInt(rawRegisters[2])
		},
		operations
	};
};
