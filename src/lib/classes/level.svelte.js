import { MonsterTypes } from '$lib/enums.js';

export default function createLevel(levelData, monsterDefaults, dimensions) {
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
