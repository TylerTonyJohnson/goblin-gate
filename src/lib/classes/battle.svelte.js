import { MonsterTypes } from '$lib/enums.js';
import monsterDefaults from '$lib/definitions/monsterDefaults.json';

import { seededGenerator } from '$lib/classes/random.svelte';

export function createBattle(levelData, dimensions) {
	const output = levelData.map((monsterData, index) => {
		const monsterType = Object.values(MonsterTypes).find(
			(monsterType) => monsterType.name === monsterData.type
		);

		const monsterDefault = monsterDefaults.find(
			(monsterDefault) => monsterDefault.type === monsterData.type
		);

		return {
			id: crypto.randomUUID(),
			coordinates: {
				x: index % dimensions.x,
				y: Math.floor(index / dimensions.x)
			},
			type: monsterType,
			maxHealth: monsterDefault.maxHealth,
			currentHealth: monsterDefault.maxHealth,
			xp: monsterDefault.xp
		};
	});
	return output;
}
export function createRandomBattle(battleParameters, seed) {
	const randomGenerator = seededGenerator(seed);

	const monsterWeightTotal = battleParameters.monsters.reduce(
		(total, monsterWeight) => total + monsterWeight.weight,
		0
	);

	let cumulativeWeight = 0;

	// Calculate cumulative weights
	const cumulativeWeights = battleParameters.monsters.map((monsterWeight) => {
		cumulativeWeight += monsterWeight.weight / monsterWeightTotal;
		return { type: monsterWeight.type, weight: cumulativeWeight };
	});

	// Generate random monster data based on cumulative weights
	const monsterData = Array.from({ length: battleParameters.monsterCount }, () => {

		const randomType = cumulativeWeights.find(
			(cumulativeWeight) => randomGenerator() <= cumulativeWeight.weight
		).type;

		return randomType;
	});

	// Create battle data
	const output = monsterData.map((monsterType, index) => {
		return {
			id: crypto.randomUUID(),
			coordinates: {
				x: index % battleParameters.dimensions.x,
				y: Math.floor(index / battleParameters.dimensions.x)
			},
			type: monsterType,
			maxHealth: monsterType.maxHealth,
			currentHealth: monsterType.maxHealth
		};
	});

	return output;
}
