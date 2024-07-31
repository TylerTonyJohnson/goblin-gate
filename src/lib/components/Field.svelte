<script>
	import Tile from './Tile.svelte';
	import { supabase } from '$lib/supabase.js';
	// import { setTablet } from '$lib/classes/tablet.svelte';
	import { getPreferences } from '$lib/preferences.svelte';
	// import { MonsterTypes } from '$lib/enums';

	import levelData from '$lib/definitions/battle1.json';

	import { createBattle, createRandomBattle } from '$lib/classes/battle.svelte.js';

	const { battleData, reduceEndurance, currentEndurance, increaseExperience, hitBox } = $props();

	const preferences = getPreferences();
	const dimensions = { x: 5, y: 7 };
	// const hitBox = {
	// 	coordinates: { x: 0, y: 0 },
	// 	dimensions: { x: 5, y: 5 }
	// };

	// let monsterDatas = $state(createBattle(levelData, dimensions));
	// let monsterDatas = $state(createRandomBattle(50, dimensions));

	function attackMonster(monster, damage = 1) {
		if (currentEndurance < 1) return;
		if (!isInHitbox(monster, hitBox)) return;

		reduceEndurance();

		const cluster = getCluster(monster);

		// Do the damage

		const killedMonsters = [];

		cluster.forEach((clusterMonster) => {
			damageMonster(clusterMonster);
			if (clusterMonster.currentHealth < 1) {
				killedMonsters.push(clusterMonster);
			}
		});

		// Experience
		const experience = calculateExperience(killedMonsters);
		increaseExperience(experience);
	}

	function calculateExperience(cluster) {
		// Get unique values

		const clusterTypes = cluster.map((monster) => monster.type);
		const uniqueCluster = [...new Set(clusterTypes)];

		// For each unique value, calculate the count
		let experience = 0;
		uniqueCluster.forEach((uniqueMonsterType) => {
			const count = cluster.filter((monster) => monster.type === uniqueMonsterType).length;

			console.log(count, uniqueMonsterType);
			if (count >= uniqueMonsterType.xpMinimum) {
				experience += uniqueMonsterType.xpCombo + count * uniqueMonsterType.xpDrop;
			}
		});

		return experience;
	}

	function damageMonster(monster) {
		console.log('damage');
		monster.currentHealth = Math.max(monster.currentHealth - 1, 0);
		if (monster.currentHealth < 1) {
			killMonster(monster);
		}
	}

	function killMonster(monster) {
		console.log('kill');
		removeMonster(monster);
		shoveDown();
	}

	function removeMonster(monster) {
		battleData.splice(battleData.indexOf(monster), 1);
	}

	function shoveDown() {
		battleData.forEach((monster) => {
			if (monster.coordinates.y === 0) return;
			if (
				battleData.find(
					(otherMonster) =>
						otherMonster.coordinates.x === monster.coordinates.x &&
						otherMonster.coordinates.y === monster.coordinates.y - 1
				)
			)
				return;

			monster.coordinates.y = Math.max(monster.coordinates.y - 1, 0);
		});
	}

	function getCluster(monster) {
		const visited = new Set();
		const cluster = [];

		function traverse(currentMonster) {
			visited.add(currentMonster);
			cluster.push(currentMonster);

			const adjacentMonsters = getAdjacentMonsters(currentMonster);

			for (const adjacentMonster of adjacentMonsters) {
				if (!visited.has(adjacentMonster) && adjacentMonster.type === monster.type) {
					traverse(adjacentMonster);
				}
			}
		}

		traverse(monster);

		return cluster;

		function getAdjacentMonsters(monster) {
			return battleData.filter(
				(otherMonster) =>
					otherMonster.type === monster.type &&
					isInHitbox(otherMonster, hitBox) &&
					((otherMonster.coordinates.x === monster.coordinates.x &&
						(otherMonster.coordinates.y === monster.coordinates.y + 1 ||
							otherMonster.coordinates.y === monster.coordinates.y - 1)) ||
						(otherMonster.coordinates.y === monster.coordinates.y &&
							(otherMonster.coordinates.x === monster.coordinates.x + 1 ||
								otherMonster.coordinates.x === monster.coordinates.x - 1)))
			);
		}
	}

	function isInHitbox(monster, hitbox) {
		return (
			monster.coordinates.x >= hitbox.coordinates.x &&
			monster.coordinates.x < hitbox.coordinates.x + hitbox.dimensions.x &&
			monster.coordinates.y >= hitbox.coordinates.y &&
			monster.coordinates.y < hitbox.coordinates.y + hitbox.dimensions.y
		);
	}

	function getDistance(monster, otherMonster) {
		return Math.sqrt(
			Math.pow(Math.abs(monster.coordinates.x - otherMonster.coordinates.x), 2) +
				Math.pow(Math.abs(monster.coordinates.y - otherMonster.coordinates.y), 2)
		);
	}
</script>

<div class="frame" style={`padding-top: calc(1rem + ${preferences.tileSize / 2}px);`}>
	<div
		class="monsters-grid"
		style={`
				width: ${preferences.tileSize * dimensions.x + preferences.tileGap * (dimensions.x - 1)}px;
				height: ${preferences.tileSize * (dimensions.y - 0.5) + preferences.tileGap * (dimensions.y - 1)}px;
				`}
	>
		{#each battleData as monsterData (monsterData.id)}
			<Tile {monsterData} attack={() => attackMonster(monsterData)} />
		{/each}
	</div>
	<div class="hit-box"></div>
</div>

<style>
	.frame {
		position: relative;
		grid-area: tablet;
		display: grid;
		place-items: end;
		background-color: #0008;
		border-radius: 0 0 2rem 2rem;
		padding-left: 1rem;
		padding-right: 1rem;
		padding-bottom: 1rem;
		mask-image: linear-gradient(to bottom, transparent, black 2rem);
	}

	.monsters-grid {
		position: relative;
		/* bottom: 0; */
		/* background-color: red; */
	}

	.hit-box {
		position: absolute;
		left: 0.5rem;
		bottom: 0.5rem;
		width: calc(100% - 1rem);
		aspect-ratio: 1 / 1;
		border: solid rgb(255, 64, 220) 5px;
		/* background-color: #0008; */
		border-radius: 1.5rem;
		/* background-color: transparent; */
		pointer-events: none;
	}
</style>
