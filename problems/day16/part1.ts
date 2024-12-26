import {
	codec,
	Coords,
	Direction,
	getAdjacentNeighbors,
	getDirection,
	NumericDirection
} from '../../utils';
import { ParsedInput } from './parseInput';

type Path = {
	current: Coords;
	direction: Direction;
	path: Coords[];
	score: number;
};

function getNextDirection(curr: Coords, next: Coords) {
	const increment = [next[0] - curr[0], next[1] - curr[1]] as NumericDirection;
	return getDirection(increment);
}

function encodeTile(ij: Coords, d: Direction) {
	return `${codec(ij)},${d}`;
}

export const getBestPaths = (input: ParsedInput) => {
	let start: Coords = [0, 0];
	for (let i = 0; i < input.length; i++) {
		for (let j = 0; j < input[i].length; j++) {
			if (input[i][j] === 'S') {
				start = [i, j];
			}
		}
	}

	const paths: Path[] = [
		{
			current: start,
			direction: 'right',
			path: [start],
			score: 0
		}
	];

	const seen = new Map<string, number>();
	seen.set(encodeTile(start, 'right'), 0);

	let minScore: number = Infinity;
	const bestPaths = [];

	while (paths.length > 0) {
		paths.sort((a, b) => a.score - b.score);
		const path = paths.shift();

		const currentTileCode = encodeTile(path.current, path.direction);
		const previouslySeen = seen.get(currentTileCode);
		if (previouslySeen && previouslySeen < path.score) {
			continue;
		}
		seen.set(currentTileCode, path.score);

		if (path.score > minScore) {
			return { bestPaths, minScore };
		}

		if (input[path.current[0]][path.current[1]] === 'E') {
			minScore = path.score;
			bestPaths.push(path.path);
		}

		const nextTiles = getAdjacentNeighbors(input, path.current).filter(
			({ value }) => value !== '#'
		);

		nextTiles.forEach(({ position: p }) => {
			const nextDir = getNextDirection(path.current, p);
			const isSameDir = nextDir === path.direction;
			const nextScore = path.score + (isSameDir ? 1 : 1001);
			const nextPath = [...path.path, p];

			paths.push({
				current: p,
				path: nextPath,
				score: nextScore,
				direction: nextDir
			});
		});
	}

	return { bestPaths, minScore };
};

export const part1 = (input: ParsedInput): number => {
	return getBestPaths(input).minScore;
};
