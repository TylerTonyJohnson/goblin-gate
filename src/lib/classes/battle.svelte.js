import { seededGenerator } from '$lib/classes/random.svelte';
import { ObstacleTypes, getRandomObstacleMapping } from '$lib/classes/obstacles.svelte.js';
import { TileTypes } from '$lib/classes/tiles.svelte';
import { TreasureTypes } from '$lib/classes/treasure.svelte';
import { VillagerTypes } from '$lib/classes/villagers.svelte';

export class Battle {
	tilePool = $state([]);
	tileData = $state([]);
	stats = $state({});

	constructor(battleParameters, seed) {
		const {
			monsterCount,
			monsterMapping,
			dimensions,
			obstacleMapping,
			treasureMapping,
			villagerMapping
		} = {
			...battleParameters
		};

		this.monsterCount = monsterCount;
		this.monsterMapping = monsterMapping;
		this.dimensions = dimensions;
		this.obstacleMapping = obstacleMapping;
		this.treasureMapping = treasureMapping;
		this.villagerMapping = villagerMapping;

		this.randomGenerator = seededGenerator(seed);
		this.tilePool = this.createTilePool();

		// console.log(this.tilePool);
		this.setStats();

		// Fill in as much of the monsterData as we need.
		this.addRandomObstacles();
		this.fillTileData();
		this.updateStats();
	}

	setStats = () => {
		const initialHealth = this.tilePool
			.filter((tile) => tile.tileType === TileTypes.Monster)
			.reduce((acc, monster) => acc + monster.weight * monster.type.maxHealth, 0);

		this.stats = {
			maxHealth: initialHealth,
			currentHealth: initialHealth,
			attackCount: 0,
			attackEfficiency: 0,
			experienceGained: 0
		};
	};

	updateStats = () => {
		this.stats.currentHealth =
			this.tileData
				.filter((tile) => tile.tileType === TileTypes.Monster)
				.reduce((acc, monster) => acc + monster.currentHealth, 0) +
			this.tilePool
				.filter((tile) => tile.tileType === TileTypes.Monster)
				.reduce((acc, monster) => acc + monster.weight * monster.type.maxHealth, 0);

		this.stats.attackEfficiency = !this.stats.attackCount
			? 0
			: (this.stats.maxHealth - this.stats.currentHealth) / this.stats.attackCount;
	};

	createTilePool = () => {
		/* 
			Monsters first
		*/

		// Normalize the mapping and sort it by smallest to largest category
		const normalizedMapping = this.normalizeWeights(this.monsterMapping).sort(
			(a, b) => a.weight - b.weight
		);

		// Calculate the number of monsters of each type
		let tileCounts = [];
		for (let i = 0; i < normalizedMapping.length; i++) {
			let count = Math.floor(this.monsterCount * normalizedMapping[i].weight);

			if (count === 1) count = 2;

			// Any remainder goes to the last (and largest) monster type
			if (i < normalizedMapping.length - 1) {
				tileCounts.push({
					tileType: TileTypes.Monster,
					type: normalizedMapping[i].type,
					weight: count
				});
			} else {
				const remainder =
					this.monsterCount - tileCounts.reduce((acc, monster) => acc + monster.weight, 0);

				tileCounts.push({
					tileType: TileTypes.Monster,
					type: normalizedMapping[i].type,
					weight: remainder
				});
			}
		}

		/* 
			Treasures next
		*/
		tileCounts.push({
			tileType: TileTypes.Treasure,
			type: TreasureTypes.Chest,
			weight: this.treasureMapping
		});

		/* 
			Villagers next
		*/

		tileCounts.push({
			tileType: TileTypes.Villager,
			type: VillagerTypes.Prisoner,
			weight: this.villagerMapping
		});

		return tileCounts;
	};

	normalizeWeights = (mapping) => {
		const total = mapping.reduce((acc, tile) => acc + tile.weight, 0);

		const normalizedMapping = mapping.map((tile) => ({
			tileType: tile?.tileType,
			type: tile.type,
			weight: tile.weight / total
		}));

		return normalizedMapping;
	};

