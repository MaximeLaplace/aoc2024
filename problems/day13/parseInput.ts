export type Machine = {
	a: { x: number; y: number };
	b: { x: number; y: number };
	t: { x: number; y: number };
};

export type ParsedInput = Machine[];

export const parseInput = (input: string): ParsedInput => {
	const rawMachines = input.split('\n\n').map((l) => l.split('\n'));

	const machines = rawMachines.map(([a, b, target]) => {
		return {
			a: a
				.replace('Button A: X+', '')
				.replace(' Y+', '')
				.trim()
				.split(',')
				.map((e) => parseInt(e)),
			b: b
				.replace('Button B: X+', '')
				.replace(' Y+', '')
				.trim()
				.split(',')
				.map((e) => parseInt(e)),
			t: target
				.replace('Prize: X=', '')
				.replace(' Y=', '')
				.trim()
				.split(',')
				.map((e) => parseInt(e))
		};
	});

	return machines.map(({ a, b, t }) => ({
		a: { x: a[0], y: a[1] },
		b: { x: b[0], y: b[1] },
		t: { x: t[0], y: t[1] }
	}));
};
