export type GateType = 'XOR' | 'OR' | 'AND';
export interface Gate {
	type: GateType;
	inputs: [string, string];
	output: string;
}

export type ParsedInput = {
	wires: Map<string, bigint>;
	gates: Gate[];
};

export const parseInput = (input: string): ParsedInput => {
	const wires = new Map(
		input
			.split('\n\n')[0]
			.split('\n')
			.map(
				(l) => [l.split(': ')[0], BigInt(l.split(': ')[1])] as [string, bigint]
			)
	);

	const gates = input
		.split('\n\n')[1]
		.split('\n')
		.map((g) => {
			const p = g.split(' ');
			return {
				type: p[1] as GateType,
				inputs: [p[0], p[2]] as [string, string],
				output: p.at(-1)
			};
		});

	return {
		wires,
		gates
	};
};
