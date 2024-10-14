<script>
	import Tile from '$lib/components/Tile.svelte';
	import { getPreferences } from '$lib/preferences.svelte';

	let {
		tileData,
		battleParameters,
		hover,
		hit,
		hoveredTile,
		attachedTiles,
		selectableTiles,
		selectedTiles
	} = $props();

	const preferences = getPreferences();
</script>

<div class="frame">
	<div
		class="monsters-grid"
		style={`width: ${battleParameters.dimensions.x * preferences.tileSize}px;`}
	>
		{#each tileData as tile (tile.id)}
			<Tile
				tileData={tile}
				attack={() => hit(tile)}
				hover={hover}
				unhover={() => hover(null)}
				hovered={tile === hoveredTile}
				attached={attachedTiles.includes(tile)}
				selectable={selectableTiles.includes(tile)}
				selected={selectedTiles.includes(tile)}
			/>
		{/each}
	</div>
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
</style>
