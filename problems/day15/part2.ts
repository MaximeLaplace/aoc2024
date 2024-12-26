import {
	cachify,
	codec,
	Coords,
	Direction,
	getAllNeighborsInDirectionUntilEdge,
	getDirection,
	Point
} from '../../utils';
import { Map, parseInput } from './parseInput';

const getStacks = cachify(
	(map: Map, [i, j]: Coords, direction: Direction): Point<string>[][] => {
		const line = getAllNeighborsInDirectionUntilEdge(map, [i, j], direction);
		const space0 = line.map(({ value }) => value).indexOf('.');
		const stack0 = space0 !== -1 ? line.slice(0, space0) : line;

		if (direction === 'right' || direction === 'left') {
			return [stack0];
		}

		const allStacks = [stack0];

		const toVisit = [...stack0];
		const seen = new Set<string>(stack0.map((p) => codec(p.position)));

		while (toVisit.length > 0) {
			const point = toVisit.pop();

			const neighbor: Coords =
				point.value === '['
					? [point.position[0], point.position[1] + 1]
					: point.value === ']'
					? [point.position[0], point.position[1] - 1]
					: undefined;

			if (!neighbor) {
				continue;
			}

			if (seen.has(codec(neighbor))) {
				continue;
			}

			const newLine = getAllNeighborsInDirectionUntilEdge(
				map,
				neighbor,
				direction
			);
			const spaceX = newLine.map(({ value }) => value).indexOf('.');
			const stackX = spaceX !== -1 ? newLine.slice(0, spaceX) : newLine;
			allStacks.push(stackX);

			stackX.forEach((p) => {
				seen.add(codec(p.position));
			});
			toVisit.push(...stackX);
		}

		return allStacks;
	}
);

const isStackMovable = (stacks: Point<string>[][]) => {
	return stacks.every(
		(stack) => !stack.map(({ value }) => value).includes('#')
	);
};

const moveBlock = (newMap: Map, map: Map, [i, j]: Coords, dir: Direction) => {
	const [iinc, jinc] = getDirection(dir);
	newMap[i + iinc][j + jinc] = map[i][j];
	newMap[i][j] = '.';
};

const moveFish = (
	map: Map,
	direction: Direction,
	[i, j]: Coords,
	printStacks: boolean = false
) => {
	const stacks = getStacks(map, [i, j], direction);

	if (!isStackMovable(stacks)) {
		return {
			newI: i,
			newJ: j,
			newMap: map
		};
	}
	if (printStacks) {
		console.log(stacks);
	}
	const line = getAllNeighborsInDirectionUntilEdge(map, [i, j], direction);
	const [newI, newJ] = line[1].position;
	const newMap = map.map((l) => [...l]);

	for (const stack of stacks) {
		const reversedStack = [...stack].toReversed();
		for (const point of reversedStack) {
			moveBlock(newMap, map, point.position, direction);
		}
	}

	return {
		newI: newI,
		newJ: newJ,
		newMap: newMap
	};
};

const getMapScore = (map: Map) => {
	let sum = 0;
	for (let i = 0; i < map.length; i++) {
		for (let j = 0; j < map[i].length; j++) {
			if (map[i][j] === '[' && j < (map[0].length - 1) / 2) {
				sum += 100 * i + j;
				j++;
			} else if (map[i][j] === ']' && j > (map[0].length - 1) / 2) {
				sum += 100 * i + j;
				sum--;
			}
		}
	}
	return sum;
};

export const part2 = (rawInput: string) => {
	const input = parseInput(rawInput);

	const biggerMap = input.map.map((l) =>
		l.flatMap((e) => {
			if (e === '.') {
				return ['.', '.'];
			}
			if (e === '#') {
				return ['#', '#'];
			}
			if (e === 'O') {
				return ['[', ']'];
			}
			if (e === '@') {
				return ['@', '.'];
			}
		})
	);

	let currI = 0;
	let currJ = 0;
	for (let i = 0; i < biggerMap.length; i++) {
		for (let j = 0; j < biggerMap[i].length; j++) {
			if (biggerMap[i][j] === '@') {
				currI = i;
				currJ = j;
				break;
			}
		}
		if (currI !== 0 || currJ !== 0) {
			break;
		}
	}

	let map = [...biggerMap];
	for (const direction of input.moves) {
		const { newI, newJ, newMap } = moveFish(map, direction, [currI, currJ]);
		currI = newI;
		currJ = newJ;
		map = newMap.map((l) => [...l]);
	}

	return getMapScore(map);
};
