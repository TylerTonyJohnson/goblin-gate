<script>
	import { fade } from 'svelte/transition';
	import { tick } from 'svelte';

	import { AppStates, getAppState } from '$lib/appState.svelte';
	import { createRandomBattle } from '$lib/classes/battle.svelte.js';
	import { getRandomWord } from '$lib/classes/random.svelte';
	import { MonsterTypes } from '$lib/enums';

	import Bench from '$lib/components/Bench.svelte';
	import EnduranceBar from '$lib/components/EnduranceBar.svelte';
	import ExperienceBar from '$lib/components/ExperienceBar.svelte';
	import Defeat from './Defeat.svelte';
	import Field from './Field.svelte';
	import BattleMenu from './BattleMenu.svelte';
	import RunMenu from './RunMenu.svelte';

	const appState = getAppState();

	/* 
		Battle Data
	*/
	const hitBox = {
		coordinates: { x: 0, y: 0 },
		dimensions: { x: 5, y: 5 }
	};

	const battleParameters = $state({
		dimensions: { x: 5, y: 7 },
		monsterCount: 50,
		monsters: [
			{ type: MonsterTypes.Black, weight: 0.4 },
			{ type: MonsterTypes.White, weight: 0.2 },
			{ type: MonsterTypes.Yellow, weight: 0.1 },
			{ type: MonsterTypes.Green, weight: 0.1 },
			{ type: MonsterTypes.Blue, weight: 0.1 },
			{ type: MonsterTypes.Red, weight: 0.1 }
		]
	});

	let germ = $state(getRandomWord());

	let seedWater = $derived(battleParameters.monsterCount + rawSeed(battleParameters.monsters));

	let seed = $derived(germ + '-' + seedWater);

	function rawSeed(weights) {
		return weights.reduce((acc, monsterWeight) => {
			return acc + monsterWeight.weight.toString().replace('0', '');
		}, '');
	}

	let battleData = $state();
	resetBattle();

	$inspect(battleData);

	let attackCount = $state(0);

	function hit() {
		attackCount = attackCount + 1;
	}

	/* 
		Endurance
	*/

	const endurance = 16;
	const maxEndurance = $state(endurance);
	let currentEndurance = $state(endurance);

	const experience = 32;
	const maxExperience = $state(experience);
	let currentExperience = $state(0);

	function reduceEndurance(reduce = 1) {
		currentEndurance = Math.max(currentEndurance - reduce, 0);
	}

	function increaseExperience(increase = 1) {
		currentExperience = currentExperience + increase;
	}

	/* 
		Functions
	*/

	async function createBattle() {
		germ = getRandomWord();
		battleData = createRandomBattle(battleParameters, seed);
	}

	function resetBattle() {
		battleData = createRandomBattle(battleParameters, seed);
	}
</script>

<svelte:head>
	<title>Home</title>
	<meta name="description" content="Svelte demo app" />
</svelte:head>

<div class="frame" transition:fade>
	<Field {battleData} {battleParameters} {hit} {reduceEndurance} {currentEndurance} {increaseExperience} {hitBox} />
	<Bench />

	{#if appState.state !== AppStates.Edit}
		<EnduranceBar {maxEndurance} {currentEndurance} />
		<ExperienceBar {maxExperience} {currentExperience} />
	{:else}
		<BattleMenu {battleParameters} {seed} {resetBattle} {createBattle} />
		<RunMenu {attackCount} />
	{/if}
	{#if currentEndurance < 1}
		<Defeat />
	{/if}
</div>

<style>
	.frame {
		position: relative;
		height: 100%;
		display: grid;
		grid-template-columns: 1fr auto 1fr;
		grid-template-rows: auto auto auto;
		grid-template-areas:
			'header	header 	header'
			'left 	tablet 	right'
			'bench 	bench   bench';
		padding: 1rem;
		gap: 1rem;
	}
</style>
