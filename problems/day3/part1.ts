const regex = /mul\(\d{1,3},\d{1,3}\)/gm;

export const part1 = (input: string): number => {
	const parts = input.match(regex);
	const numbers = parts.map((e) =>
		e
			.replace('mul(', '')
			.replace(')', '')
			.split(',')
			.map((i) => parseInt(i))
	);

	return numbers.reduce((acc, val) => acc + val[0] * val[1], 0);
};
