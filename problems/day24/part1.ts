import { ParsedInput } from './parseInput';

export const runGates = (input: ParsedInput): string => {
	const wires = input.wires;
	const gates = [...input.gates];

	while (gates.length > 0) {
		const gate = gates.shift();
		const {
			type,
			inputs: [w1s, w2s],
			output
		} = gate;

		if (wires.has(output)) {
			continue;
		}

		if (!wires.has(w1s) || !wires.has(w2s)) {
			gates.push(gate);
			continue;
		}

		const w1 = wires.get(w1s);
		const w2 = wires.get(w2s);

		if (type === 'AND') wires.set(output, w1 & w2);
		else if (type === 'OR') wires.set(output, w1 | w2);
		else if (type === 'XOR') wires.set(output, w1 ^ w2);
	}

	let s = '';

	const wz = Array.from(wires.entries()).filter(([k]) => k.startsWith('z'));
	wz.sort(([a], [b]) => b.localeCompare(a));

	s = wz.map(([, b]) => b).join('');

	return s;
};

export const part1 = (input: ParsedInput): number => {
	const s = runGates(input);
	return parseInt(s, 2);
};
