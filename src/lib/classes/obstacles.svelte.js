import rockImage from '$lib/images/Rock.png';
import stumpImage from '$lib/images/Stump.png';

export class ObstacleTypes {
	constructor(type) {
		this.name = type.name;
		this.source = type.source;
	}
	static Rock = new ObstacleTypes({
		name: 'Rock',
		source: rockImage
	});
	static Stump = new ObstacleTypes({
		name: 'Stump',
		source: stumpImage
	});
}