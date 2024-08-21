import { seededGenerator } from '$lib/classes/random.svelte';
import { ObstacleTypes } from '$lib/classes/obstacles.svelte';

export class Battle {
	monsterPool = $state([]);
	monsterData = $state([]);
	obstacleData = $state([]);

	constructor(battleParameters, seed) {
		const { monsterCount, monsterMapping, dimensions, obstacleMapping } = { ...battleParameters };

		this.monsterCount = monsterCount;
		this.monsterMapping = monsterMapping;
		this.dimensions = dimensions;
		this.obstacleMapping = obstacleMapping;

		this.randomGenerator = seededGenerator(seed);
		this.monsterPool = this.createMonsterPool();
		this.maxHealth = this.monsterPool.reduce(
			(acc, monster) => acc + monster.weight * monster.type.maxHealth,
			0
		);

		// Fill in as much of the monsterData as we need.
		this.addRandomObstacles();
		this.fillMonsterData();
	}

	createMonsterPool = () => {
		// Normalize the mapping and sort it by smallest to largest category
		const normalizedMapping = this.normalizeWeights(this.monsterMapping).sort(
			(a, b) => a.weight - b.weight
		);

		// Calculate the number of monsters of each type
		let monsterCounts = [];
		for (let i = 0; i < normalizedMapping.length; i++) {
			let count = Math.floor(this.monsterCount * normalizedMapping[i].weight);

			if (count === 1) count = 2;

			// Any remainder goes to the last (and largest) monster type
			if (i < normalizedMapping.length - 1) {
				monsterCounts.push({ type: normalizedMapping[i].type, weight: count });
			} else {
				const remainder =
					this.monsterCount - monsterCounts.reduce((acc, monster) => acc + monster.weight, 0);

				monsterCounts.push({ type: normalizedMapping[i].type, weight: remainder });
			}
		}

		return monsterCounts;
	};

	normalizeWeights = (mapping) => {
		const total = mapping.reduce((acc, monster) => acc + monster.weight, 0);

		const normalizedMapping = mapping.map((monster) => ({
			type: monster.type,
			weight: monster.weight / total
		}));

		return normalizedMapping;
	};

