<script>
	import { getPlayer } from '$lib/classes/player.svelte';
	import { WeaponTypes } from '$lib/classes/weapons.svelte';
	import { getPreferences } from '$lib/preferences.svelte';
	import { tweened } from 'svelte/motion';

	const player = getPlayer();
	const preferences = getPreferences();

	const manaPercent = $derived((player.currentMana / player.maxMana) * 100);
	const fullMana = $derived(player.currentMana === player.maxMana);
</script>

<div class="frame">
	<div class="bar-container">
		<div class="bar" style={`width: ${manaPercent}%;`}></div>
	</div>
	<button
		class="icon"
		class:active={false}
		class:disabled={false}
		onclick={() => handleWeaponClick(WeaponTypes.Magiblade)}
		style={`
				width: ${preferences.bench.tileSize}px; 
				background-image: url(${WeaponTypes.Magiblade.source});
			`}
		aria-label="Mana Button"
	></button>
</div>

<style>
	.frame {
		display: grid;
		grid-auto-flow: column;
		grid-template-columns: 1fr auto;
		grid-template-areas: 'bar icon';
		align-items: center;
	}

	.icon {
		aspect-ratio: 1 / 1;
		grid-area: icon;
		border-radius: 50%;
		background-size: cover;
		border: solid 4px brown;
		transition: scale 0.05s linear;
	}

	.bar-container {
		grid-area: bar;
		height: 1rem;
		background-color: #d9d9d9;
		padding: 2px;
		border-radius: 0.5rem 0 0 0.5rem;
		box-shadow: black 0 0 10px;
		/* overflow: hidden; */
	}

	.bar {
		height: 100%;
		background-color: teal;
		border-radius: 0.5rem 0 0 0.5rem;
	}
	.active {
		outline: solid yellow 3px;
	}

	.disabled {
		opacity: 0.5;
		pointer-events: none;
	}
</style>
