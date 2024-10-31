<script>
	import { fade } from 'svelte/transition';

	import tavernImage from '$lib/images/Tavern.png';
	import blacksmithImage from '$lib/images/Blacksmith.png';
	import spellshopImage from '$lib/images/Spellshop.png';

	import { AppStates, getAppState } from '$lib/appState.svelte';

	const appState = getAppState();

	function enterTavern() {
		appState.state = AppStates.Tavern;
	}

	function enterBlacksmith() {
		appState.state = AppStates.Blacksmith;
	}

	function enterSpellshop() {
		appState.state = AppStates.Spellshop;
	}
</script>

<div class="frame" transition:fade>
	<div class="location" transition:fade>
		<div class="image" style={`background-image: url(${tavernImage});`}></div>
		<button class="button" onclick={() => enterTavern()}>TAVERN</button>
	</div>
	<div class="location" transition:fade>
		<div class="image" style={`background-image: url(${blacksmithImage});`}></div>
		<button class="button" onclick={() => enterBlacksmith()}>BLACKSMITH</button>
	</div>
	<div class="location" transition:fade>
		<div class="image" style={`background-image: url(${spellshopImage});`}></div>
		<button class="button" onclick={() => enterSpellshop()}>SPELLSHOP</button>
	</div>
</div>

<style>
	.frame {
		position: absolute;
		width: 100%;
		height: 100%;
		left: 50%;
		top: 50%;
		transform: translate(-50%, -50%);

		display: grid;
		grid-auto-flow: column;
		gap: 2rem;
		place-items: center;
		color: white;

		background-size: cover;
		filter: drop-shadow(0 0 10px black);
	}

	.location {
		display: grid;
		gap: 1rem;
		place-items: center;
	}

	.image {
		width: 200px;
		height: 200px;
		background-size: cover;
		transition: width 0.5s;
		/* border: solid green 5px; */
	}

	.button {
		padding: 10px;
		background-color: brown;
		border: none;
		color: white;
		font-size: 20px;
		cursor: pointer;
	}

	.focused {
		width: 100%;
		height: 100%;
	}
</style>
