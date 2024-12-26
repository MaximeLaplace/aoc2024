type Coordinate = [number, number];

export function shortestPath(
	grid: string[][],
	start: Coordinate,
	end: Coordinate,
	wall: string = '#'
): Coordinate[] {
	const rows = grid.length;
	const cols = grid[0].length;

	const directions = [
		[-1, 0],
		[1, 0],
		[0, -1],
		[0, 1]
	];

	function isValid(x: number, y: number): boolean {
		return x >= 0 && x < rows && y >= 0 && y < cols && grid[x][y] !== wall;
	}

	const queue: [number, number][] = [start];
	const visited: Set<string> = new Set();
	visited.add(`${start[0]},${start[1]}`);

	const parent: Map<string, string> = new Map();

	while (queue.length > 0) {
		const [x, y] = queue.shift()!;

		if (x === end[0] && y === end[1]) {
			const path: Coordinate[] = [];
			let current = `${x},${y}`;
			while (current) {
				const [cx, cy] = current.split(',').map(Number);
				path.push([cx, cy]);
				current = parent.get(current) || '';
			}
			path.reverse();
			return path;
		}

		for (const [dx, dy] of directions) {
			const newX = x + dx;
			const newY = y + dy;
			const newKey = `${newX},${newY}`;

			if (isValid(newX, newY) && !visited.has(newKey)) {
				queue.push([newX, newY]);
				visited.add(newKey);
				parent.set(newKey, `${x},${y}`);
			}
		}
	}

	return [];
}
