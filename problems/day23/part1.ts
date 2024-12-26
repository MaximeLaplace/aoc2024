import { combinations } from '../../utils';
import { ParsedInput, parseInput } from './parseInput';

type Network = Map<string, Set<string>>;
export const analyzeNetworks = (input: ParsedInput): Network => {
	const net = new Map<string, Set<string>>();

	for (const con of input) {
		const m1 = net.get(con[0]);
		if (!m1) net.set(con[0], new Set([con[1]]));
		else net.get(con[0]).add(con[1]);

		const m2 = net.get(con[1]);
		if (!m2) net.set(con[1], new Set([con[0]]));
		else net.get(con[1]).add(con[0]);
	}

	return net;
};

export const encodeNet = (net: string[]) => net.toSorted().join(',');

export const part1 = (rawInput: string): number => {
	const input = parseInput(rawInput);
	const trioSet = new Set<string>();

	const net = analyzeNetworks(input);

	for (const [comp, conns] of net.entries()) {
		const combs = combinations(Array.from(conns), 2);

		for (const trio of combs) {
			if (
				net.get(trio[0]).has(trio[1]) &&
				[trio[0], ...trio].some((t) => t.startsWith('t'))
			) {
				trioSet.add(encodeNet([comp, ...trio]));
			}
		}
	}

	return trioSet.size;
};
