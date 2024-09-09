<script>
	import { fly } from 'svelte/transition';
	import { flip } from 'svelte/animate';

	import { getPlayer } from '$lib/classes/player.svelte';

	let { stats, pool } = $props();

	const player = getPlayer();

</script>

<div class="frame" transition:fly={{ x: -200 }}>
	<div class="group-container">
		<div class="group">
			<div class="label">Battle Stats</div>
			<div class="data-container">
				<div>Attack Count</div>
				<div>{stats.attackCount}</div>
			</div>
		</div>
		<div class="group">
			<div class="label">Battle Stats</div>
			<div class="data-container">
				<div>Total HP</div>
				<div>{stats.currentHealth} / {stats.maxHealth}</div>
			</div>
			<div class="data-container">
				<div>HP Per Attack</div>
				<div>{stats.attackEfficiency.toFixed(2)}</div>
			</div>
			<div class="data-container">
				<div>Exp Gained</div>
				<div>{stats.experienceGained}</div>
			</div>
		</div>
		<div class="group">
			<div class="label">Remaining</div>
			{#each pool.sort( (a, b) => b.weight - a.weight) as item (item)}
				<div class="data-container" animate:flip>
					<img class='img' src={item.type.source} alt="pool">
					<div>{item.type.name}</div>
					<div>{item.weight}</div>
				</div>
			{/each}
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

	.img {
		width: 2rem;
		height: 2rem;
	}
</style>
