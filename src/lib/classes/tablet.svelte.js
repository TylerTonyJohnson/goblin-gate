import { setContext, getContext } from 'svelte';

import { MonsterTypes } from '$lib/enums.js';
import {
	BlackMonster,
	WhiteMonster,
	YellowMonster,
	GreenMonster,
	BlueMonster,
	RedMonster
} from '$lib/classes/monsters.svelte.js';

export class Tablet {
	monsters = $state([]);

	constructor(levelData = [], dimensions = { x: 5, y: 5 }) {
		levelData.forEach((monster, index) => {
			this.addMonster(monster.type, {
				x: index % dimensions.x,
				y: Math.floor(index / dimensions.x)
			});
		});
	}

	addMonster(monsterType, coordinates) {
		const id = crypto.randomUUID();

		let monster;
		switch (monsterType) {
			case MonsterTypes.Black.name:
				monster = new BlackMonster(id, coordinates);
				break;
			case MonsterTypes.White.name:
				monster = new WhiteMonster(id, coordinates);
				break;
			case MonsterTypes.Yellow.name:
				monster = new YellowMonster(id, coordinates);
				break;
			case MonsterTypes.Green.name:
				monster = new GreenMonster(id, coordinates);
				break;
			case MonsterTypes.Blue.name:
				monster = new BlueMonster(id, coordinates);
				break;
			case MonsterTypes.Red.name:
				monster = new RedMonster(id, coordinates);
				break;
		}

		if (monster) this.monsters.push(monster);
	}

	removeMonster(monsterId) {
		this.monsters = this.monsters.filter((monster) => monster.id !== monsterId);
	}

	damage(monsterId, damage) {
		console.log('damaging', monsterId, damage);
		const monster = this.monsters.find((monster) => monster.id === monsterId);

		monster.currentHealth = Math.max(0, monster.currentHealth - damage);

		if (monster.currentHealth < 1) {
			this.kill(monsterId);
		}
	}

	kill(monsterId) {
		const monster = this.monsters.find((monster) => monster.id === monsterId);
		console.log('killing', monsterId);
		this.removeMonster(monsterId);
		this.shoveDown(monster.coordinates);
	}

	shoveDown(coordinates) {
		this.monsters.forEach((monster) => {
			if (monster.coordinates.y > coordinates.y && monster.coordinates.x === coordinates.x) {
				monster.coordinates.y--;
			}
		});
	}
}

const TABLET_KEY = Symbol('tablet');

export function setTablet(levelData, dimensions) {
	return setContext(TABLET_KEY, new Tablet(levelData, dimensions));
}

export function getTablet() {
	return getContext(TABLET_KEY);
}