	// Remap weights by adding them up
	accumulateWeights = (normalizedMapping) => {
		let cumulativeWeight = 0;
		const cumulativeMapping = normalizedMapping.map((tile) => {
			cumulativeWeight += tile.weight;
			return { tileType: tile.tileType, type: tile.type, weight: cumulativeWeight };
		});

		return cumulativeMapping;
	};

	addRandomObstacles = () => {
		// Check if the is any mapping
		if (this.obstacleMapping.reduce((acc, obstacle) => acc + obstacle.weight, 0) <= 0) return;

		// Get random obstacle type
		const normalizedMapping = this.normalizeWeights(this.obstacleMapping);
		const cumulativeMapping = this.accumulateWeights(normalizedMapping);
		const randomValue = this.randomGenerator();

		const obstacleType = cumulativeMapping.find((tile) => {
			return randomValue <= tile.weight;
		}).type;

		// Get available size based on buffer
		const bottom = obstacleType.buffer;
		const top = this.dimensions.y - obstacleType.buffer;
		const width = this.dimensions.x;
		const height = top - bottom;

		// Get random mapping
		const obstacleMapping = getRandomObstacleMapping(this.randomGenerator());

		const rows = obstacleMapping.split('\n').map((row) => row.replace(/\t/g, '').trim());

		const mappingWidth = rows.reduce((acc, row) => (row.length > acc ? row.length : acc), 0);
		const mappingHeight = rows.length;

		// Get origin coordinates based on size of mapping
		const originWidth = width - mappingWidth + 1;
		const originHeight = height - mappingHeight + 1;

		const origin = {
			x: Math.floor(this.randomGenerator() * originWidth),
			y: Math.floor(this.randomGenerator() * originHeight) + bottom
		};

		// Turn the mapping into a list of coordinates
		const obstacleList = [];

		for (let i = 0; i < mappingWidth; i++) {
			for (let j = 0; j < mappingHeight; j++) {
				if (rows[j][i] === 'x') {
					obstacleList.push({ x: i + origin.x, y: j + origin.y });
				}
			}
		}

		// Place the obstacles in the tileData
		obstacleList.forEach((obstacle) => {
			this.tileData.push({
				id: crypto.randomUUID(),
				coordinates: { x: obstacle.x, y: obstacle.y },
				tileType: TileTypes.Obstacle,
				type: obstacleType
			});
		});
	};

	getObstacleSpaces = () => {
		const emptySpaces = [];

		for (let i = 0; i < this.dimensions.x; i++) {
			for (let j = 1; j <= this.dimensions.y - 2; j++) {
				const space = { x: i, y: j };

				emptySpaces.push(space);
			}
		}

		return emptySpaces;
	};

	fillTileData = () => {
		// Check if there are any monsters left to spawn
		if (this.tilePool.reduce((acc, tile) => acc + tile.weight, 0) < 1) return;

		// Find spawn spaces
		const spawnSpaces = this.getSpawnSpaces();

		if (spawnSpaces.length < 1) return;

		// For each empty space, create a monster
		spawnSpaces.forEach((emptySpace) => {
			// Check if there are any monsters left to spawn
			if (this.tilePool.reduce((acc, tile) => acc + tile.weight, 0) < 1) return;
			this.addTileFromPool(emptySpace);
		});

		this.shoveDown();

		this.fillTileData();
	};

	getSpawnSpaces = () => {
		const emptySpaces = [];

		for (let i = 0; i < this.dimensions.x; i++) {
			const space = { x: i, y: this.dimensions.y - 1 };
			if (
				!this.tileData.some(
					(monster) => monster.coordinates.x === space.x && monster.coordinates.y === space.y
				)
			) {
				emptySpaces.push(space);
			}
		}

		return emptySpaces;
	};

	addTileFromPool = (spawnSpace) => {
		// Calculate where the tile will land
		const landingSpace = this.getLandingSpace(spawnSpace);

		// Based on adjacency, get random tile from pool
		const tileFromPool = this.getTileFromPool();

		// console.log(tileFromPool);

		// Initialize the tile
		const initializedTile = this.initializeTile(tileFromPool, spawnSpace);

		// Decrement the weight of the tile in the pool
		this.tilePool.find(
			(tile) => tile.tileType === initializedTile.tileType && tile.type === initializedTile.type
		).weight -= 1;

		// Add the tile to the tileData
		this.tileData.push(initializedTile);
	};

