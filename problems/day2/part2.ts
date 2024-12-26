import { parseInput } from './parsing';
import { isSafe } from './part1';

export const part2 = (rawInput: string) => {
	const input = parseInput(rawInput);

	const allReports = input.map((report) => {
		const enhancedReports = [];
		for (let i = 0; i < report.length; i++) {
			enhancedReports.push(report.splice(i, 1));
		}
		return enhancedReports;
	});

	const safeReports = allReports.filter((reports) => reports.some(isSafe));

	return safeReports.length;
};
