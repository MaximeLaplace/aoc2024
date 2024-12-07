import {
	codec,
	Direction,
	getAllNeighborsInDirectionUntilEdge
} from '../../utils';
import { parseInput } from './parseInput';

const directions: Record<string, Direction> = {
	'^': 'top',
	'>': 'right',
	'<': 'left',
	v: 'bottom'
};

const DIRECTIONS: Direction[] = ['top', 'right', 'bottom', 'left'];
const getNextDirection = (dir: Direction) => {
	return DIRECTIONS[DIRECTIONS.indexOf(dir) + 1] ?? DIRECTIONS[0];
};

export const part1 = (rawInput: string) => {
	const input = parseInput(rawInput);

	let a = 0;
	let b = 0;

	for (let i = 0; i < input.length; i++) {
		for (let j = 0; j < input[0].length; j++) {
			if (['^', '>', 'v', '<'].includes(input[i][j])) {
				a = i;
				b = j;
				break;
			}
		}
	}

	let currentDirection = directions[input[a][b]];

	const seen = new Set<string>();

	while (true) {
		seen.add(codec([a, b]));
		const newVisited = getAllNeighborsInDirectionUntilEdge(
			input,
			[a, b],
			currentDirection
		);
		const values = newVisited.map((t) => t.value);

		// goes off edge
		if (!values.includes('#')) {
			for (const t of newVisited) {
				seen.add(codec(t.position));
			}
			break;
		}

		let newA = 0;
		let newB = 0;
		for (const t of newVisited) {
			if (t.value === '#') {
				break;
			}
			newA = t.position[0];
			newB = t.position[1];
			seen.add(codec(t.position));
		}
		currentDirection = getNextDirection(currentDirection);
		a = newA;
		b = newB;
	}

	return seen.size;
};
