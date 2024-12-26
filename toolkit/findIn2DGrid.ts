type Coord = [number, number];

export const findIn2DGrid = (
	grid: string[][],
	needles: string[]
): (Coord | undefined)[] => {
	const coords: (Coord | undefined)[] = new Array(needles.length).fill(
		undefined
	);

	for (let i = 0; i < grid.length; i++) {
		for (let j = 0; j < grid[i].length; j++) {
			const val = grid[i][j];
			const indexOfNeedle = needles.indexOf(val);
			if (indexOfNeedle !== -1) {
				coords[indexOfNeedle] = [i, j];
			}
		}
	}

	return coords;
};
