<script>
	import { fade } from 'svelte/transition';

	import { AppStates, getAppState } from '$lib/appState.svelte';
	import { getPlayer } from '$lib/classes/player.svelte';
	import { getPreferences } from '$lib/preferences.svelte';
	import { Battle } from '$lib/classes/battle.svelte.js';
	import { getRandomWord } from '$lib/classes/random.svelte';

	import Bench from '$lib/components/Bench.svelte';
	import EnduranceBar from '$lib/components/EnduranceBar.svelte';
	import ExperienceBar from '$lib/components/ExperienceBar.svelte';
	import Defeat from './Defeat.svelte';
	import Field from './Field.svelte';
	import BattleMenu from './BattleMenu.svelte';
	import RunMenu from './RunMenu.svelte';

	const appState = getAppState();
	const player = getPlayer();
	const preferences = getPreferences();

	/* 
		Battle Data
	*/
	let battleParameters = $state();

	// Load preferences
	if (localStorage.getItem('battleParameters')) {
		battleParameters = JSON.parse(localStorage.getItem('battleParameters'));
	} else {
		battleParameters = preferences.defaultBattleParameters;
	}

	// Seed

	let germ = $state(getRandomWord());

	let seedWater = $derived(
		battleParameters.monsterCount.toFixed(1) +
			flattenSeed(battleParameters.monsterMapping) +
			battleParameters.clustering.toFixed(1)
	);

	let seed = $derived(germ + '-' + seedWater);

	function flattenSeed(weights) {
		return weights.reduce((acc, monsterWeight) => {
			return acc + monsterWeight.weight.toString().replace('0', '');
		}, '');
	}

	/* 
		RUNTIME
	*/
	let battle = $state();

	resetBattle();

	let hoveredTile = $state();
	let attachedTiles = $derived(player.currentTool.getTargets(hoveredTile, battle.tileData));

	let selectableTiles = $derived(
		battle.tileData.filter((tile) => player.currentTool.targetTypes.includes(tile.tileType))
	);

	let selectedTiles = $state([]);

	// <---------- INTERACTIONS ---------->

	function resetBattle() {
		battle = new Battle(battleParameters, seed);
		player.resetForBattle();
	}

	function newBattle() {
		germ = getRandomWord();
		saveSettings();
		resetBattle();
	}
	function hover(tile) {
		hoveredTile = tile;
	}

	function saveSettings() {
		localStorage.setItem('battleParameters', JSON.stringify(battleParameters));
	}

	function hit(tile) {
		// Get targets
		const targets = player.currentTool.getTargets(tile, battle.tileData);

		// Hit targets and get killed monsters
		const killedMonsters = player.currentTool.hit(targets);
		if (killedMonsters) {
			battle.killMonsters(killedMonsters);

			// Experience
			const experience = battle.calculateExperience(killedMonsters);
			if (experience) player.addExperience(experience);
		}

		// Update player
		player.hit(player.currentTool);
	}
</script>

<svelte:head>
	<title>BATTLE</title>
	<meta name="description" content="Svelte demo app" />
</svelte:head>

<div class="frame" transition:fade>
	<Field
		tileData={battle.tileData}
		obstacleData={battle.obstacleData}
		{battleParameters}
		{hit}
		{hover}
		{hoveredTile}
		{attachedTiles}
		{selectableTiles}
		{selectedTiles}
	/>
	<Bench />

	{#if appState.state !== AppStates.Edit}
		<EnduranceBar />
		<ExperienceBar />
	{:else}
		<BattleMenu bind:battleParameters {seed} {resetBattle} {newBattle} />
		<RunMenu stats={battle.stats} pool={battle.tilePool} />
	{/if}
	{#if player.currentEndurance < 1}
		<Defeat />
	{/if}
</div>

<style>
	.frame {
		position: relative;
		max-height: 100%;
		display: grid;
		grid-template-columns: 1fr auto 1fr;
		grid-template-rows: auto 1fr auto;
		grid-template-areas:
			'header	header 	header'
			'left 	tablet 	right'
			'bench 	bench   bench';
		padding: 1rem;
		gap: 1rem;
		/* background-color: teal; */
	}
</style>
