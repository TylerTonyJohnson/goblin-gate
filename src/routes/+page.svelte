<script>
	import fieldImage from '$lib/images/Field.jpg';
	import villageImage from '$lib/images/Village.png';
	import tavernImage from '$lib/images/Tavern.png';
	import blacksmithImage from '$lib/images/Blacksmith.png';
	import spellshopImage from '$lib/images/Spellshop.png';
	import editImage from '$lib/images/Blueprint.png';

	import { AppStates, setAppState, getAppState } from '$lib/appState.svelte';
	import Title from '$lib/components/Title.svelte';
	import Map from '$lib/components/Map.svelte';
	import Battle from '$lib/components/Battle.svelte';
	import Village from '$lib/components/Village.svelte';
	import { fly } from 'svelte/transition';
	import Tavern from '../lib/components/Tavern.svelte';

	const appState = getAppState();

</script>

<div class="frame">
	{#if appState.state === AppStates.Title || appState.state === AppStates.Map || appState.state === AppStates.Battle}
		<div
			class="backdrop"
			in:fly={{ x: -100, opacity: 0 }}
			out:fly={{ x: 100, opacity: 1 }}
			style={`background-image: url(${fieldImage});`}
		></div>
		{#if appState.state === AppStates.Title}
			<Title />
		{:else if appState.state === AppStates.Map}
			<Map />
		{:else if appState.state === AppStates.Battle}
			<Battle />
		{/if}
	{:else if appState.state === AppStates.Village}
		<div
			class="backdrop"
			in:fly={{ x: -100, opacity: 0 }}
			out:fly={{ x: 100, opacity: 1 }}
			style={`background-image: url(${villageImage});`}
		></div>
		<Village appState={appState.state} {setAppState} />
	{:else if appState.state === AppStates.Tavern}
		<div
			class="backdrop"
			in:fly={{ x: -100, opacity: 0 }}
			out:fly={{ x: 100, opacity: 1 }}
			style={`background-image: url(${tavernImage});`}
		></div>
		<Tavern />
	{:else if appState.state === AppStates.Blacksmith}
		<div
			class="backdrop"
			in:fly={{ x: -100, opacity: 0 }}
			out:fly={{ x: 100, opacity: 1 }}
			style={`background-image: url(${blacksmithImage});`}
		></div>
	{:else if appState.state === AppStates.Spellshop}
		<div
			class="backdrop"
			in:fly={{ x: -100, opacity: 0 }}
			out:fly={{ x: 100, opacity: 1 }}
			style={`background-image: url(${spellshopImage});`}
		></div>
	{:else if appState.state === AppStates.Edit}
		<div
			class="backdrop"
			in:fly={{ x: -100, opacity: 0 }}
			out:fly={{ x: 100, opacity: 0 }}
			style={`background-image: url(${editImage});`}
		></div>
		<Battle />
	{:else}
		<div>Error</div>
	{/if}
</div>

<style>
	.frame {
		position: absolute;
		inset: 0;
		overflow: hidden;
		max-height: 100%;
		/* background-color: black; */

		/* position: absolute; */
		/* width: 100%;
		height: 100%;
		left: 50%;
		top: 50%; */
		/* transform: translate(-50%, -50%); */
		/* display: grid;
		place-items: center;
		color: white; */
	}

	.backdrop {
		position: absolute;
		width: 100%;
		height: 100%;
		background-color: #0008;
		background-size: cover;
		background-position: center;
		/* filter:blur(5px); */
	}
</style>
