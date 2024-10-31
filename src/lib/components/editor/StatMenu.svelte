<script>
	import { flip } from 'svelte/animate';
	import EditCard from './EditCard.svelte';

	import { getPlayer } from '$lib/classes/player.svelte';

	let { stats, pool } = $props();

	const player = getPlayer();
</script>

<EditCard isScrollable={false}>
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
		{#each [...pool].sort((a, b) => b.weight - a.weight) as item (item)}
			<div class="data-container" animate:flip>
				<img class="img" src={item.type.source} alt="pool" />
				<div>{item.type.name}</div>
				<div>{item.weight}</div>
			</div>
		{/each}
	</div>
</EditCard>

<style>
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
