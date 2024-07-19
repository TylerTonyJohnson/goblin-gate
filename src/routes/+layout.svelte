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
		width: 100vw;
		min-height: 100vh;
		background-position: center;
		background-size: cover;
	}

	main {
		flex: 1;
		display: flex;
		flex-direction: column;
		padding: 1rem;
		width: 100%;
		max-width: 64rem;
		margin: 0 auto;
		box-sizing: border-box;
	}

	footer {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		padding: 12px;
	}

	footer a {
		font-weight: bold;
	}

	@media (min-width: 480px) {
		footer {
			padding: 12px 0;
		}
	}
</style>
