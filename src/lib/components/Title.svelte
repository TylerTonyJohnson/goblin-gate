<script>
    import { fade } from 'svelte/transition';

	import titleImage from '$lib/images/Title.png';

	import { AppStates, getAppState } from '$lib/appState.svelte';

	const appState = getAppState();

	function enterGame() {
		appState.state = AppStates.Map;
	}
</script>

<div class="frame" transition:fade={{duration: 1000}}>
	<div class='image' style={`background-image: url(${titleImage})`}></div>
	<button class='button' onclick={() => enterGame()}>ENTER GAME</button>
</div>

<style>
	.frame {
		position: absolute;
        display: grid;
		left: 50%;
		top: 50%;
		transform: translate(-50%, -50%);
		color: white;
		/* background-color: green; */
		
	}

    .image {
        background-size: cover;
        width: 400px;
        aspect-ratio: 1;
    }

    .button {
        margin: 2rem auto;
        padding: 10px;
        background-color: #0005;
        border: none;
        color: white;
        font-size: 20px;
        cursor: pointer;
    }
</style>
