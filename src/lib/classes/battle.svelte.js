import { seededGenerator } from '$lib/classes/random.svelte';

export class Battle {
	monsterPool = $state([]);
	monsterData = $state([]);

	constructor(battleParameters, seed) {
		const { monsterCount, monsterMapping, dimensions } = { ...battleParameters };

		this.monsterCount = monsterCount;
		this.monsterMapping = monsterMapping;
		this.dimensions = dimensions;

		this.randomGenerator = seededGenerator(seed);
		this.monsterPool = this.createMonsterPool();

		// Fill in as much of the monsterData as we need.
		this.fillMonsterData(this.monsterData, this.dimensions);
	}

	createMonsterPool = () => {
		// Normalize the mapping and sort it by smallest to largest category
		const normalizedMapping = this.normalizeWeights(this.monsterMapping).sort(
			(a, b) => a.weight - b.weight
		);

		// Calculate the number of monsters of each type
		let monsterCounts = [];
		for (let i = 0; i < normalizedMapping.length; i++) {
			const count = Math.max(Math.round(this.monsterCount * normalizedMapping[i].weight), 2);

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

	fillMonsterData = () => {
		if (this.monsterPool.reduce((acc, monster) => acc + monster.weight, 0) < 1) return;

		// Find all empty spaces
		const emptySpaces = this.getEmptySpaces(this.monsterData, this.dimensions);

		if (emptySpaces.length === 0) return;

		// For each empty space, create a monster
		emptySpaces.forEach((emptySpace) => {
			this.addRandomMonster(emptySpace);
		});
	};

	getEmptySpaces = (monsterData, dimensions) => {
		const emptySpaces = [];

		for (let i = 0; i < dimensions.y; i++) {
			for (let j = 0; j < dimensions.x; j++) {
				const space = { x: j, y: i };

				if (
					!monsterData.some(
						(monster) => monster.coordinates.x === space.x && monster.coordinates.y === space.y
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
		console.log('cast');
		player.currentSpell.cast(monsters);
	};

	attackMonster = (monsters, player) => {
		console.log('attack');

		// Check if we can attack
		if (!player.currentWeapon) return;

		monsters.forEach((monster) => {
			if (!this.isInHitbox(monster)) return;

			// Who should be attacked?
			const cluster = this.getCluster(monster, player);

			// Do the damage
			cluster.forEach((clusterMonster) => {
				this.damageMonster(clusterMonster, player.currentWeapon.damage);
			});
		});
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

	damageMonster = (monster) => {
		console.log('damage');
		monster.currentHealth = Math.max(monster.currentHealth - 1, 0);
		if (monster.currentHealth < 1) {
			this.killMonster(monster);
		}
	};

	killMonster = (monster) => {
		console.log('kill');
		this.removeMonster(monster);
		this.shoveDown();
		this.fillMonsterData();
	};

	removeMonster = (monster) => {
		this.monsterData.splice(this.monsterData.indexOf(monster), 1);
	};

	shoveDown = () => {
		this.monsterData.forEach((monster) => {
			if (monster.coordinates.y === 0) return;
			if (
				this.monsterData.find(
					(otherMonster) =>
						otherMonster.coordinates.x === monster.coordinates.x &&
						otherMonster.coordinates.y === monster.coordinates.y - 1
				)
			)
				return;

			monster.coordinates.y = Math.max(monster.coordinates.y - 1, 0);
		});
	};
}
