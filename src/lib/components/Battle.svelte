<script>
	import { browser } from '$app/environment';
	import { fade } from 'svelte/transition';

	import { AppStates, getAppState } from '$lib/appState.svelte';
	import { getPlayer } from '$lib/classes/player.svelte';
	import { Battle } from '$lib/classes/battle.svelte.js';
	import { getRandomWord } from '$lib/classes/random.svelte';
	import { MonsterTypes } from '$lib/classes/monsters.svelte.js';

	import Bench from '$lib/components/Bench.svelte';
	import EnduranceBar from '$lib/components/EnduranceBar.svelte';
	import ExperienceBar from '$lib/components/ExperienceBar.svelte';
	import Defeat from './Defeat.svelte';
	import Field from './Field.svelte';
	import BattleMenu from './BattleMenu.svelte';
	import RunMenu from './RunMenu.svelte';

	const appState = getAppState();
	const player = getPlayer();

	/* 
		Battle Data
	*/
	const hitBox = {
		coordinates: { x: 0, y: 0 },
		dimensions: { x: 5, y: 7 }
	};

	let battleParameters = $state();

	if (localStorage.getItem('battleParameters')) {
		battleParameters = JSON.parse(localStorage.getItem('battleParameters'));
	} else {
		battleParameters = {
			dimensions: { x: 5, y: 7 },
			monsterCount: 40,
			monsterMapping: [
				{ type: MonsterTypes.Black, weight: 0.4 },
				{ type: MonsterTypes.White, weight: 0.2 },
				{ type: MonsterTypes.Yellow, weight: 0.1 },
				{ type: MonsterTypes.Green, weight: 0.1 },
				{ type: MonsterTypes.Blue, weight: 0.1 },
				{ type: MonsterTypes.Red, weight: 0.1 }
			],
			clustering: 0,
			fillCount: 20,
			obstacleMapping: 0.15
		};
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

	let attackCount = $state(0);
	let maxHealth = 0;

	const currentHealth = $derived(
		battle.monsterData.reduce((acc, monster) => {
			return acc + monster.currentHealth;
		}, 0)
	);

	let hoveredMonster = $state();
	let attachedMonsters = $derived(
		battle.getCluster(
			hoveredMonster,
			player.currentSpell ? player.currentSpell : player.currentWeapon
		)
	);

	let selectedMonsters = $state([]);

	// <---------- INTERACTIONS ---------->

	function resetBattle() {
		battle = new Battle(battleParameters, seed);
	}

	function newBattle() {
		germ = getRandomWord();
		saveSettings();
		resetBattle();
	}
	function hover(monster) {
		hoverMonster(monster);
	}

	function hoverMonster(monster) {
		hoveredMonster = monster;
	}

	function saveSettings() {
		localStorage.setItem('battleParameters', JSON.stringify(battleParameters));
	}

	function hit(monster) {
		selectedMonsters.push(monster);

		if (selectedMonsters.length < player.currentTool.targets) return;

		// Cast or attack?
		if (player.currentSpell) {
			battle.castMonster(selectedMonsters, player);
			player.changeSpell(null);
		} else if (player.currentWeapon) {
			battle.attackMonster(selectedMonsters, player);
		}

		// // Experience
		// if (appState.state === AppStates.Battle) {
		// 	const experience = calculateExperience(cluster);
		// 	player.addExperience(experience);
		// }

		// Reset
		selectedMonsters = [];
	}
</script>

<svelte:head>
	<title>BATTLE</title>
	<meta name="description" content="Svelte demo app" />
</svelte:head>

<div class="frame" transition:fade>
	<Field
		monsterData={battle.monsterData}
		obstacleData={battle.obstacleData}
		{battleParameters}
		{hit}
		{hover}
		{hitBox}
		{hoveredMonster}
		{attachedMonsters}
		{selectedMonsters}
	/>
	<Bench />

	{#if appState.state !== AppStates.Edit}
		<EnduranceBar />
		<ExperienceBar />
	{:else}
		<BattleMenu bind:battleParameters {seed} {resetBattle} {newBattle} />
		<RunMenu
			attackCount={battle.stats.attackCount}
			currentHealth={battle.stats.currentHealth}
			maxHealth={battle.stats.maxHealth}
			attackEfficiency={battle.stats.attackEfficiency}
			experienceGained={battle.stats.experienceGained}
		/>
	{/if}
	{#if player.currentEndurance < 1}
		<Defeat />
	{/if}
</div>

<style>
	.frame {
		position: relative;
		height: 100%;
		display: grid;
		grid-template-columns: 1fr auto 1fr;
		grid-template-rows: auto 1fr auto;
		grid-template-areas:
			'header	header 	header'
			'left 	tablet 	right'
			'bench 	bench   bench';
		padding: 1rem;
		gap: 1rem;
	}
</style>
