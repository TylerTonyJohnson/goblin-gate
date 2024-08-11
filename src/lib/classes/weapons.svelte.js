import swordImage from '$lib/images/Sword.png';
import cleaverImage from '$lib/images/Cleaver.png';
import longswordImage from '$lib/images/Longsword.png';
import magibladeImage from '$lib/images/Magiblade.png';

export class WeaponTypes {
	constructor(type) {
		this.name = type.name;
		this.source = type.source;
		this.range = type.range;
        this.targets = type.targets;
        this.damage = type.damage;
	}

	static Sword = new WeaponTypes({
		name: 'Sword',
		source: swordImage,
		range: 1,
        targets: 1,
        damage: 1
	});

	static Cleaver = new WeaponTypes({
		name: 'Cleaver',
		source: cleaverImage,
		range: 1.5,
        targets: 1,
        damage: 1
	});

	static Longsword = new WeaponTypes({
		name: 'Longsword',
		source: longswordImage,
		range: 2,
        targets: 1,
        damage: 1
	});

	static Magiblade = new WeaponTypes({
		name: 'Magiblade',
		source: magibladeImage,
		range: Infinity,
        targets: 1,
        damage: 1
	});
}
