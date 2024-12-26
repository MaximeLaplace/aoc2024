export const part1 = (input: string): number => {
	const files = [];
	const spaces = [];

	for (let i = 0; i < input.length; i++) {
		if (i % 2 === 0) {
			files.push(parseInt(input[i]));
		} else {
			spaces.push(parseInt(input[i]));
		}
	}

	let result = 0;
	let m = 0;
	for (let i = 0; i < spaces.length + files.length; i++) {
		if (i % 2 === 0) {
			for (let j = 0; j < files[i / 2]; j++) {
				result += m * (i / 2);
				m++;
			}
			files[i / 2] = 0;
		} else {
			for (let j = 0; j < spaces[(i - 1) / 2]; j++) {
				let index = files.length - 1;
				while (files[index] === 0) {
					index--;
				}

				if (index === -1) {
					continue;
				}

				files[index]--;
				result += m * index;
				m++;
			}
		}
	}

	return result;
};
