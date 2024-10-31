export class QuestTypes {
	constructor(type) {
		this.name = type.name;
		this.description = type.description;
	}

    static  = new MonsterTypes({
		name: 'Black',
		source: profileBlack,
		maxHealth: 1,
		xpMinimum: 5,
		xpDrop: 1,
		xpCombo: 1,
		theme: 'dimgray',
		size: {
			x: 1,
			y: 1
		}
	});
}
