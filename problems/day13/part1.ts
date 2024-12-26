import { Machine, parseInput } from './parseInput';

const computeDelta = (machine: Machine) => {
	return machine.a.x * machine.b.y - machine.a.y * machine.b.x;
};

const isInt = (e: number) => Math.floor(e) === e;

const solve = (m: Machine) => {
	const delta = computeDelta(m);

	if (delta === 0) {
		return null;
	}

	const sol = {
		a: (m.t.x * m.b.y - m.t.y * m.b.x) / delta,
		b: (m.a.x * m.t.y - m.a.y * m.t.x) / delta
	};

	if (!isInt(sol.a) || !isInt(sol.b)) {
		return null;
	}

	return {
		a: (m.t.x * m.b.y - m.t.y * m.b.x) / delta,
		b: (m.a.x * m.t.y - m.a.y * m.t.x) / delta
	};
};

export const computeMachineCost = (machine: Machine): number => {
	const solution = solve(machine);

	if (solution === null) {
		return 0;
	}

	return 3 * solution.a + solution.b;
};

export const part1 = (rawInput: string): number => {
	const input = parseInput(rawInput);

	return input.reduce((a, b) => a + computeMachineCost(b), 0);
};
