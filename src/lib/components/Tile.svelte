<script>
	import { scale, fly } from 'svelte/transition';
	import { GemTypes } from '../enums.js';
	import { getPreferences } from '$lib/preferences.svelte';

	let { monsterData, hover, unhover, attack, hovered, attached } = $props();

	const preferences = getPreferences();
</script>

<button
	class="frame"
	onmouseenter={hover}
	onmouseleave={unhover}
	onclick={attack}
	class:hovered
	class:attached
	in:fly={{ y: -500, duration: 1000 }}
	out:scale
	style={`
		left: ${monsterData.coordinates.x * preferences.tileSize}px; 
		bottom: ${monsterData.coordinates.y * preferences.tileSize}px;
		width: ${preferences.tileSize}px;
		height: ${preferences.tileSize}px;
	`}
>
	<div
		class="image"
		style={`
			background-image: url(${monsterData.type.source});
			inset: ${preferences.tileGap}px;
			border: solid ${monsterData.type.theme} 3px;
		`}
	>
		<div class="health-bar">
			{#each Array(monsterData.maxHealth) as heartToken, index}
				{#if index < monsterData.currentHealth}
					<img src={GemTypes.Green.source} class="health-segment" alt="gem" />
				{:else}
					<img src={GemTypes.Gray.source} class="health-segment" alt="gem" />
				{/if}
			{/each}
		</div>
	</div>
</button>

<style>
	.frame {
		position: absolute;
		background-color: transparent;

		border: none;
		transition:
			left 0.5s,
			bottom 0.5s;
		/* transition-delay: 0.5s; */
	}

	.image {
		position: absolute;
		background-color: red;
		background-size: cover;
		border-radius: 1rem;
		overflow: hidden;
		transition: scale linear 0.05s;
		/* box-shadow:
			4px 4px 8px #0008,
			inset 8px 8px 8px #fff8,
			inset -8px -8px 8px #0008; */
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

	.hovered > .image {
		scale: 1.1;
		/* inset: 0px; */
		border: solid black 2px;
	}
	.attached {
		/* transform: scale(1.1); */
		/* outline: solid magenta 3px; */
		background-color: lime;
	}
</style>
