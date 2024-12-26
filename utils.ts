import { isArray } from 'lodash';

export const cachify = <T extends (...args: any) => any>(func: T) => {
	const cache = new Map<string, ReturnType<T>>();

	return (...args: Parameters<T>): ReturnType<T> => {
		const cacheValue = cache.get(JSON.stringify(args));
		if (cacheValue) {
			return cacheValue;
		}
		const computedValue = func(...args);
		cache.set(JSON.stringify(args), computedValue);
		return computedValue;
	};
};

export type Coords = [number, number];
export type Point<T extends unknown> = {
	value: T;
	position: Coords;
};

export const isValidIndex =
	<T extends unknown>(grid: T[][]) =>
	([i, j]: Coords) =>
		i >= 0 && i < grid.length && j >= 0 && j < grid[0].length;

export function getAdjacentNeighbors<T extends unknown>(
	grid: T[][],
	[i, j]: Coords
): Point<T>[] {
	const neighborIndices: Coords[] = [
		[i - 1, j],
		[i, j - 1],
		[i, j + 1],
		[i + 1, j]
	];

	const validIndices = neighborIndices.filter(isValidIndex(grid));

	return validIndices.map(([a, b]) => ({
		value: grid[a][b],
		position: [a, b]
	}));
}

export const getAllNeighbors = <T extends unknown>(
	grid: T[][],
	[i, j]: Coords
): Point<T>[] => {
	const neighborIndices: Coords[] = [
		[i - 1, j - 1],
		[i - 1, j],
		[i - 1, j + 1],

		[i, j - 1],
		[i, j + 1],

		[i + 1, j - 1],
		[i + 1, j],
		[i + 1, j + 1]
	];

	const validIndices = neighborIndices.filter(isValidIndex(grid));

	return validIndices.map(([i, j]) => ({
		value: grid[i][j],
		position: [i, j]
	}));
};

export const getCornerNeighbors = <T extends unknown>(
	grid: T[][],
	[i, j]: Coords
): Point<T>[] => {
	const neighborIndices: Coords[] = [
		[i - 1, j - 1],
		[i - 1, j + 1],
		[i + 1, j - 1],
		[i + 1, j + 1]
	];

	const validIndices = neighborIndices.filter(isValidIndex(grid));

	return validIndices.map(([i, j]) => ({
		value: grid[i][j],
		position: [i, j]
	}));
};

export function codec(input: string): Coords;
export function codec(input: Coords): string;
export function codec(input: string | Coords): Coords | string {
	if (isArray(input)) {
		return `${input[0]},${input[1]}`;
	}
	return input.split(',').map((e) => parseInt(e)) as Coords;
}

export const transpose = <T extends unknown>(m: T[][]) =>
	m[0].map((x, i) => m.map((x) => x[i]));

export const getPairs = <T>(arr: T[]) =>
	arr.map((v, i) => arr.slice(i + 1).map((w) => [v, w])).flat();

export const findIndicesOf = (
	searchStr: string,
	str: string,
	caseSensitive: boolean = true
) => {
	var searchStrLen = searchStr.length;
	if (searchStrLen == 0) {
		return [];
	}
	var startIndex = 0,
		index,
		indices = [];
	if (!caseSensitive) {
		str = str.toLowerCase();
		searchStr = searchStr.toLowerCase();
	}
	while ((index = str.indexOf(searchStr, startIndex)) > -1) {
		indices.push(index);
		startIndex = index + searchStrLen;
	}
	return indices;
};

export const DIRECTIONS = [
	'top-left',
	'top',
	'top-right',
	'left',
	'right',
	'bottom-left',
	'bottom',
	'bottom-right'
] as const;
export type Direction = (typeof DIRECTIONS)[number];
type Increment = -1 | 0 | 1;
export type NumericDirection = [Increment, Increment];
const DIRECTION_TO_INCREMENTS = new Map<Direction, NumericDirection>();
DIRECTION_TO_INCREMENTS.set('top-left', [-1, -1]);
DIRECTION_TO_INCREMENTS.set('top', [-1, 0]);
DIRECTION_TO_INCREMENTS.set('top-right', [-1, 1]);
DIRECTION_TO_INCREMENTS.set('left', [0, -1]);
DIRECTION_TO_INCREMENTS.set('right', [0, 1]);
DIRECTION_TO_INCREMENTS.set('bottom-left', [1, -1]);
DIRECTION_TO_INCREMENTS.set('bottom', [1, 0]);
DIRECTION_TO_INCREMENTS.set('bottom-right', [1, 1]);

