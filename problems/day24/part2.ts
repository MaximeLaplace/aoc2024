import { cachify } from '../../utils';
import { Gate, ParsedInput } from './parseInput';
import { runGates } from './part1';

function addBinaryStrings(bin1: string, bin2: string): string {
	let carry = 0;
	let result = '';

	if (bin1.length !== bin2.length) {
		throw new Error('Binary strings must have the same length');
	}

	for (let i = bin1.length - 1; i >= 0; i--) {
		const bit1 = parseInt(bin1[i], 10);
		const bit2 = parseInt(bin2[i], 10);
		const sum = bit1 + bit2 + carry;
		result = (sum % 2) + result;
		carry = Math.floor(sum / 2);
	}
	if (carry) {
		result = '1' + result;
	}

	return result;
}

const getRandomAnsiColor = (): string => {
	// ANSI color codes for 10 colors (foreground)
	const colors = [
		'\x1b[31m', // Red
		'\x1b[32m', // Green
		'\x1b[33m', // Yellow
		'\x1b[34m', // Blue
		'\x1b[35m', // Magenta
		'\x1b[36m', // Cyan
		'\x1b[37m', // White
		'\x1b[91m', // Bright Red
		'\x1b[92m', // Bright Green
		'\x1b[93m' // Bright Yellow
	];
	const randomIndex = Math.floor(Math.random() * colors.length);
	return colors[randomIndex];
};

const buildInspect = (wires: Set<string>, gatesMap: Map<string, Gate>) => {
	const inspectCore = (op: string, depth = 0) => {
		if (wires.has(op) || depth >= 3) {
			return op;
		}
		const op1 = inspectCore(gatesMap.get(op).inputs[0], depth + 1);
		const op2 = inspectCore(gatesMap.get(op).inputs[1], depth + 1);
		// ANSI colors just made it easier to read, but it's poorly coded tbh
		if (gatesMap.get(op).type === 'AND')
			return `${getRandomAnsiColor()}${op}[(${op1}) & (${op2})]\x1b[0m`;
		if (gatesMap.get(op).type === 'OR')
			return `${getRandomAnsiColor()}${op}[(${op1}) | (${op2})]\x1b[0m`;
		if (gatesMap.get(op).type === 'XOR')
			return `${getRandomAnsiColor()}${op}[(${op1}) ^ (${op2})]\x1b[0m`;
	};
	return cachify(inspectCore);
};

export const part2 = (input: ParsedInput): void => {
	let x = '';
	let y = '';
	const ws = [...input.wires.entries()]
		.toSorted(([a], [b]) => b.localeCompare(a))
		.map(([, e]) => e);
	for (let i = 0; i < ws.length; i++) {
		if (i > 44) y += ws[i];
		else x += ws[i];
	}

	const expected = addBinaryStrings(x, y);
	const initialWires = new Set([...input.wires.keys()]);
	const actual = runGates(input);

	console.log('------------------------------');
	console.log(expected);
	console.log(actual);
	console.log('------------------------------');

	const gatesMap = new Map<string, Gate>();
	for (const gate of input.gates) gatesMap.set(gate.output, gate);

	const inspect = buildInspect(initialWires, gatesMap);

	/*
	 So here what I did is compare actual and expected result
	 And find the least important bit that was differing between the two
	 I than used inspect("z06") to see the gates it originated from.

	 I basically looked to rewire so that this property is true:

	 z{n} = (x{n} ^ y{n}) ^ (something of z{n-1})

	 I did not look much further, it always got me the correct swap.
	 After finding the swap, I re-ran the gates and find the next bit
	 that was differing from the expected result... up until I got all bits
	 right, which gave me 4 swaps in total.
	*/

	// The 4 bits that were differing, in order.
	console.log(inspect('z06'));
	console.log(inspect('z25'));
	console.log(inspect('z31'));
	console.log(inspect('z37'));

	//!SWAPS
	// z06, hwk, tnt, qmd, hgw, z31, hpc, z37, cgr
	//!SPAWS
};
