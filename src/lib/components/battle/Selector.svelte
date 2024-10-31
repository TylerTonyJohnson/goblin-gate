<script>
	import { getPreferences } from '$lib/preferences.svelte';
	import { Directions } from '$lib/enums.js';

	let { attachedTiles } = $props();

	const preferences = getPreferences();

	const padding = 8;
	const radius = 20 / 100; // Percent

	let left = $derived(
		attachedTiles.reduce((acc, tile) => Math.min(acc, tile.coordinates.x), Infinity)
	);
	let right = $derived(attachedTiles.reduce((acc, tile) => Math.max(acc, tile.coordinates.x), 0));
	let bottom = $derived(
		attachedTiles.reduce((acc, tile) => Math.min(acc, tile.coordinates.y), Infinity)
	);
	let top = $derived(attachedTiles.reduce((acc, tile) => Math.max(acc, tile.coordinates.y), 0));

	let width = $derived(right - left + 1);
	let height = $derived(top - bottom + 1);

	let points = $derived(getPoints(attachedTiles, left, bottom, height));
	let pointString = $derived(getPath(points));

	/* 
		Functions
	*/

	function getPoints(tiles, leftOffset, bottomOffset, height) {
		if (!tiles.length) return [];

		// Extract the coordinates of the tiles
		const tileCoords = tiles.map((tile) => {
			return tile.coordinates;
		});

		// console.table('tileCoords', tileCoords);

		// Offset the coordinates to start at 0,0
		const offsetTileCoords = tileCoords.map((point) => {
			return { x: point.x - leftOffset, y: point.y - bottomOffset };
		});

		// console.table('offsetTileCoords', offsetTileCoords);

		// Flip the y axis to match the SVG coordinate system
		const flippedTiles = offsetTileCoords.map((tile) => {
			return { x: tile.x, y: height - tile.y - 1 };
		});

		// console.table('flippedTiles', flippedTiles);

		// Get the corner points of the tiles
		const cornerPoints = flippedTiles.flatMap((tile) => {
			return [
				// Top left
				{ x: tile.x, y: tile.y },
				// Top right
				{ x: tile.x + 1, y: tile.y },
				// Bottom left
				{ x: tile.x, y: tile.y + 1 },
				// Bottom right
				{ x: tile.x + 1, y: tile.y + 1 }
			];
		});

		// console.table('cornerPoints', cornerPoints);

		// Get unique points from corner points
		const uniquePoints = [];

		cornerPoints.forEach((point) => {
			if (!uniquePoints.some((p) => p.x === point.x && p.y === point.y)) {
				uniquePoints.push(point);
			}
		});

		// Get ordered points from unique points
		const orderedPoints = getOrderedPoints(uniquePoints);

		// ----

		// Get ordered points from unordered points
		function getOrderedPoints(points) {
			const orderedPoints = [];
			const visitedPoints = new Set([]);

			// Set first point
			const smallestPoint = points.reduce((acc, p) => (p.x < acc.x ? p : p.y < acc.y ? p : acc));

			// console.log('smallestPoint', smallestPoint);

			orderedPoints.push(smallestPoint);
			visitedPoints.add(smallestPoint);

			let prevPoint = smallestPoint;
			let prevDir; // Last direction travelled

			// Loop through points to find the next point
			for (let i = 1; i < points.length; i++) {
				// Find next direction to look
				let checkDir = getNextDirection(prevDir, 3) || Directions.Left;

				for (let j = 0; j < 4; j++) {
					// Calculate coordinates to check
					const checkCoords = { x: prevPoint.x + checkDir.x, y: prevPoint.y + checkDir.y };

					// Check coordinates for exising point
					const checkedPoint = points.find(
						(point) => point.x === checkCoords.x && point.y === checkCoords.y
					);

					// If a point is found, add it to the list and stop looking
					if (checkedPoint && !visitedPoints.has(checkedPoint)) {
						orderedPoints.push(checkedPoint);
						visitedPoints.add(checkedPoint);
						prevPoint = checkedPoint;
						prevDir = checkDir;
						break;
					} else {
						checkDir = getNextDirection(checkDir, 1);
					}
				}
			}

			return orderedPoints;

			// ----

			function getNextDirection(currentDirection, index = 1) {
				let finalDirection = currentDirection;

				for (let i = 0; i < index; i++) {
					switch (finalDirection) {
						case Directions.Left:
							finalDirection = Directions.Up;
							break;
						case Directions.Right:
							finalDirection = Directions.Down;
							break;
						case Directions.Up:
							finalDirection = Directions.Right;
							break;
						case Directions.Down:
							finalDirection = Directions.Left;
							break;
					}
				}

				return finalDirection;
			}
		}

		// console.table('orderedPoints', orderedPoints);

		return orderedPoints;
	}

	function getPath(uniquePoints) {
		if (!uniquePoints.length) return '';

		let path = '';
		for (let i = 0; i <= uniquePoints.length + 1; i++) {
			const point = getPoint(i);
			const prevPoint = getPoint(i - 1);
			const nextPoint = getPoint(i + 1);

			const nextDir = { x: nextPoint.x - point.x, y: nextPoint.y - point.y };
			const prevDir = { x: point.x - prevPoint.x, y: point.y - prevPoint.y };

			// Figure out if we're turning or not
			const isStraightLine = prevPoint?.x === nextPoint?.x || prevPoint?.y === nextPoint?.y;
			let curveStart, curveCorner, curveEnd;

			if (!isStraightLine) {
				// Start of curve is point + radius * direction
				curveStart = { x: point.x - prevDir.x * radius, y: point.y - prevDir.y * radius }; // Absolute
				// Corner of curve is point
				curveCorner = { x: point.x, y: point.y }; // Absolute
				// End of curve is point + radius * direction
				curveEnd = { x: point.x + nextDir.x * radius, y: point.y + nextDir.y * radius }; // Absolute
			}

			switch (true) {
				// Start with the first point, assume it's the origin
				case i === 0:
					path += isStraightLine ? `M${point.x},${point.y} ` : `M${curveEnd.x},${curveEnd.y} `;
					break;

				// If it's a straight line, just go to the next point
				case i < uniquePoints.length && isStraightLine:
					path += `L${point.x},${point.y} `;
					break;

				// If it's a curve, draw a line to the curve start, then a curve to the curve end
				case i < uniquePoints.length + 1 && !isStraightLine:
					path += `L${curveStart.x},${curveStart.y} `;
					path += `Q${curveCorner.x},${curveCorner.y} ${curveEnd.x},${curveEnd.y} `;
					break;

				// At the end, close the path
				case i === uniquePoints.length + 1:
					path += 'Z';
					break;
			}
		}
		return path;

		function getPoint(index, offset = 0) {
			const rawIndex = (index + offset) % uniquePoints.length;

			const finalIndex = rawIndex < 0 ? rawIndex + uniquePoints.length : rawIndex;

			return points[finalIndex];
		}
	}
