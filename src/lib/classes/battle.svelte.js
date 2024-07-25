import { MonsterTypes } from '$lib/enums.js';

export function createBattle(levelData, monsterDefaults, dimensions) {
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

export function createRandomBattle(monsterCount, monsterDefaults, dimensions) {
	const levelData = Array.from({ length: monsterCount }, () => {
		const randomType =
			Object.values(MonsterTypes)[Math.floor(Math.random() * Object.values(MonsterTypes).length)];
		return randomType ;
	});

	const output = levelData.map((monsterType, index) => {
		const monsterDefault = monsterDefaults.find(
			(monsterDefault) => monsterDefault.type === monsterType.name
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
