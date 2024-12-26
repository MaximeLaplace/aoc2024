type Coordinate = [number, number];

export function shortestPathLength(
	grid: string[][],
	start: Coordinate,
	end: Coordinate
): number {
	const rows = grid.length;
	const cols = grid[0].length;
	const directions = [
		[-1, 0],
		[1, 0],
		[0, -1],
		[0, 1]
	];

	function isValid(x: number, y: number): boolean {
		return x >= 0 && x < rows && y >= 0 && y < cols && grid[x][y] === '.';
	}

	const queue: [number, number, number][] = [[start[0], start[1], 0]];
	const visited: Set<string> = new Set();
	visited.add(`${start[0]},${start[1]}`);

	while (queue.length > 0) {
		const [x, y, distance] = queue.shift()!;

		if (x === end[0] && y === end[1]) {
			return distance;
		}

		for (const [dx, dy] of directions) {
			const newX = x + dx;
			const newY = y + dy;

			if (isValid(newX, newY) && !visited.has(`${newX},${newY}`)) {
				queue.push([newX, newY, distance + 1]);
				visited.add(`${newX},${newY}`);
			}
		}
	}

	return -1;
}
