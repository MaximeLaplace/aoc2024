import {
	codec,
	Direction,
	getAllNeighborsInDirectionUntilEdge
} from '../../utils';
import { parseInput, type ParsedInput } from './parseInput';

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

const codec2 = (pos: [number, number], direction: Direction) => {
	return codec(pos) + ',' + direction;
};

const isLoopingAfterMarching = (input: ParsedInput) => {
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
		if (seen.has(codec2([a, b], currentDirection))) {
			// console.log('loops');
			return true;
		}

		seen.add(codec2([a, b], currentDirection));
		const newVisited = getAllNeighborsInDirectionUntilEdge(
			input,
			[a, b],
			currentDirection
		);
		const values = newVisited.map((t) => t.value);

		// goes off edge
		if (!values.includes('#')) {
			// console.log('goes off edge');
			return false;
		}

		let newA = 0;
		let newB = 0;
		for (const t of newVisited) {
			if (t.value === '#') {
				break;
			}
			newA = t.position[0];
			newB = t.position[1];
			seen.add(codec2(t.position, currentDirection));
		}
		currentDirection = getNextDirection(currentDirection);
		a = newA;
		b = newB;
	}
};

export const part2 = (rawInput: string) => {
	const input = parseInput(rawInput);

	let sum = 0;

	const tot = input.length * input[0].length;

	console.log(tot);

	for (let i = 0; i < input.length; i++) {
		for (let j = 0; j < input[0].length; j++) {
			console.log('running number : ', i * input[0].length + j);

			const customInput = input.map((l, index) =>
				index !== i
					? [...l]
					: l.map((e, index2) => (index2 === j && e === '.' ? '#' : e))
			);

			if (isLoopingAfterMarching(customInput)) {
				sum++;
			}
		}
	}

	return sum;
};