</script>

<div
	class="frame"
	style={`
        left: ${left * preferences.tileSize - padding / 2}px; 
        bottom: ${bottom * preferences.tileSize - padding / 2}px;
        width: ${preferences.tileSize * width + padding}px;
        height: ${preferences.tileSize * height + padding}px;
    `}
>
	<svg
		class="selector"
		viewBox="-10px -10px {width} {height}"
		preserveAspectRatio="none"
		xmlns="http://www.w3.org/2000/svg"
	>
		<path class="selector-path" d={pointString} />
		<!-- {#each points as point}
			<circle cx={point.x} cy={point.y} r="0.1" fill="green" />
		{/each} -->
	</svg>
</div>

<style>
	.frame {
		position: absolute;
		/* background-color: red; */
		/* border: solid orange 5px; */
		/* border-radius: 1.25rem; */
		/* z-index: 100; */
		pointer-events: none;
		transition: all 1s ease-out;
	}

	.selector {
		position: absolute;
		width: 100%;
		height: 100%;
		z-index: 100;
		/* translate: -5% -5%; */
		/* background-color: red; */
		/* border: solid blue 5px; */
	}

	.selector-path {
		fill: none;
		stroke: green;
		stroke-width: 5;
		vector-effect: non-scaling-stroke;
	}
</style>
