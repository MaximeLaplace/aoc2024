import { parseInput } from './parsing';

const isSafe = (report: number[]) => {
	let isIncreasing = report[1] > report[0];
	for (let i = 0; i < report.length - 1; i++) {
		const diff = Math.abs(report[i] - report[i + 1]);

		if (isIncreasing && report[i] < report[i + 1]) {
			return false;
		}

		if (!isIncreasing && report[i] > report[i + 1]) {
			return false;
		}

		if (diff === 0 || diff > 3) {
			return false;
		}
	}

	return true;
};

export const part1 = (rawInput: string) => {
	const input = parseInput(rawInput);
	return input.filter(isSafe).length;
};
