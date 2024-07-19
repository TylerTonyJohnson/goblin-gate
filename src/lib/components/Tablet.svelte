<script>
	import Tile from './Tile.svelte';
	import { supabase } from '$lib/supabase.js';
	// import { setTablet } from '$lib/classes/tablet.svelte';
	import { getPreferences } from '$lib/preferences.svelte';
	// import { MonsterTypes } from '$lib/enums';

	import levelData from '$lib/definitions/level1.json';
	import monsterData from '$lib/definitions/monsterDefaults.json';

	import createLevel from '$lib/classes/level.svelte.js';

	const preferences = getPreferences();
	const dimensions = { x: 5, y: 7 };

	let monsterDatas = $state(createLevel(levelData, monsterData, dimensions));

	$inspect(monsterDatas);

	$effect(() => shoveDown());

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
</script>

<div class="frame">
	<div
		class="monsters-grid"
		style={`
				width: ${preferences.tileSize * dimensions.x + preferences.tileGap * (dimensions.x - 1)}px;
				height: ${preferences.tileSize * dimensions.y + preferences.tileGap * (dimensions.y - 1)}px;
				`}
	>
		{#each monsterDatas as monsterData (monsterData.id)}
			<Tile {monsterData} damage={() => damageMonster(monsterData)} />
		{/each}
	</div>
</div>

<style>
	.frame {
		background-color: #0008;
		border-radius: 2rem;
		padding: 1rem;
	}

	.monsters-grid {
		position: relative;
	}
</style>
