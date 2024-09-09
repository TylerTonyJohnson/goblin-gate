<script>
	import { scale, fly } from 'svelte/transition';
	import { getPreferences } from '$lib/preferences.svelte';
	import Monster from '$lib/components/Monster.svelte';
	import Obstacle from '$lib/components/Obstacle.svelte';
	import Treasure from '$lib/components/Treasure.svelte';
	import Villager from '$lib/components/Villager.svelte';

	import { TileTypes } from '$lib/classes/tiles.svelte';

	let { tileData, hover, unhover, attack, hovered, attached, selectable, selected } = $props();

	const preferences = getPreferences();

	// const duration = tileData.tileType === TileTypes.Obstacle ? 0 : 1000;

	// $inspect(tileData);
</script>

<button
	class="frame"
	onmouseenter={hover}
	onmouseleave={unhover}
	onclick={attack}
	class:hovered
	class:attached
	class:selected
	class:selectable
	in:fly={{ y: -500, duration: 500 }}
	out:scale
	style={`
		left: ${tileData.coordinates.x * preferences.tileSize}px; 
		bottom: ${tileData.coordinates.y * preferences.tileSize}px;
		width: ${preferences.tileSize * tileData.type.size.x}px;
		height: ${preferences.tileSize * tileData.type.size.y}px;
	`}
>
	<div
		class="tile-contents"
		class:top={tileData.type.size.y > 1}
		style={`
		inset: ${preferences.tileGap}px;
		border-color: ${tileData.tileType.theme};
	`}
	>
		{#if tileData.tileType === TileTypes.Obstacle}
			<Obstacle obstacleData={tileData} />
		{:else if tileData.tileType === TileTypes.Monster}
			<Monster monsterData={tileData} />
		{:else if tileData.tileType === TileTypes.Treasure}
			<Treasure treasureData={tileData} />
		{:else if tileData.tileType === TileTypes.Villager}
			<Villager villagerData={tileData} />
		{/if}
	</div>
</button>

<style>
	.frame {
		position: absolute;
		background-color: transparent;

		border: none;
		background-size: cover;
		transition:
			left 0.5s,
			bottom 0.5s;
		/* transition-delay: 0.5s; */
	}

	.tile-contents {
		position: absolute;
		display: grid;
		place-items: center;
		transition: scale linear 0.05s;
		border-radius: 1rem;
		overflow: hidden;
		border-width: 5px;
		border-style: solid;
		z-index: 1;
		/* background-color: teal; */
	}

	.selectable {
		/* background-color: orange; */
	}

	.hovered > .tile-contents {
		scale: 1.1;
		/* inset: 0px; */
		/* border: solid black 2px; */
	}
	.attached {
		/* transform: scale(1.1); */
		/* outline: solid magenta 3px; */
		background-color: lime;
	}

	.selected {
		transform: scale(1.1);
		/* outline: solid magenta 3px; */
		background-color: magenta;
	}

	.top {
		z-index: 2;
	}
</style>
