import prisonerImage from '$lib/images/Prisoner.png';

export class VillagerTypes {
	constructor(type) {
		this.name = type.name;
		this.source = type.source;
		this.size = type.size;
	}
	static Prisoner = new VillagerTypes({
		name: 'Prisoner',
		source: prisonerImage,
		size: {
			x: 1,
			y: 1
		}
	});
}