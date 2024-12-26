type File = {
	id: number;
	count: number;
};

export const part2 = (input: string) => {
	let fileSystem: File[] = [];
	let file = 0;

	for (let i = 0; i < input.length; i++) {
		if (i % 2 == 0) fileSystem.push({ id: file++, count: parseInt(input[i]) });
		else fileSystem.push({ id: -1, count: parseInt(input[i]) });
	}

	const reducedFileSystem: File[] = [];

	for (let i = 0; i < fileSystem.length; i++) {
		const file = fileSystem[i];

		if (file.id === -1) {
			let scan = fileSystem.length - 1;
			while (file.count > 0 && i < scan) {
				if (
					fileSystem[scan].id !== -1 &&
					fileSystem[scan].count <= file.count
				) {
					reducedFileSystem.push({ ...fileSystem[scan] });
					file.count -= fileSystem[scan].count;
					fileSystem[scan].id = -1;
					scan = fileSystem.length - 1;
				}
				scan--;
			}

			if (file.count != 0) reducedFileSystem.push(file);
		} else if (file.count != 0) {
			reducedFileSystem.push({ ...file });
		}
	}

	let index = 0;
	let sum = 0;
	let current = reducedFileSystem.shift();

	while (reducedFileSystem.length != 0) {
		if (current === undefined) break;

		if (current.id !== -1) {
			sum += current.id * index++;
			current.count--;
		} else {
			index += current.count;
			current.count = 0;
		}

		if (current.count === 0) current = reducedFileSystem.shift();
	}

	return sum;
};
