/* 
	Target Functions
*/

import { TileTypes } from '$lib/classes/tiles.svelte.js';

export const targetSingle = (tile) => {
	return [tile];
};

export const targetLine = (tile, tiles, weapon) => {
	if (!tile || !tiles) return [];

	const targets = tiles.filter((targetTile) => targetTile.coordinates.x === tile.coordinates.x);
	// const limit = targets.map((tile) => tile.tileType === TileTypes.Obstacle);
	const limit = targets.reduce((acc, tile) => {
		if (tile.tileType === TileTypes.Obstacle && tile.coordinates.y < acc) {
			acc = tile.coordinates.y;
		}
		return acc;
	}, Infinity);

	// Consider range
	const filteredTargets = targets.filter(
		(targetTile) => targetTile.coordinates.y < limit && targetTile.coordinates.y < weapon.range
	);

	return filteredTargets;
};

export const targetCluster = (tile, tiles, weapon) => {
	if (!tile || !tiles) return [];

	//Initialize
	const visited = new Set();
	const cluster = [];

	const traverse = (currentTile) => {
		visited.add(currentTile);
		cluster.push(currentTile);

		// Check all adjacent monsters
		let adjacentMonsters = getAdjacentMonsters(currentTile, tiles);

		adjacentMonsters.forEach((adjacentMonster) => {
			// Filter out invalid monsters
			if (visited.has(adjacentMonster)) return;
			if (adjacentMonster.type !== currentTile.type) return;
			if (getDistance(tile, adjacentMonster) > weapon.range) return;

			traverse(adjacentMonster);
		});
	};

	// Start the traversal
	traverse(tile);

	if (cluster.length < weapon.targetMin) return [];

	return cluster;
};

const getAdjacentMonsters = (tile, tiles) => {
	if (!tile || !tiles) return [];

	return tiles.filter((otherTile) => {
		return (
			(Math.abs(tile.coordinates.x - otherTile.coordinates.x) === 1 &&
				Math.abs(tile.coordinates.y - otherTile.coordinates.y) === 0) ||
			(Math.abs(tile.coordinates.x - otherTile.coordinates.x) === 0 &&
				Math.abs(tile.coordinates.y - otherTile.coordinates.y) === 1)
		);
	});
};

const getDistance = (tile, otherTile) => {
	return Math.sqrt(
		Math.pow(Math.abs(tile.coordinates.x - otherTile.coordinates.x), 2) +
			Math.pow(Math.abs(tile.coordinates.y - otherTile.coordinates.y), 2)
	);
};

/* 
	Attacking Functions
*/

export const attackMonsters = (monsters, weapon) => {
	const killedMonsters = [];

	// Do the damage
	monsters.forEach((monster) => {
		monster.currentHealth = Math.max(monster.currentHealth - weapon.damage, 0);
		if (monster.currentHealth < 1) {
			killedMonsters.push(monster);
		}
	});

	return killedMonsters;
};
