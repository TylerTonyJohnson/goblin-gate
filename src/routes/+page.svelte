<script>
	import Bench from '../lib/components/Bench.svelte';
	import EnduranceBar from '../lib/components/EnduranceBar.svelte';
	import Tablet from '../lib/components/Tablet.svelte';
</script>

<svelte:head>
	<title>Home</title>
	<meta name="description" content="Svelte demo app" />
</svelte:head>

<div class="frame">
	<Tablet />
	<Bench />
	<EnduranceBar />
</div>

<style>
	.frame {
		display: grid;
		grid-template-columns: 1fr auto 1fr;
		grid-template-rows: auto auto auto;
		grid-template-areas: '. header .' 'endurance tablet experience' '. bench .';
		height: 100%;
	}
</style>
