import { transpose } from '../../utils';

export type ParsedInput = {
	locks: number[][];
	keys: number[][];
	slotHeight: number;
};

export const parseInput = (input: string): ParsedInput => {
	const maps = input
		.split('\n\n')
		.map((m) =>
			m.split('\n').map((l) => l.split('').map((e) => (e === '.' ? '' : e)))
		);

	const res: ParsedInput = {
		keys: [],
		locks: [],
		slotHeight: maps[0].length
	};

	for (const tloc of maps) {
		const heights: number[] = [];
		let type = 'locks';
		const loc = transpose(tloc);
		for (const line of loc) {
			const height = line.join('').length;
			if (line[0] !== '#') {
				type = 'keys';
			}
			heights.push(height);
		}
		res[type].push(heights);
	}

	return res;
};
