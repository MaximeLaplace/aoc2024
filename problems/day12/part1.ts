import { codec, Coords, getAdjacentNeighbors } from '../../utils';
import { ParsedInput, parseInput } from './parseInput';

const getRegionRec = (input: ParsedInput, [i, j]: Coords) => {
	const letter = input[i][j];
	const seen = new Set<string>();

	const toVisit: Coords[] = [[i, j]];

	while (toVisit.length > 0) {
		const tile = toVisit.pop();
		seen.add(codec(tile));

		const newNeighbors = getAdjacentNeighbors(input, tile)
			.filter(
				({ value, position }) => value === letter && !seen.has(codec(position))
			)
			.map(({ position }) => position);

		if (input[i][j] === 'R') {
		}

		toVisit.push(...newNeighbors);
	}

	return Array.from(seen.values()).map((v) => codec(v));
};

export const getRegions = (input: ParsedInput) => {
	const regions: Coords[][] = [];
	const seen = new Set<string>();
	for (let i = 0; i < input.length; i++) {
		for (let j = 0; j < input.length; j++) {
			if (seen.has(codec([i, j]))) {
				continue;
			}

			const region = getRegionRec(input, [i, j]);

			regions.push(region);
			region.forEach((v) => seen.add(codec(v)));
		}
	}
	return regions;
};

const getRegionScore = (input: ParsedInput, tiles: Coords[]) => {
	let freesides = 0;

	const tilesS = new Set(tiles.map(codec));

	for (const tile of tiles) {
		const n = getAdjacentNeighbors(input, tile).filter(({ position }) =>
			tilesS.has(codec(position))
		);
		freesides += 4 - n.length;
	}

	return tiles.length * freesides;
};

export const part1 = (rawInput: string) => {
	const input = parseInput(rawInput);

	const regions = getRegions(input);

	return regions.reduce((a, b) => a + getRegionScore(input, b), 0);
};
