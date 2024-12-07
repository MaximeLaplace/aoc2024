import { isArray } from 'lodash';

type Coords = [number, number];
type Point<T extends unknown> = {
	value: T;
	position: Coords;
};

export const isValidIndex =
	<T extends unknown>(grid: T[][]) =>
	([i, j]: Coords) =>
		i >= 0 && i < grid.length && j >= 0 && j < grid[0].length;

export const getAdjacentNeighbors = <T extends unknown>(
	grid: T[][],
	[i, j]: Coords
): Point<T>[] => {
	const neighborIndices: Coords[] = [
		[i - 1, j],
		[i, j - 1],
		[i, j + 1],
		[i + 1, j]
	];

	const validIndices = neighborIndices.filter(isValidIndex(grid));

	return validIndices.map(([i, j]) => ({
		value: grid[i][j],
		position: [i, j]
	}));
};

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
		return `${input[0]}-${input[1]}`;
	}

	return input.split('-').map((e) => parseInt(e)) as Coords;
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
const DIRECTION_TO_INCREMENTS: Record<
	Direction,
	{ i: Increment; j: Increment }
> = {
	'top-left': { i: -1, j: -1 },
	top: { i: -1, j: 0 },
	'top-right': { i: -1, j: 1 },
	left: { i: 0, j: -1 },
	right: { i: 0, j: 1 },
	'bottom-left': { i: 1, j: -1 },
	bottom: { i: 1, j: 0 },
	'bottom-right': { i: 1, j: 1 }
};

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
