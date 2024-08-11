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
		this.theme = type.theme;
	}
	static Black = new MonsterTypes({
		name: 'Black',
		source: profileBlack,
		maxHealth: 1,
		xpMinimum: 5,
		xpDrop: 1,
		xpCombo: 1,
		theme: 'dimgray'
	});
	static White = new MonsterTypes({
		name: 'White',
		source: profileWhite,
		maxHealth: 1,
		xpMinimum: 5,
		xpDrop: 1,
		xpCombo: 1,
		theme: 'lightgray'
	});
	static Yellow = new MonsterTypes({
		name: 'Yellow',
		source: profileYellow,
		maxHealth: 2,
		xpMinimum: 4,
		xpDrop: 1,
		xpCombo: 2,
		theme: 'yellow'
	});
	static Green = new MonsterTypes({
		name: 'Green',
		source: profileGreen,
		maxHealth: 3,
		xpMinimum: 3,
		xpDrop: 1,
		xpCombo: 2,
		theme: 'green'
	});
	static Blue = new MonsterTypes({
		name: 'Blue',
		source: profileBlue,
		maxHealth: 4,
		xpMinimum: 2,
		xpDrop: 1,
		xpCombo: 3,
		theme: 'blue'
	});
	static Red = new MonsterTypes({
		name: 'Red',
		source: profileRed,
		maxHealth: 5,
		xpMinimum: 2,
		xpDrop: 1,
		xpCombo: 3,
		theme: 'red'
	});
}
