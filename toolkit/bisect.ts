export function continuousBisect(
	min: number,
	max: number,
	callback: (value: number) => number,
	epsilon: number = 1e-7
): number | null {
	if (min > max) {
		throw new Error('Invalid range: min must be less than or equal to max.');
	}

	let minScore = callback(min);
	let maxScore = callback(max);

	if (minScore === 0) return min;
	if (maxScore === 0) return max;
	if ((minScore > 0 && maxScore > 0) || (minScore < 0 && maxScore < 0)) {
		throw new Error(
			'The callback function does not have opposite signs at min and max. Ensure the function flips signs.'
		);
	}

	// Binary search
	while (max - min > epsilon) {
		const mid = (min + max) / 2;
		const score = callback(mid);

		if (Math.abs(score) <= epsilon) return mid;

		if ((score > 0 && minScore > 0) || (score < 0 && minScore < 0)) {
			min = mid;
			minScore = score;
		} else {
			max = mid;
			maxScore = score;
		}
	}

	return (min + max) / 2;
}

export function bisect(
	min: number,
	max: number,
	callback: (value: number) => number
): number {
	if (min > max) {
		throw new Error('Invalid range: min must be less than or equal to max.');
	}

	let minScore = callback(min);
	let maxScore = callback(max);

	if (minScore === 0) return min;
	if (maxScore === 0) return max;
	if ((minScore > 0 && maxScore > 0) || (minScore < 0 && maxScore < 0)) {
		throw new Error(
			'The callback function does not have opposite signs at min and max. Ensure the function flips signs.'
		);
	}

	// Binary search
	while (min <= max) {
		const mid = Math.floor((min + max) / 2);
		const score = callback(mid);

		if (score === 0) return mid;

		if ((score > 0 && minScore > 0) || (score < 0 && minScore < 0)) {
			min = mid + 1;
			minScore = score;
		} else {
			max = mid - 1;
			maxScore = score;
		}
	}

	throw new Error('No integer found where the callback evaluates to 0.');
}
