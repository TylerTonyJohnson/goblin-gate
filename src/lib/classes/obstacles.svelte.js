import rockImage from '$lib/images/Rock.png';
import stumpImage from '$lib/images/Stump.png';
import treeImage from '$lib/images/Tree.png';

export class ObstacleTypes {
	constructor(type) {
		this.name = type.name;
		this.source = type.source;
		this.buffer = type.buffer;
		this.size = type.size;
	}
	static Rock = new ObstacleTypes({
		name: 'Rock',
		source: rockImage,
		buffer: 1,
		size: {
			x: 1,
			y: 1
		}
	});
	static Stump = new ObstacleTypes({
		name: 'Stump',
		source: stumpImage,
		buffer: 1,
		size: {
			x: 1,
			y: 1
		}
	});
	static Tree = new ObstacleTypes({
		name: 'Tree',
		source: treeImage,
		buffer: 2,
		size: {
			x: 1,
			y: 2
		}
	});
}

const obstacleClusters = [
	`x`,

	`x.
	 .x`,

	`x.x
	 .x.
	 x.x`,

	`.x.
	 x.x
	 .x.`,

	`.x.
	 x.x
	 .x.`,

	`.xx.
	 x..x
	 .xx.
	 x..x`,

	`x.x.
	 .x.x
	 x.x.
	 .x.x`,

	`x...x
	 .x.x.
	 ..x..
	 .x.x.
	 x...x`,

	`x.x.x
	 .x.x.
	 x.x.x
	 .x.x.
	 x.x.x`,

	`x...x
	 .xxx.
	 x...x
	 .xxx.
	 x...x`
];

export const getRandomObstacleMapping = (random) => {
	return obstacleClusters[Math.floor(random * obstacleClusters.length)];
};
