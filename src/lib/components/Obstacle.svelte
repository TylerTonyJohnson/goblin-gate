<script>
	import { scale, fly } from 'svelte/transition';
	import { getPreferences } from '$lib/preferences.svelte';

	let { obstacleData } = $props();

	const preferences = getPreferences();
</script>

<button
	class="frame"
	in:fly={{ y: -500, duration: 1000 }}
	out:scale
	style={`
		left: ${obstacleData.coordinates.x * preferences.tileSize}px; 
		bottom: ${obstacleData.coordinates.y * preferences.tileSize}px;
		width: ${preferences.tileSize}px;
		height: ${preferences.tileSize}px;
	`}
>
	<div
		class="image"
		style={`
			background-image: url(${obstacleData.type.source});
			inset: ${preferences.tileGap}px;
		`}
	></div>
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
        border: solid black 5px;
		/* box-shadow:
			4px 4px 8px #0008,
			inset 8px 8px 8px #fff8,
			inset -8px -8px 8px #0008; */
	}
</style>
