import { getContext, setContext } from 'svelte';
import { MonsterTypes } from '$lib/classes/monsters.svelte.js';
import { ObstacleTypes } from '$lib/classes/obstacles.svelte';

const preferences = $state({
	tileSize: 86,
	tileGap: 4,
	defaultBattleParameters: {
		dimensions: { x: 5, y: 7 },
		monsterCount: 100,
		endless: false,
		monsterMapping: [
			{ type: MonsterTypes.Black, weight: 0.4 },
			{ type: MonsterTypes.White, weight: 0.2 },
			{ type: MonsterTypes.Yellow, weight: 0.1 },
			{ type: MonsterTypes.Green, weight: 0.1 },
			{ type: MonsterTypes.Blue, weight: 0.1 },
			{ type: MonsterTypes.Red, weight: 0.1 }
		],
		clustering: 0,
		fillCount: 20,
		obstacleMapping: [
			{ type: ObstacleTypes.Rock, weight: 4 },
			{ type: ObstacleTypes.Stump, weight: 3 },
			{ type: ObstacleTypes.Tree, weight: 2 }
		],
		treasureMapping: 2,
		villagerMapping: 2
	}
});

const PREFERENCES_KEY = Symbol('preferences');

export function setPreferences() {
	return setContext(PREFERENCES_KEY, preferences);
}

export function getPreferences() {
	return getContext(PREFERENCES_KEY);
}
