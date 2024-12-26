import { codec } from '../../utils';
import { ParsedInput } from './parseInput';
import { getBestPaths } from './part1';

export const part2 = (input: ParsedInput): number => {
	const { bestPaths } = getBestPaths(input);
	return new Set(bestPaths.flat().map(codec)).size;
};
