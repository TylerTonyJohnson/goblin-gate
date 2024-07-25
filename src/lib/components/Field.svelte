<script>
	import Tile from './Tile.svelte';
	import { supabase } from '$lib/supabase.js';
	// import { setTablet } from '$lib/classes/tablet.svelte';
	import { getPreferences } from '$lib/preferences.svelte';
	// import { MonsterTypes } from '$lib/enums';

	import levelData from '$lib/definitions/battle1.json';
	import monsterData from '$lib/definitions/monsterDefaults.json';

	import { createBattle } from '$lib/classes/battle.svelte.js';

	const { reduceEndurance, currentEndurance, increaseExperience } = $props();

	const preferences = getPreferences();
	const dimensions = { x: 5, y: 7 };

	let monsterDatas = $state(createBattle(levelData, monsterData, dimensions));
	// let monsterDatas = $state(createRandomLevel(50, monsterData, dimensions));

	// $inspect(monsterDatas);

	$effect(() => shoveDown());

	function attackMonster(monster) {
		if (currentEndurance < 1) return;

		console.log('attack');

		reduceEndurance();

		const cluster = getCluster(monster);

		cluster.forEach((clusterMonster) => {
			setTimeout(
				() => {
					damageMonster(clusterMonster);
				},
				getDistance(monster, clusterMonster) * 50
			);
		});
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
		increaseExperience(monster.xp);
		removeMonster(monster);
		shoveDown();
	}

	function removeMonster(monster) {
		monsterDatas.splice(monsterDatas.indexOf(monster), 1);
	}

	function shoveDown() {
		monsterDatas.forEach((monster) => {
			if (monster.coordinates.y === 0) return;
			if (
				monsterDatas.find(
					(otherMonster) =>
						otherMonster.coordinates.x === monster.coordinates.x &&
						otherMonster.coordinates.y === monster.coordinates.y - 1
				)
			)
				return;

			monster.coordinates.y = Math.max(monster.coordinates.y - 1, 0);
		});
	}

	function getAdjacentMonsters(monster) {
		return monsterDatas.filter(
			(otherMonster) =>
				otherMonster.type === monster.type &&
				((otherMonster.coordinates.x === monster.coordinates.x &&
					(otherMonster.coordinates.y === monster.coordinates.y + 1 ||
						otherMonster.coordinates.y === monster.coordinates.y - 1)) ||
					(otherMonster.coordinates.y === monster.coordinates.y &&
						(otherMonster.coordinates.x === monster.coordinates.x + 1 ||
							otherMonster.coordinates.x === monster.coordinates.x - 1)))
		);
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
		{#each monsterDatas as monsterData (monsterData.id)}
			<Tile {monsterData} attack={() => attackMonster(monsterData)} />
		{/each}
	</div>
</div>

<style>
	.frame {
		grid-area: tablet;
		background-color: #0008;
		border-radius: 0 0 2rem 2rem;
		padding-left: 1rem;
		padding-right: 1rem;
		padding-bottom: 1rem;
		mask-image: linear-gradient(to bottom, transparent, black 2rem);
	}

	.monsters-grid {
		position: relative;
		/* background-color: red; */
	}
</style>
