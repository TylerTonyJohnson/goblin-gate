<script>
	import { fly } from 'svelte/transition';

	import { getPlayer } from '$lib/classes/player.svelte';

	let { attackCount, currentHealth, maxHealth, attackEfficiency, experienceGained } = $props();

	const player = getPlayer();

</script>

<div class="frame" transition:fly={{ x: -200 }}>
	<div class="group-container">
		<div class="group">
			<div class="label">Battle Stats</div>
			<div class="data-container">
				<div>Attack Count</div>
				<div>{attackCount}</div>
			</div>
		</div>
		<div class="group">
			<div class="label">Battle Stats</div>
			<div class="data-container">
				<div>Total HP</div>
				<div>{currentHealth} / {maxHealth}</div>
			</div>
			<div class="data-container">
				<div>HP Per Attack</div>
				<div>{attackEfficiency.toFixed(2)}</div>
			</div>
			<!-- <div class="data-container">
				<div>Endurance used</div>
				<div>{player.currentEndurance}</div>
			</div> -->
			<div class="data-container">
				<div>Exp Gained</div>
				<div>{experienceGained}</div>
			</div>
		</div>
	</div>
</div>

<style>
	.frame {
		display: flex;
		flex-direction: column;
		height: 100%;
		/* max-width: 25vw; */
		/* width: 100%; */
		grid-area: left;
		background-color: blue;
		justify-content: start;
		border-radius: 1.5rem;
		place-self: center end;
		gap: 1rem;
		padding: 1rem;
	}

	.group-container {
		display: flex;
		flex-direction: column;
		gap: 1rem;
	}

	.label {
		/* border: solid red 1px; */
		color: white;
		text-align: center;
	}

	.data-container {
		display: flex;
		min-width: 10rem;
		/* flex-direction: column; */
		justify-content: space-between;
		align-items: center;
		padding: 0.5rem;
		gap: 1rem;
		color: white;
		border: solid 1px black;
	}
</style>
