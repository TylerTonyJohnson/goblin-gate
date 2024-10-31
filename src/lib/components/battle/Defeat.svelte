<script>
	import { fade } from 'svelte/transition';

	import defeatImage from '$lib/images/Defeat.png';

	import { AppStates, getAppState } from '$lib/appState.svelte';

	const appState = getAppState();

	function returnToMap() {
		appState.state = AppStates.Map;
	}
</script>

<div class="frame" transition:fade>
	<div class="modal">
		<div class="image" style={`background-image: url(${defeatImage});`}></div>
		<button class='button' onclick={returnToMap}>BACK TO MAP</button>
	</div>
</div>

<style>
	.frame {
		position: absolute;
		display: grid;
		place-items: center;
		width: 100%;
		height: 100%;
		background-color: #0008;
	}
	.modal {
		display: grid;
		place-items: center;
		color: white;

		/* background-color: teal; */
	}

	.image {
		width: 400px;
		height: 400px;
		background-size: cover;
	}

    .button {
        margin: 2rem auto;
        padding: 10px;
        background-color: brown;
        border: none;
        color: white;
        font-size: 20px;
        cursor: pointer;
    }
</style>
