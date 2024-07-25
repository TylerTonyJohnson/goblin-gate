<script>
	import Bench from '$lib/components/Bench.svelte';
	import EnduranceBar from '$lib/components/EnduranceBar.svelte';
	import ExperienceBar from '$lib/components/ExperienceBar.svelte';
	import { fade } from 'svelte/transition';
	import Defeat from './Defeat.svelte';
	import Field from './Field.svelte';

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
</script>

<svelte:head>
	<title>Home</title>
	<meta name="description" content="Svelte demo app" />
</svelte:head>

<div class="frame" transition:fade>
	<Field {reduceEndurance} {currentEndurance} {increaseExperience} />
	<Bench />
	<EnduranceBar {maxEndurance} {currentEndurance} />
	<ExperienceBar {maxExperience} {currentExperience} />
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
			'header 	header 	header'
			'endurance 	tablet 	experience'
			'. 			bench   .';
		gap: 1rem;
	}
</style>
