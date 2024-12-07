type ParsedInput = {
	result: number;
	operands: number[];
}[];

export const parseInput = (input: string): ParsedInput => {
	return input.split('\n').map((l) => {
		return {
			result: parseInt(l.split(':')[0]),
			operands: l
				.split(':')[1]
				.trim()
				.split(' ')
				.map((e) => parseInt(e))
		};
	});
};
