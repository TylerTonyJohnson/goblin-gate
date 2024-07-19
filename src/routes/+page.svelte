<script>
	import Bench from '../lib/components/Bench.svelte';
	import Tablet from '../lib/components/Tablet.svelte';
</script>

<svelte:head>
	<title>Home</title>
	<meta name="description" content="Svelte demo app" />
</svelte:head>

<div class="frame">
	<Tablet />
	<Bench />
</div>

<style>
	.frame {
		display: flex;
		height: 100%;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		/* flex: 0.6; */
	}
</style>
