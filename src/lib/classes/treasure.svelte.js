import treasureImage from '$lib/images/Treasure.png';

export class TreasureTypes {
	constructor(type) {
		this.name = type.name;
		this.source = type.source;
		this.size = type.size;
	}
	static Chest = new TreasureTypes({
		name: 'Chest',
		source: treasureImage,
		size: {
			x: 1,
			y: 1
		}
	});
	static Coin = new TreasureTypes({
		name: 'Coin',
		source: treasureImage,
		size: {
			x: 1,
			y: 1
		}
	});
}