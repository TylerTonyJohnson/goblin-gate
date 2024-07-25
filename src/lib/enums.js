import profileBlack from '$lib/images/Monster Profile Black.png';
import profileWhite from '$lib/images/Monster Profile White.png';
import profileYellow from '$lib/images/Monster Profile Yellow.png';
import profileGreen from '$lib/images/Monster Profile Green.png';
import profileBlue from '$lib/images/Monster Profile Blue.png';
import profileRed from '$lib/images/Monster Profile Red.png';

export class MonsterTypes {
	constructor(name, source) {
		this.name = name;
		this.source = source;
	}
	static Black = new MonsterTypes('black', profileBlack);
	static White = new MonsterTypes('white', profileWhite);
	static Yellow = new MonsterTypes('yellow', profileYellow);
	static Green = new MonsterTypes('green', profileGreen);
	static Blue = new MonsterTypes('blue', profileBlue);
	static Red = new MonsterTypes('red', profileRed);
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
