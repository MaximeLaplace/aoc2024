import { codec, Coords } from '../../utils';
import { parseInput } from './parseInput';

const DIRS = [
	[-1, 0],
	[1, 0],
	[0, -1],
	[0, 1]
];

export const solve = (size: number, walls: Coords[], take: number) => {
	const start: Coords = [0, 0];

	const bytes = new Set<string>();
	for (let i = 0; i < take; i++) {
		if (i >= walls.length) {
			break;
		}
		bytes.add(codec(walls[i]));
	}

	const pq: { curr: Coords; length: number }[] = [
		{
			curr: start,
			length: 0
		}
	];

	const seen = new Set<string>();

	while (pq.length > 0) {
		const path = pq.shift();
		const curr = path.curr;

		if (curr[0] === size && curr[1] === size) {
			return path.length;
		}

		const neighbors: Coords[] = DIRS.map((dir) => [
			curr[0] + dir[0],
			curr[1] + dir[1]
		]);

		for (const neighbor of neighbors) {
			if (
				neighbor[0] >= 0 &&
				neighbor[0] <= size &&
				neighbor[1] >= 0 &&
				neighbor[1] <= size &&
				!bytes.has(codec(neighbor)) &&
				!seen.has(codec(neighbor))
			) {
				seen.add(codec(neighbor));
				const newPath = {
					curr: neighbor,
					length: path.length + 1
				};
				pq.push(newPath);
			}
		}
	}

	return null;
};

export const part1 = (rawInput: string): number => {
	const input = parseInput(rawInput);
	return solve(70, input, 1024);
};
