<script>
	import { AppStates, getAppState } from '$lib/appState.svelte';

	const appState = getAppState();

	function exit() {
		appState.state = AppStates.Map;
	}
</script>

<div class="frame">
	<button onclick={exit}>EXIT</button>
</div>

<style>
	.frame {
		position: relative;
		width: 200px;
		height: 200px;
		background-color: red;
		color: blue;
	}
</style>
