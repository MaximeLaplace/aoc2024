import { groupBy, sortBy } from 'lodash';
import { parseInput, Robot } from './parseInput';
import { moveRobot } from './part1';

const LINE_LENGTH = 7;
const NUMBER_OF_LINES = 7;

const hasEasterEgg = (robots: Robot[]) => {
	const sortedRobotsPerLine = sortBy(
		Object.entries(groupBy(robots, (r) => r.p[0])),
		([a]) => parseInt(a)
	).map(([_, b]) => b);

	let lines = 0;

	for (const robotLine of sortedRobotsPerLine) {
		let currentLen = 1;
		const sortedRobots = sortBy(robotLine, (a) => a.p[1]);

		for (let i = 1; i < sortedRobots.length; i++) {
			if (sortedRobots[i].p[1] - sortedRobots[i - 1].p[1] === 1) {
				currentLen++;
			} else {
				currentLen = 1;
			}

			if (currentLen === LINE_LENGTH) {
				lines++;
				break;
			}
		}
	}

	return lines >= NUMBER_OF_LINES;
};

let X = 103;
let Y = 101;

export const part2 = (rawInput: string): number => {
	const input = parseInput(rawInput);

	let robots = [...input];
	let s = 0;
	while (true) {
		robots = robots.map((robot) => moveRobot(robot, 1, [X, Y]));
		s++;

		if (hasEasterEgg(robots)) {
			return s;
		}
	}
};
