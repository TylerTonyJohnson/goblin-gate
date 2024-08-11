import shrinkImage from '$lib/images/Shrink.png';
import swapImage from '$lib/images/Swap.png';
import explodeImage from '$lib/images/Explode.png';

import { MonsterTypes } from '$lib/classes/monsters.svelte';

export class SpellTypes {
	constructor(type) {
		this.name = type.name;
		this.source = type.source;
		this.range = type.range;
		this.targets = type.targets;
		this.cast = type.cast;
	}

	static Shrink = new SpellTypes({
		name: 'Shrink',
		source: shrinkImage,
		range: 0,
		targets: 1,
		cast: shrink
	});

	static Swap = new SpellTypes({
		name: 'Swap',
		source: swapImage,
		range: 0,
		targets: 2,
		cast: swap
	});

	static Explode = new SpellTypes({
		name: 'Explode',
		source: explodeImage,
		range: 0,
		targets: 1,
		cast: explode
	});
}

function shrink(monsters) {
	console.log('shrinking');

	monsters.forEach((monster) => {
		const newLevel = Math.max(monster.maxHealth - 1, 1);
		if (newLevel === monster.maxHealth) return;

		const candidates = Object.values(MonsterTypes).filter((type) => type.maxHealth === newLevel);

		const newMonsterType = candidates[Math.floor(Math.random() * candidates.length)];

		monster.type = newMonsterType;
		monster.maxHealth = newMonsterType.maxHealth;
		monster.currentHealth = Math.min(newMonsterType.maxHealth, monster.currentHealth);
	});
}

function swap(monsters) {
	console.log('swapping');

	// console.log(monster1);
	const coordinates = monsters.map((monster) => monster.coordinates);

	monsters.forEach((monster, index) => {
		monster.coordinates = coordinates[(index + 1) % 2];
	});
}

function explode(obstacle) {
	console.log('exploding');
}
