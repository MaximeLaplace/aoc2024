const regex = /(mul\(\d{1,3},\d{1,3}\))|(do\(\))|(don't\(\))/gm;

export const part2 = (input: string): number => {
	const parts = input.match(regex);

	let isEnabled = true;
	let sum = 0;

	for (const part of parts) {
		if (part === "don't()") {
			isEnabled = false;
			continue;
		}
		if (part === 'do()') {
			isEnabled = true;
			continue;
		}

		if (!isEnabled) {
			continue;
		}

		const [a, b] = part
			.replace('mul(', '')
			.replace(')', '')
			.split(',')
			.map((i) => parseInt(i));
		sum += a * b;
	}

	return sum;
};
