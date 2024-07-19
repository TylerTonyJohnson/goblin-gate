<script>
	import { fade, scale } from 'svelte/transition';
	import { GemTypes } from '../enums.js';
	import { getPreferences } from '$lib/preferences.svelte';

	let { monsterData, damage } = $props();

	const preferences = getPreferences();
</script>

<!-- svelte-ignore a11y_click_events_have_key_events -->
<!-- svelte-ignore a11y_no_static_element_interactions -->

<div
	class="frame"
	onclick={damage}
	out:scale
	style={`
		left: ${monsterData.coordinates.x * preferences.tileSize + preferences.tileGap * monsterData.coordinates.x}px; 
		bottom: ${monsterData.coordinates.y * preferences.tileSize + preferences.tileGap * monsterData.coordinates.y}px;
		width: ${preferences.tileSize}px;
		height: ${preferences.tileSize}px;
	`}
>
	<picture class="picture">
		<source srcset={monsterData.type.source} type="image/png" />
		<img class="profile" src={monsterData.type.source} alt={monsterData.type.name} />
	</picture>
	<div class="health-bar">
		{#each Array(monsterData.maxHealth) as heartToken, index}
			{#if index < monsterData.currentHealth}
				<img src={GemTypes.Green.source} class="health-segment" />
			{:else}
				<img src={GemTypes.Gray.source} class="health-segment" />
			{/if}
		{/each}
	</div>
</div>

<style>
	.frame {
		position: absolute;
		background-color: red;

		border-radius: 1rem;
		overflow: hidden;
		box-shadow:
			4px 4px 8px #0008,
			inset 8px 8px 8px #fff8,
			inset -8px -8px 8px #0008;

		transition:
			left 0.5s,
			bottom 0.5s;
	}

	.frame:hover {
		scale: 1.1;
	}

	.picture {
		position: absolute;
		width: 100%;
		height: 100%;
	}

	.debug {
		position: absolute;
		inset: 0;
		display: flex;
		justify-content: center;
		align-items: center;
		color: lime;
	}

	.profile {
		width: 100%;
		height: 100%;
	}

	.health-bar {
		position: absolute;
		bottom: 0;
		left: 0;
		width: 100%;
		height: 25%;

		display: flex;
		justify-content: center;
		align-items: center;
		gap: 2px;

		background-image: linear-gradient(to top, white, transparent);
	}

	.health-segment {
		height: 50%;
		width: 12.5%;
		/* background-color: yellow; */
	}
</style>
