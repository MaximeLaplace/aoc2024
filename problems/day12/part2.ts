import { uniqBy } from 'lodash';
import { codec, Coords, getAdjacentNeighbors } from '../../utils';
import { ParsedInput, parseInput } from './parseInput';
import { getRegions } from './part1';

const getRegionScore = (input: ParsedInput, tiles: Coords[]) => {
	const edgeTiles = [];
	const tilesS = new Set(tiles.map(codec));

	for (const tile of tiles) {
		const n = getAdjacentNeighbors(input, tile).filter(({ position }) =>
			tilesS.has(codec(position))
		);
		if (n.length < 4) {
			edgeTiles.push(tile);
		}
	}

	type Wall = { i: number; j: number; d: 'v' | 'h' };
	const walls: Wall[] = [];

	for (const [i, j] of edgeTiles) {
		const hasTopWall = i === 0 || input[i - 1]?.[j] !== input[i][j];
		const hasBottomWall =
			i === input.length || input[i + 1]?.[j] !== input[i][j];
		const hasLeftWall = j === 0 || input[i][j - 1] !== input[i][j];
		const hasRightWall =
			j === input[0].length || input[i][j + 1] !== input[i][j];

		if (hasTopWall) {
			walls.push({ i: i - 0.1, j, d: 'h' });
		}
		if (hasBottomWall) {
			walls.push({ i: i + 0.1, j, d: 'h' });
		}
		if (hasLeftWall) {
			walls.push({ i, j: j - 0.1, d: 'v' });
		}
		if (hasRightWall) {
			walls.push({ i, j: j + 0.1, d: 'v' });
		}
	}

	const wwalls = uniqBy(walls, (e) => `${e.d} ${e.i} ${e.j}`);

	const vWalls = wwalls
		.filter(({ d }) => d === 'v')
		.toSorted((a, b) => a.j * 1000 - b.j * 1000 + a.i - b.i);
	const hWalls = wwalls
		.filter(({ d }) => d === 'h')
		.toSorted((a, b) => a.i * 1000 - b.i * 1000 + a.j - b.j);

	let vWallsQ = 1;
	for (let i = 1; i < vWalls.length; i++) {
		if (
			vWalls[i].i - vWalls[i - 1].i === 1 &&
			vWalls[i].j === vWalls[i - 1].j
		) {
			continue;
		} else {
			vWallsQ++;
		}
	}

	const letter = input[tiles[0][0]][tiles[0][1]];

	let hWallsQ = 1;
	for (let i = 1; i < hWalls.length; i++) {
		if (
			hWalls[i].j - hWalls[i - 1].j === 1 &&
			hWalls[i].i === hWalls[i - 1].i
		) {
			if (letter === 'E') {
			}
			continue;
		} else {
			if (letter === 'E') {
			}
			hWallsQ++;
		}
	}
	return (hWallsQ + vWallsQ) * tiles.length;
};

export const part2 = (rawInput: string): number => {
	const input = parseInput(rawInput);

	const regions = getRegions(input);

	return regions.reduce((a, b) => a + getRegionScore(input, b), 0);
};
