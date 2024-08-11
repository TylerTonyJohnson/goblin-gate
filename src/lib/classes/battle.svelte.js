import { seededGenerator } from '$lib/classes/random.svelte';

export function createRandomBattle(battleParameters, seed) {
	/* 
		Set up for looping through the grid
	*/

	const { dimensions, monsterCount, monsters } = { ...battleParameters };

	const randomGenerator = seededGenerator(seed);

	const monsterMapping = normalizeMapping(monsters);

	const battleData = [];
	/* 
		Loop to create sufficient monsters to fill the grid
	*/

	for (let i = 0; i < monsterCount; i++) {
		/* 
			Calculate which monster type should be generated next
		*/
		const monsterType = getNextMonsterType(monsterMapping, randomGenerator());

		/* 
			Initialize the monster data
		*/
		const initializedMonster = initializeMonster(monsterType, dimensions, i);

		battleData.push(initializedMonster);
	}

	return battleData;

	// Helper functions

	function getNextMonsterType(monsterMapping, randomValue) {
		// Accumulate weights
		let cumulativeWeight = 0;

		const cumulativeMapping = monsterMapping.map((monster) => {
			cumulativeWeight += monster.weight;
			return { type: monster.type, weight: cumulativeWeight };
		});

		// Find the monster type that corresponds to the random value
		const monsterType = cumulativeMapping.find((monster) => randomValue <= monster.weight).type;

		return monsterType;
	}

	function initializeMonster(monsterType, dimensions, index) {
		// Initialize monster data
		return {
			id: crypto.randomUUID(),
			coordinates: {
				x: index % dimensions.x,
				y: Math.floor(index / dimensions.x)
			},
			type: monsterType,
			maxHealth: monsterType.maxHealth,
			currentHealth: monsterType.maxHealth
		};
	}

	function normalizeMapping(mapping) {
		const total = mapping.reduce((acc, monster) => acc + monster.weight, 0);

		const normalizedMapping = mapping.map((monster) => ({
			type: monster.type,
			weight: monster.weight / total
		}));

		return normalizedMapping;
	}
}

/* 
	---------- Battle Functions ----------
*/

export function getCluster(monster) {
	const visited = new Set();
	const cluster = [];

	function traverse(currentMonster) {
		visited.add(currentMonster);
		cluster.push(currentMonster);

		const adjacentMonsters = getAdjacentMonsters(currentMonster);

		for (const adjacentMonster of adjacentMonsters) {
			if (!visited.has(adjacentMonster) && adjacentMonster.type === monster.type) {
				traverse(adjacentMonster);
			}
		}
	}

	traverse(monster);

	return cluster;
}

export function getAdjacentMonsters(monsters, monster) {
	return monsters.filter(
		(otherMonster) =>
			otherMonster.type === monster.type &&
			((otherMonster.coordinates.x === monster.coordinates.x &&
				(otherMonster.coordinates.y === monster.coordinates.y + 1 ||
					otherMonster.coordinates.y === monster.coordinates.y - 1)) ||
				(otherMonster.coordinates.y === monster.coordinates.y &&
					(otherMonster.coordinates.x === monster.coordinates.x + 1 ||
						otherMonster.coordinates.x === monster.coordinates.x - 1)))
	);
}
