import { parseInput } from './parseInput';
import { getNext } from './part1';

export const part2 = (rawInput: string): number => {
	const input = parseInput(rawInput);
	const allPatterns = new Set<string>();

	const maps = input.map((init) => {
		const patternsMap = new Map<string, number>();
		const prices: number[] = [init % 10];

		let n = BigInt(init);

		const pattern = [];

		for (let i = 0; i < 2000; i++) {
			n = getNext(n);
			const p = Number(n % 10n);
			prices.push(p);

			pattern.push(p - prices[i]);
			if (pattern.length > 4) pattern.shift();
			const patternCode = pattern.join(',');
			allPatterns.add(patternCode);
			const existing = patternsMap.has(patternCode);
			if (existing) continue;
			patternsMap.set(patternCode, Number(p));
		}
		return patternsMap;
	});

	let bestScore = -Infinity;
	let bestPattern = undefined;
	for (const pattern of allPatterns) {
		const score = maps.reduce((a, b) => a + (b.get(pattern) ?? 0), 0);
		if (score > bestScore) {
			bestScore = score;
			bestPattern = pattern;
		}
	}

	return bestScore;
};