const INCREMENTS_TO_DIRECTION = new Map<string, Direction>();
INCREMENTS_TO_DIRECTION.set('-1,-1', 'top-left');
INCREMENTS_TO_DIRECTION.set('-1,0', 'top');
INCREMENTS_TO_DIRECTION.set('-1,1', 'top-right');
INCREMENTS_TO_DIRECTION.set('0,-1', 'left');
INCREMENTS_TO_DIRECTION.set('0,1', 'right');
INCREMENTS_TO_DIRECTION.set('1,-1', 'bottom-left');
INCREMENTS_TO_DIRECTION.set('1,0', 'bottom');
INCREMENTS_TO_DIRECTION.set('1,1', 'bottom-right');

export function getDirection(input: Direction): NumericDirection;
export function getDirection(input: NumericDirection): Direction;
export function getDirection(
	input: Direction | NumericDirection
): NumericDirection | Direction {
	if (isArray(input)) {
		return INCREMENTS_TO_DIRECTION.get(codec(input));
	}
	return DIRECTION_TO_INCREMENTS.get(input);
}

export const getAllNeighborsInDirectionUntilEdge = <T extends unknown>(
	grid: T[][],
	[i, j]: Coords,
	direction: Direction = 'top-left'
): Point<T>[] => {
	const { i: iIncrement, j: jIncrement } = DIRECTION_TO_INCREMENTS[direction];

	const neighbors: Point<T>[] = [];

	let currentI = i;
	let currentJ = j;
	while (isValidIndex(grid)([currentI, currentJ])) {
		neighbors.push({
			position: [currentI, currentJ],
			value: grid[currentI][currentJ]
		});
		currentI += iIncrement;
		currentJ += jIncrement;
	}

	return neighbors;
};

export function combinations<T>(
	items: T[],
	size: number = items.length
): T[][] {
	const combinations: T[][] = [];
	const stack: number[] = [];
	let i = 0;

	size = Math.min(items.length, size);

	while (true) {
		if (stack.length === size) {
			combinations.push(stack.map((index) => items[index]));
			i = stack.pop()! + 1;
		}

		if (i >= items.length) {
			if (stack.length === 0) {
				break;
			}
			i = stack.pop()! + 1;
		} else {
			stack.push(i++);
		}
	}

	return combinations;
}

export function permutations<T>(
	items: T[],
	size: number = items.length
): T[][] {
	if (!size) {
		return [[]];
	}

	// If size is greater than items.length, reset size.
	size = Math.min(items.length, size);

	return items.flatMap((item) => {
		return permutations(
			items.filter((it) => it !== item),
			size - 1
		).map((permutation) => [item, ...permutation]);
	});
}

export const sum = (list: number[]) => list.reduce((a, b) => a + b, 0);

export const RELATIVE_INT_REGEX = /-?\d+/g;
export const NATURAL_INT_REGEX = /\d+/g;
export const extractInts = (
	input: string,
	includeRelatives: boolean = true
): number[] => {
	const matches = input.match(
		includeRelatives ? RELATIVE_INT_REGEX : NATURAL_INT_REGEX
	);
	return matches ? matches.map(Number) : [];
};

export const RELATIVE_FLOAT_REGEX = /-?\d+(\.\d+)?/g;
export const NATURAL_FLOAT_REGEX = /\d+(\.\d+)?/g;
export const extractFloats = (
	input: string,
	includeRelatives: boolean = true
): number[] => {
	const matches = input.match(
		includeRelatives ? RELATIVE_FLOAT_REGEX : NATURAL_FLOAT_REGEX
	);
	return matches ? matches.map(Number) : [];
};
