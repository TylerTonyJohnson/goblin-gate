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

export class Directions {
	constructor(type) {
		this.name = type.name;
		this.x = type.x;
		this.y = type.y;
	}
	static Up = new Directions({ name: 'up', x: 0, y: -1 });
	static Down = new Directions({ name: 'down', x: 0, y: 1 });
	static Left = new Directions({ name: 'left', x: -1, y: 0 });
	static Right = new Directions({ name: 'right', x: 1, y: 0 });
}
