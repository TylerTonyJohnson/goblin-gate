import { MonsterTypes } from '../enums';

import profileBlack from '$lib/images/Monster Profile Black.png';
import profileWhite from '$lib/images/Monster Profile White.png';
import profileYellow from '$lib/images/Monster Profile Yellow.png';
import profileGreen from '$lib/images/Monster Profile Green.png';
import profileBlue from '$lib/images/Monster Profile Blue.png';
import profileRed from '$lib/images/Monster Profile Red.png';

class Monster {
	constructor(type, id, coordinates) {
		this.type = type;
		this.id = id;
		this.coordinates = coordinates;
		this.currentHealth = this.type.maxHealth;
	}
}

export class BlackMonster extends Monster {
	static source = profileBlack;
	static maxHealth = 1;

	constructor(id, coordinates) {
		super(MonsterTypes.Black, id, coordinates);
	}
}

export class WhiteMonster extends Monster {
	static source = profileWhite;
	static maxHealth = 2;

	constructor(id, coordinates) {
		super(MonsterTypes.White, id, coordinates);
	}
}

export class YellowMonster extends Monster {
	static source = profileYellow;
	static maxHealth = 3;

	constructor(id, coordinates) {
		super(MonsterTypes.Yellow, id, coordinates);
	}
}

export class GreenMonster extends Monster {
	static source = profileGreen;
	static maxHealth = 4;

	constructor(id, coordinates) {
		super(MonsterTypes.Green, id, coordinates);
	}
}

export class BlueMonster extends Monster {
	static source = profileBlue;
	static maxHealth = 5;

	constructor(id, coordinates) {
		super(MonsterTypes.Blue, id, coordinates);
	}
}

export class RedMonster extends Monster {
	static source = profileRed;
	static maxHealth = 6;

	constructor(id, coordinates) {
		super(MonsterTypes.Red, id, coordinates);
	}
}
