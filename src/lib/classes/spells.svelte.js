import smiteImage from '$lib/images/Shrink.png';
import swapImage from '$lib/images/Swap.png';
import explodeImage from '$lib/images/Explode.png';

import { MonsterTypes } from '$lib/classes/monsters.svelte';

import { TileTypes } from '$lib/classes/tiles.svelte.js';
import {
	targetSingle,
	targetLine,
	targetCluster,
	attackMonsters
} from '$lib/classes/targets.svelte.js';

const smite = (monsters, spell) => {
	console.log(monsters);
	return [];
};

const explode = (obstacle, spell) => {
	console.log('exploding', obstacle);
};

export class SpellTypes {
	constructor(type) {
		this.name = type.name;
		this.source = type.source;
		this.range = type.range;
		this.targets = type.targets;
		this.cast = type.cast;
		this.targetTypes = type.targetTypes;
		this.target = type.target;
		this.targetMin = type.targetMin;
		this.getTargets = type.getTargets || (() => []);
		this.hit = type.hit || (() => {});
		this.damage = type.damage;
		this.cost = type.cost;
	}


	// Destroy one monster, can only target one
	static Smite = new SpellTypes({
		name: 'Smite',
		source: smiteImage,
		range: 0,
		targets: 1,
		targetMin: 1,
		targetTypes: [TileTypes.Monster],
		getTargets: (...args) => targetCluster(...args, SpellTypes.Smite),
		hit: (...args) => attackMonsters(...args, SpellTypes.Smite),
		damage: Infinity,
		cost: 1
	});

	// Swap the position of two monsters, limited by range
	static Swap = new SpellTypes({
		name: 'Swap',
		source: swapImage,
		range: 0,
		targets: 2,
		targetTypes: [TileTypes.Monster],
		getTargets: (...args) => targetCluster(...args, SpellTypes.Swap),
		hit: (...args) => attackMonsters(...args, SpellTypes.Swap),
		damage: 0,
		cost: 2
	});

	static Explode = new SpellTypes({
		name: 'Explode',
		source: explodeImage,
		range: 0,
		targets: 1,
		targetTypes: [TileTypes.Obstacle],
		getTargets: (...args) => targetCluster(...args, SpellTypes.Explode),
		hit: (...args) => explode(...args, SpellTypes.Explode),
		damage: 0,
		cost: 1
	});

	// Slice - hit an entire row, upgrades allow it to target more types of monsters
	static Slice = new SpellTypes({
		name: 'Slice',
		source: explodeImage,
		range: Infinity,
		targets: 1,
		targetTypes: [TileTypes.Monster],
		getTargets: (...args) => targetCluster(...args, SpellTypes.Slice),
		hit: (...args) => attackMonsters(...args, SpellTypes.Slice),
		damage: 1,
		cost: 1
	});

	// Freeze - freeze monsters
	static Freeze = new SpellTypes({
		name: 'Freeze',
		source: explodeImage,
		range: 0,
		targets: 1,
		targetTypes: [TileTypes.Monster],
		getTargets: (...args) => targetCluster(...args, SpellTypes.Freeze),
		hit: (...args) => attackMonsters(...args, SpellTypes.Freeze),
		damage: 1,
		cost: 1
	});

	// Soul catching - capture souls at the cost of mana

	// Spell - refresh objectives?

	// At beginning of battle - choose bounty to pursue

	/* 
		Targeting Functions
	*/

	/* 
		Casting Functions
	*/

	static shrink = (monsters) => {
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
	};

	static swap = (monsters) => {
		console.log('swapping');

		// console.log(monster1);
		const coordinates = monsters.map((monster) => monster.coordinates);

		monsters.forEach((monster, index) => {
			monster.coordinates = coordinates[(index + 1) % 2];
		});
	};
}
