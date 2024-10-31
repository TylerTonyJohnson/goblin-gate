import { TileTypes } from '$lib/classes/tiles.svelte.js';
import {
	targetSingle,
	targetLine,
	targetCluster,
	attackMonsters
} from '$lib/classes/targets.svelte.js';

import swordImage from '$lib/images/Sword.png';
import cleaverImage from '$lib/images/Cleaver.png';
import longswordImage from '$lib/images/Longsword.png';
import magibladeImage from '$lib/images/Magiblade.png';
import arrowImage from '$lib/images/Arrow.png';
import netImage from '$lib/images/Net.png';

export class WeaponTypes {
	constructor(type) {
		this.name = type.name;
		this.source = type.source;
		this.range = type.range;
		this.targets = type.targets;
		this.targetMin = type.targetMin;
		this.damage = type.damage;
		this.targetTypes = type.targetTypes;
		this.getTargets = type.getTargets || (() => []);
		this.hit = type.hit || (() => {});
	}

	static Sword = new WeaponTypes({
		name: 'Sword',
		source: swordImage,
		range: 1,
		targets: 1,
		targetMin: 2,
		damage: 1,
		targetTypes: [TileTypes.Monster],
		getTargets: (...args) => targetCluster(...args, WeaponTypes.Sword),
		hit: (...args) => attackMonsters(...args, WeaponTypes.Sword)
	});

	static Cleaver = new WeaponTypes({
		name: 'Cleaver',
		source: cleaverImage,
		range: 1.5,
		targets: 1,
		targetMin: 2,
		damage: 1,
		targetTypes: [TileTypes.Monster],
		getTargets: (...args) => targetCluster(...args, WeaponTypes.Cleaver),
		hit: (...args) => attackMonsters(...args, WeaponTypes.Cleaver)
	});

	static Longsword = new WeaponTypes({
		name: 'Longsword',
		source: longswordImage,
		range: 2,
		targets: 1,
		targetMin: 2,
		damage: 1,
		targetTypes: [TileTypes.Monster],
		getTargets: (...args) => targetCluster(...args, WeaponTypes.Longsword),
		hit: (...args) => attackMonsters(...args, WeaponTypes.Longsword)
	});

	static Magiblade = new WeaponTypes({
		name: 'Magiblade',
		source: magibladeImage,
		range: Infinity,
		targets: 1,
		targetMin: 2,
		damage: 1,
		targetTypes: [TileTypes.Monster],
		getTargets: (...args) => targetCluster(...args, WeaponTypes.Magiblade),
		hit: (...args) => attackMonsters(...args, WeaponTypes.Magiblade)
	});

	static Arrow = new WeaponTypes({
		name: 'Arrow',
		source: arrowImage,
		range: Infinity,
		targets: Infinity,
		targetMin: 2,
		damage: 1,
		targetTypes: [TileTypes.Monster, TileTypes.Obstacle, TileTypes.Treasure],
		getTargets: (...args) => targetLine(...args, WeaponTypes.Arrow),
		hit: (...args) => attackMonsters(...args, WeaponTypes.Arrow)
	});

	static Net = new WeaponTypes({
		name: 'Net',
		source: netImage,
		range: 1,
		targets: 1,
		targetMin: 1,
		damage: 1,
		targetTypes: [TileTypes.Monster],
		getTargets: (...args) => targetSingle(...args, WeaponTypes.Net),
		hit: (...args) => attackMonsters(...args, WeaponTypes.Net)
	});
}
