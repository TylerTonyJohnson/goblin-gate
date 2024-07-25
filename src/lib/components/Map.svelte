<script>
	import { scale } from 'svelte/transition';

	import mapImage from '$lib/images/Map.png';

	import { AppStates, getAppState } from '$lib/appState.svelte';
	import { LocationTypes } from '$lib/enums';

	const appState = getAppState();

	function enterBattle() {
		appState.state = AppStates.Battle;
	}

	function enterVillage() {
		appState.state = AppStates.Village;
	}

	const locations = [
		{
			type: LocationTypes.Battle,
			enter: enterBattle,
			coordinates: { x: 42, y: 12 }
		},
		{
			type: LocationTypes.Battle,
			enter: enterBattle,
			coordinates: { x: 22, y: 16 }
		},
		{
			type: LocationTypes.Battle,
			enter: enterBattle,
			coordinates: { x: 80, y: 67 }
		},
		{
			type: LocationTypes.NightBattle,
			enter: enterBattle,
			coordinates: { x: 55, y: 66 }
		},
		{
			type: LocationTypes.Village,
			enter: enterVillage,
			coordinates: { x: 12, y: 34 }
		}
	];
</script>

<div
	class="frame"
	style={`background-image: url(${mapImage});`}
	in:scale={{ delay: 1000 }}
	out:scale
>
	{#each locations as location}
		<div
			class="location"
			onclick={() => location.enter()}
			style={`
        background-image: url(${location.type.source});
        left: ${location.coordinates.x}%;
        bottom: ${location.coordinates.y}%;
    `}
		></div>
	{/each}
</div>

<style>
	.frame {
		position: absolute;
		left: 50%;
		top: 50%;
		transform: translate(-50%, -50%);

		display: grid;
		place-items: center;
		color: white;
		width: 700px;
		height: 700px;
		/* background-color: red; */
		background-size: cover;
		filter: drop-shadow(0 0 10px black);
	}

	.location {
		position: absolute;
		width: 50px;
		height: 50px;
		border: solid white 3px;
		border-radius: 20%;
		background-size: cover;
		translate:
			-50%,
			-50%;
		transition: scale 0.075s ease-out;
        box-shadow: 4px 4px 6px 0px rgba(0,0,0,0.75);
	}

	.location:hover {
		scale: 1.2;
	}

	.button {
		padding: 10px;
		background-color: brown;
		border: none;
		color: white;
		font-size: 20px;
		cursor: pointer;
	}
</style>
