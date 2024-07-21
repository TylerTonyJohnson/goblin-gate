<script>
	import '../app.css';

	import { setPreferences } from '$lib/preferences.svelte';

	import background from '$lib/images/Background.jpg';

	setPreferences();
</script>

<div class="app" style={`background-image: url(${background});`}>
	<main>
		<slot />
	</main>
</div>

<style>
	.app {
		display: flex;
		flex-direction: column;
		max-width: 100vw;
		min-height: 100vh;
		background-position: center;
		background-size: cover;
	}

	main {
		flex: 1;
		display: flex;
		flex-direction: column;
		width: 100%;
	}
</style>
