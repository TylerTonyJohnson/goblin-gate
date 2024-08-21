<script>
	import Tile from '$lib/components/Tile.svelte';
	import Obstacle from '$lib/components/Obstacle.svelte';
	import { getPreferences } from '$lib/preferences.svelte';

	let {
		monsterData,
		obstacleData,
		battleParameters,
		hover,
		hit,
		hitBox,
		hoveredMonster,
		attachedMonsters,
		selectedMonsters
	} = $props();

	const preferences = getPreferences();
</script>

<div class="frame">
	<div
		class="monsters-grid"
		style={`width: ${battleParameters.dimensions.x * preferences.tileSize}px;`}
	>
		{#each obstacleData as obstacle (obstacle.id)}
			<Obstacle obstacleData={obstacle} />
		{/each}
		{#each monsterData as monster (monster.id)}
			<Tile
				monsterData={monster}
				attack={() => hit(monster)}
				hover={() => hover(monster)}
				unhover={() => hover(null)}
				hovered={monster === hoveredMonster}
				selected={selectedMonsters.includes(monster)}
				attached={attachedMonsters.includes(monster)}
			/>
		{/each}
	</div>
	<div class="hit-box" style={`height: ${hitBox.dimensions.y * preferences.tileSize + 16}px;`}></div>
</div>

<style>
	.frame {
		position: relative;
		grid-area: tablet;
		display: grid;
		place-items: center;
		height: 100%;
		background-color: #0008;
		/* background-color: lime; */
		border-radius: 0 0 2rem 2rem;
		padding-left: 1rem;
		padding-right: 1rem;
		padding-bottom: 1rem;
		mask-image: linear-gradient(to bottom, transparent, black 2rem);
	}

	.monsters-grid {
		position: relative;
		height: 100%;
		/* background-color: purple; */
		/* border: solid purple 4px; */
		/* bottom: 0; */
		/* background-color: red; */
	}

	.hit-box {
		position: absolute;
		left: 0.5rem;
		bottom: 0.5rem;
		width: calc(100% - 1rem);

		border: solid rgb(255, 64, 220) 5px;
		border-radius: 1.5rem;
		pointer-events: none;
	}
</style>
