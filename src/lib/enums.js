import profileBlack from '$lib/images/Monster Profile Black.png';
import profileWhite from '$lib/images/Monster Profile White.png';
import profileYellow from '$lib/images/Monster Profile Yellow.png';
import profileGreen from '$lib/images/Monster Profile Green.png';
import profileBlue from '$lib/images/Monster Profile Blue.png';
import profileRed from '$lib/images/Monster Profile Red.png';

export class MonsterTypes {
	constructor(type) {
		this.name = type.name;
		this.source = type.source;
		this.maxHealth = type.maxHealth;
		this.xpMinimum = type.xpMinimum;
		this.xpDrop = type.xpDrop;
		this.xpCombo = type.xpCombo;
	}
	static Black = new MonsterTypes({
		name: 'Black',
		source: profileBlack,
		maxHealth: 1,
		xpMinimum: 5,
		xpDrop: 1,
		xpCombo: 1
	});
	static White = new MonsterTypes({
		name: 'White',
		source: profileWhite,
		maxHealth: 2,
		xpMinimum: 4,
		xpDrop: 1,
		xpCombo: 1
	});
	static Yellow = new MonsterTypes({
		name: 'Yellow',
		source: profileYellow,
		maxHealth: 3,
		xpMinimum: 3,
		xpDrop: 1,
		xpCombo: 2
	});
	static Green = new MonsterTypes({
		name: 'Green',
		source: profileGreen,
		maxHealth: 4,
		xpMinimum: 2,
		xpDrop: 1,
		xpCombo: 2
	});
	static Blue = new MonsterTypes({
		name: 'Blue',
		source: profileBlue,
		maxHealth: 5,
		xpMinimum: 2,
		xpDrop: 1,
		xpCombo: 3
	});
	static Red = new MonsterTypes({
		name: 'Red',
		source: profileRed,
		maxHealth: 6,
		xpMinimum: 2,
		xpDrop: 1,
		xpCombo: 3
	});
}

import gemGreen from '$lib/images/Gem Green.png';
import gemGray from '$lib/images/Gem Gray.png';

export class GemTypes {
	constructor(name, source) {
		this.name = name;
		this.source = source;
	}
	static Green = new GemTypes('green', gemGreen);
	static Gray = new GemTypes('gray', gemGray);
}

import heart from '$lib/images/Heart.png';
import mana from '$lib/images/Mana.png';
import scroll from '$lib/images/Scroll.png';
import attack from '$lib/images/Attack.png';

export class TokenTypes {
	constructor(name, source) {
		this.name = name;
		this.source = source;
	}
	static Heart = new TokenTypes('heart', heart);
	static Mana = new TokenTypes('mana', mana);
	static Scroll = new TokenTypes('scroll', scroll);
	static Attack = new TokenTypes('attack', attack);
}

export class Directions {
	cosntructor(name) {
		this.name = name;
	}
	static Up = new Directions('up');
	static Down = new Directions('down');
	static Left = new Directions('left');
	static Right = new Directions('right');
}

import battleImage from '$lib/images/Battle.svg';
import villageImage from '$lib/images/Village.svg';
import nightBattleImage from '$lib/images/Night Battle.svg';

export class LocationTypes {
	constructor(name, source) {
		this.name = name;
		this.source = source;
	}
	static Battle = new LocationTypes('battle', battleImage);
	static NightBattle = new LocationTypes('nightBattle', nightBattleImage);
	static Village = new LocationTypes('village', villageImage);
}
