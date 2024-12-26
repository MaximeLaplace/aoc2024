import {
	Coords,
	Direction,
	getAllNeighborsInDirectionUntilEdge
} from '../../utils';
import { Map, parseInput } from './parseInput';

const moveFish = (map: Map, direction: Direction, [i, j]: Coords) => {
	const line = getAllNeighborsInDirectionUntilEdge(map, [i, j], direction);

	const lineValues = line.map(({ value }) => value);
	const firstWall = lineValues.indexOf('#');
	const firstSpace = lineValues.indexOf('.');

	// no space or space after wall --> cannot move
	if (firstSpace === -1 || firstSpace > firstWall) {
		return {
			newI: i,
			newJ: j,
			newMap: map
		};
	}

	// moving at least to robot
	const [newI, newJ] = line[1].position;
	const newMap = map.map((l) => [...l]);

	for (let i = 1; i < firstSpace + 1; i++) {
		newMap[line[i].position[0]][line[i].position[1]] =
			map[line[i - 1].position[0]][line[i - 1].position[1]];
	}
	newMap[i][j] = '.';

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
			if (map[i][j] === 'O') {
				sum += 100 * i + j;
			}
		}
	}
	return sum;
};

export const part1 = (rawInput: string) => {
	const input = parseInput(rawInput);

	let currI = 0;
	let currJ = 0;

	for (let i = 0; i < input.map.length; i++) {
		for (let j = 0; j < input.map[i].length; j++) {
			if (input.map[i][j] === '@') {
				currI = i;
				currJ = j;
				break;
			}
		}
		if (currI !== 0 || currJ !== 0) {
			break;
		}
	}

	let map = [...input.map];
	let i = 0;
	for (const direction of input.moves) {
		const { newI, newJ, newMap } = moveFish(map, direction, [currI, currJ]);
		currI = newI;
		currJ = newJ;
		map = [...newMap];
		i++;
	}

	return getMapScore(map);
};
