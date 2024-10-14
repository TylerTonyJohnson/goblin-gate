// Tiles definitions

export class TileTypes {
	constructor(type) {
		this.name = type.name;
        this.theme = type.theme;
	}
	static Obstacle = new TileTypes({
		name: 'Obstacle',
        theme: 'black'
	});
	static Monster = new TileTypes({
		name: 'Monster',
        theme: 'orange'
	});
	static Treasure = new TileTypes({
		name: 'Treasure',
        theme: 'gold'
	});
	static Villager = new TileTypes({
		name: 'Villager',
        theme: 'green'
	});
	// static Shape = new TileTypes({
	// 	name: 'Shape',
    //     theme: 'magenta'
	// });

}
