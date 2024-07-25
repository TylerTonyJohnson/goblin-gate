<script>
	import '../app.css';

	import { setPreferences } from '$lib/preferences.svelte';
	import { AppStates, setAppState } from '$lib/appState.svelte';
	import Header from '../lib/components/Header.svelte';
	import Footer from '../lib/components/Footer.svelte';

	setPreferences();
	const appState = setAppState();
</script>

<div class="app">
	<Header />
	<main>
		<slot />
	</main>
	<Footer />
</div>

<style>
	.app {
		display: grid;
		grid-template-areas: 'header' 'main' 'footer';
		/* flex-direction: column; */
		grid-template-rows: auto 1fr auto;
		max-width: 100vw;
		min-height: 100vh;
		background-position: center;
		background-size: cover;
	}

	main {
		flex: 1;
		display: grid;
		place-items: center;
		width: 100%;
		height: 100%;
		grid-area: main;
		/* background-color: red; */
		/* border: solid green 3px; */
	}
</style>
