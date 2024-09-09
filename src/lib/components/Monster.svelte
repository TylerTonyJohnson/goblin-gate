<script>
	import { GemTypes } from '$lib/enums.js';

	let { monsterData, hover, unhover, attack, hovered, attached, selected } = $props();
</script>

<div
	class="frame"
	style={`
    background-image: url(${monsterData.type.source});
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

<style>
	.frame {
		position: relative;
		width: 100%;
		height: 100%;
		background-color: red;
		background-size: cover;
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
	}
</style>
