<script>
	import Bench from '../lib/components/Bench.svelte';
	import EnduranceBar from '../lib/components/EnduranceBar.svelte';
	import Header from '../lib/components/Header.svelte';
	import Tablet from '../lib/components/Tablet.svelte';

	const endurance = 16;

	const maxEndurance = $state(endurance);
	let currentEndurance = $state(endurance);

	function reduceEndurance() {
		currentEndurance = Math.max(currentEndurance - 1, 0);
	}

</script>

<svelte:head>
	<title>Home</title>
	<meta name="description" content="Svelte demo app" />
</svelte:head>

<div class="frame">
	<Header />
	<Tablet {reduceEndurance} {currentEndurance} />
	<Bench />
	<EnduranceBar {maxEndurance} {currentEndurance} />
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