	addRandomObstacles = () => {
		// Specify where the obstacles can be placed
		const range = {
			width: this.dimensions.x,
			height: this.dimensions.y - 1
		};

		// Calculate the number of obstacles to place
		const obstacleCount = Math.round(range.width * range.height * this.obstacleMapping);

		// Find suitable spaces to place obstacles
		const emptySpaces = this.getObstacleSpaces();

		// Place the obstacles in random suitable spaces
		for (let i = 0; i < obstacleCount; i++) {
			const emptySpace = emptySpaces.splice(
				Math.floor(this.randomGenerator() * emptySpaces.length),
				1
			)[0];

			this.obstacleData.push({
				id: crypto.randomUUID(),
				coordinates: emptySpace,
				type: ObstacleTypes.Rock
			});
		}
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

	fillMonsterData = () => {
		// Check if there are any monsters left to spawn
		if (this.monsterPool.reduce((acc, monster) => acc + monster.weight, 0) < 1) return;

		// Find spawn spaces
		const spawnSpaces = this.getSpawnSpaces();

		if (spawnSpaces.length < 1) return;

		// For each empty space, create a monster
		spawnSpaces.forEach((emptySpace) => {
			// Check if there are any monsters left to spawn
			if (this.monsterPool.reduce((acc, monster) => acc + monster.weight, 0) < 1) return;
			this.addRandomMonster(emptySpace);
		});

		this.shoveDown();

		this.fillMonsterData();
	};

	getSpawnSpaces = () => {
		const emptySpaces = [];

		for (let i = 0; i < this.dimensions.x; i++) {
			const space = { x: i, y: this.dimensions.y - 1 };
			if (
				!this.monsterData.some(
					(monster) => monster.coordinates.x === space.x && monster.coordinates.y === space.y
				) &&
				!this.obstacleData.some(
					(obstacle) => obstacle.coordinates.x === space.x && obstacle.coordinates.y === space.y
				)
			) {
				emptySpaces.push(space);
			}
		}

		return emptySpaces;
	};

	getEmptySpaces = () => {
		const emptySpaces = [];

		for (let i = 0; i < this.dimensions.y; i++) {
			for (let j = 0; j < this.dimensions.x; j++) {
				const space = { x: j, y: i };

				if (
					!this.monsterData.some(
						(monster) => monster.coordinates.x === space.x && monster.coordinates.y === space.y
					) &&
					!this.obstacleData.some(
						(obstacle) => obstacle.coordinates.x === space.x && obstacle.coordinates.y === space.y
					)
				) {
					emptySpaces.push(space);
				}
			}
		}

		return emptySpaces;
	};

	addRandomMonster = (emptySpace) => {
		// Get next monster type
		const monsterType = this.getNextMonsterType();

		// Initialize monster
		const initializedMonster = this.initializeMonster(monsterType, emptySpace);
		this.monsterData.push(initializedMonster);

		// Decrement monster count
		this.monsterPool.find((monster) => monster.type === monsterType).weight -= 1;
	};

	getNextMonsterType = () => {
		// Accumulate weights
		let cumulativeWeight = 0;

		const monsterWeights = this.normalizeWeights(
			this.monsterPool.filter((monster) => monster.weight > 0)
		);

		const cumulativeMapping = monsterWeights.map((monster) => {
			cumulativeWeight += monster.weight;
			return { type: monster.type, weight: cumulativeWeight };
		});

		// Find the monster type that corresponds to the random value
		const monsterType = cumulativeMapping.find((monster) => {
			return this.randomGenerator() <= monster.weight;
		}).type;

		return monsterType;
	};

	initializeMonster = (monsterType, emptySpace) => {
		// Initialize monster data
		return {
			id: crypto.randomUUID(),
			coordinates: emptySpace,
			type: monsterType,
			maxHealth: monsterType.maxHealth,
			currentHealth: monsterType.maxHealth
		};
	};

	getCluster = (monster, weapon) => {
		// Validation
		if (!monster || !weapon) return [];

		//Initialize
		const visited = new Set();
		const cluster = [];

		const traverse = (currentMonster) => {
			if (!this.isInHitbox(currentMonster)) return;

			visited.add(currentMonster);
			cluster.push(currentMonster);

			// Check all adjacent monsters
			let adjacentMonsters = this.getAdjacentMonsters(currentMonster);

			adjacentMonsters.forEach((adjacentMonster) => {
				// Filter out invalid monsters
				if (visited.has(adjacentMonster)) return;
				if (adjacentMonster.type !== currentMonster.type) return;
				if (!this.isInHitbox(adjacentMonster)) return;
				if (this.getDistance(monster, adjacentMonster) > weapon.range) return;

				traverse(adjacentMonster);
			});
		};

		// Start the traversal
		traverse(monster);

		return cluster;
	};

	isInHitbox = (monster) => {
		return (
			monster.coordinates.x >= 0 &&
			monster.coordinates.x < this.dimensions.x &&
			monster.coordinates.y >= 0 &&
			monster.coordinates.y < this.dimensions.y
		);
	};

	getAdjacentMonsters = (monster) => {
		return this.monsterData.filter((otherMonster) => {
			return (
				(Math.abs(monster.coordinates.x - otherMonster.coordinates.x) === 1 &&
					Math.abs(monster.coordinates.y - otherMonster.coordinates.y) === 0) ||
				(Math.abs(monster.coordinates.x - otherMonster.coordinates.x) === 0 &&
					Math.abs(monster.coordinates.y - otherMonster.coordinates.y) === 1)
			);
		});
	};

	getDistance = (monster, otherMonster) => {
		return Math.sqrt(
			Math.pow(Math.abs(monster.coordinates.x - otherMonster.coordinates.x), 2) +
				Math.pow(Math.abs(monster.coordinates.y - otherMonster.coordinates.y), 2)
		);
	};

	castMonster = (monsters, player) => {
		player.currentSpell.cast(monsters);
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
				const killedMonster = this.damageMonster(clusterMonster, player.currentWeapon.damage);
				if (killedMonster) killedMonsters.push(killedMonster);
			});
		});

		console.log("Killed monsters", killedMonsters);
	};

	calculateExperience = (cluster) => {
		// Get unique values
		const killedMonsters = cluster.filter((monster) => monster.currentHealth < 1);
		const monsterType = killedMonsters[0].type;

		// For each unique value, calculate the count
		let experience = 0;

		if (killedMonsters.length >= monsterType.xpMinimum) {
			experience += monsterType.xpCombo + killedMonsters.length * monsterType.xpDrop;
		}

		return experience;
	};

	damageMonster = (monster, damage) => {
		monster.currentHealth = Math.max(monster.currentHealth - damage, 0);
		if (monster.currentHealth < 1) {
			this.killMonster(monster);
			return monster;
		}
	};

	killMonster = (monster) => {
		this.removeMonster(monster);
		this.shoveDown();
		this.fillMonsterData();
	};

	removeMonster = (monster) => {
		this.monsterData.splice(this.monsterData.indexOf(monster), 1);
	};

	shoveDown = () => {
		// For each column, starting from the bottom, check if there's room to move down
		for (let i = 0; i < this.dimensions.x; i++) {
			for (let j = 0; j < this.dimensions.y; j++) {
				// Check if there's a monster at this location

				const monster = this.monsterData.find((monster) => {
					// console.log(i, j, '-', monster.coordinates.x, monster.coordinates.y);
					return monster.coordinates.x === i && monster.coordinates.y === j;
				});

				if (!monster) continue;

				// Find the next empty space
				const targetSpace = this.getAdvanceTarget(monster);

				if (!targetSpace) continue;

				monster.coordinates = targetSpace;
			}
		}
	};

	getAdvanceTarget(monster) {
		let furthestEmptySpace = null;

		// Iteratively check the next space until the furthest one is found
		for (let i = monster.coordinates.y - 1; i >= 0; i--) {
			const isMonsterThere = this.monsterData.some(
				(otherMonster) =>
					otherMonster.coordinates.x === monster.coordinates.x && otherMonster.coordinates.y === i
			);

			const isObstacleThere = this.obstacleData.some(
				(obstacle) =>
					obstacle.coordinates.x === monster.coordinates.x && obstacle.coordinates.y === i
			);

			// If there's no monster or obstacle, this is the furthest empty space
			if (!isMonsterThere && !isObstacleThere) {
				furthestEmptySpace = { x: monster.coordinates.x, y: i };
			}

			if (isMonsterThere) return furthestEmptySpace;
		}
		return furthestEmptySpace;
	}
}