	getTileFromPool = () => {
		// Accumulate weights
		let cumulativeWeight = 0;

		const tileWeights = this.normalizeWeights(this.tilePool.filter((tile) => tile.weight > 0));

		const cumulativeMapping = tileWeights.map((tile) => {
			cumulativeWeight += tile.weight;
			return { tileType: tile.tileType, type: tile.type, weight: cumulativeWeight };
		});

		// Find the tile type that corresponds to the random value
		const newTile = cumulativeMapping.find((tile) => {
			return this.randomGenerator() <= tile.weight;
		});

		return newTile;
	};

	initializeTile = (tile, spawnSpace) => {
		// Initialize monster data
		return {
			id: crypto.randomUUID(),
			coordinates: spawnSpace,
			tileType: tile.tileType,
			type: tile.type,
			...(tile.tileType === TileTypes.Monster
				? {
						maxHealth: tile.type.maxHealth,
						currentHealth: tile.type.maxHealth
					}
				: {})
		};
	};

	initializeObstacle = (monsterType, emptySpace) => {
		// Initialize monster data
		return {
			id: crypto.randomUUID(),
			coordinates: emptySpace,
			type: monsterType
		};
	};

	initializeTreasure = (monsterType, emptySpace) => {
		// Initialize monster data
		return {
			id: crypto.randomUUID(),
			coordinates: emptySpace,
			type: monsterType
		};
	};

	attackMonster = (monsters, player) => {
		// Check if we can attack
		if (!player.currentWeapon) return;

		const killedMonsters = [];
		monsters.forEach((monster) => {
			if (!this.isInHitbox(monster)) return;

			// Who should be attacked?
			const cluster = this.getCluster(monster, player.currentWeapon);

			// Do the damage
			cluster.forEach((clusterMonster) => {
				const killedMonster = this.damageMonsters(clusterMonster, player.currentWeapon.damage);
				if (killedMonster) killedMonsters.push(killedMonster);
			});
			this.stats.attackCount += 1;
		});

		if (killedMonsters.length > 0) {
			this.stats.experienceGained += this.calculateExperience(killedMonsters);
		}
		this.updateStats();
	};

	calculateExperience = (killedMonsters) => {
		// For each unique value, calculate the count
		const experience = killedMonsters.reduce((acc, monster) => acc + monster.type.xpDrop, 0);

		return experience;
	};

	damageMonsters = (monsters, damage) => {
		const killedMonsters = [];
		monsters.forEach((monster) => {
			monster.currentHealth = Math.max(monster.currentHealth - damage, 0);
			if (monster.currentHealth < 1) {
				this.killMonsters(monster);
				killedMonsters.push(monster);
			}
		});
		return killedMonsters;
	};

	killMonsters = (monsters) => {
		// console.log('Killing monsters', monsters);
		monsters.forEach((monster) => {
			// console.log('Killing monster', monster);
			const index = this.tileData.indexOf(monster);

			this.tileData.splice(index, 1);
		});

		this.shoveDown();
		this.fillTileData();
	};

	shoveDown = () => {
		// For each column, starting from the bottom, check if there's room to move down
		for (let i = 0; i < this.dimensions.x; i++) {
			for (let j = 0; j < this.dimensions.y; j++) {
				// Check if there's a tile at this location
				const tile = this.tileData.find((tile) => {
					return tile.coordinates.x === i && tile.coordinates.y === j;
				});

				if (!tile || tile.tileType === TileTypes.Obstacle) continue;

				// Find the next empty space
				const targetSpace = this.getLandingSpace(tile.coordinates);

				if (!targetSpace) continue;

				tile.coordinates = targetSpace;
			}
		}
	};

	getLandingSpace(space) {
		let furthestEmptySpace = null;

		// Iteratively check the next space until the furthest one is found
		for (let i = space.y - 1; i >= 0; i--) {
			const isTileOccupied = this.tileData.some(
				(tile) => tile.coordinates.x === space.x && tile.coordinates.y === i
			);

			// If there's no monster or obstacle, this is the furthest empty space
			if (!isTileOccupied) furthestEmptySpace = { x: space.x, y: i };
		}
		return furthestEmptySpace;
	}
}
