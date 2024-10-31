<script>
	import { getPlayer } from '$lib/classes/player.svelte';
	import { WeaponTypes } from '$lib/classes/weapons.svelte';
	import { getPreferences } from '$lib/preferences.svelte';

	const player = getPlayer();
	const preferences = getPreferences();

	const chargePercent = $derived((player.currentCharge / player.maxCharge) * 100);
	const fullCharge = $derived(player.currentCharge === player.maxCharge);

	function handleWeaponClick(weapon) {
		player.changeWeapon(weapon);
	}
</script>

<div class="frame">
	<div class="bar-container">
		<div class="empty bar"></div>
		<div class="full bar" style={`width: calc(${chargePercent}% - 4px);`}></div>
	</div>
	<button
		class="icon"
		class:magic={fullCharge}
		class:active={player.currentWeapon === WeaponTypes.Magiblade}
		class:disabled={player.currentSpell || !fullCharge}
		onclick={() => handleWeaponClick(WeaponTypes.Magiblade)}
		style={`
				width: ${preferences.bench.tileSize}px; 
				background-image: url(${WeaponTypes.Magiblade.source});
			`}
		aria-label="Charge Button"
	></button>
</div>

<style>
	.frame {
		display: grid;
		grid-auto-flow: column;
		grid-template-columns: auto 1fr;
		grid-template-areas: 'icon bar';
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
		position: relative;
		grid-area: bar;
		height: 1rem;
		background-color: #d9d9d9;
		/* padding: 2px; */
		border-radius: 0 0.5rem 0.5rem 0;
		box-shadow: black 0 0 10px;
	}

	.bar {
		position: absolute;
		height: calc(100% - 4px);
		top: 2px;
		left: 2px;
		border-radius: 0 0.5rem 0.5rem 0;
	}

	.empty {
		width: calc(100% - 4px);
		background-color: gray;
		box-shadow: inset black 0 0 10px;
	}

	.full {
		background-color: hsl(180, 100%, 100%);
		box-shadow: hsl(180, 100%, 50%) 0 0 10px 10px, hsl(180, 100%, 50%) 0 0 5px inset;
	}

	.active {
		outline: solid yellow 3px;
	}
	/* .progress-path {
		stroke-dasharray: 760;
		stroke-dashoffset: 100;
	} */

	.magic {
		animation: scale 2s ease-in-out infinite;
		/* position: relative; */
		/* z-index: 1; */
	}

	.disabled {
		/* opacity: 0.5; */
		filter: grayscale(100%);
		pointer-events: none;
	}

	.magic::before {
		content: '';
		position: absolute;
		inset: -100%;
		background-image: conic-gradient(#fd004c, #fe9000, #fff020, #3edf4b, #3363ff, #b102b7, #fd004c);
		animation: rotate 5s linear infinite;
		border-radius: 50%;
		/* clip-path: circle(50% at center); */
		mask-image: radial-gradient(transparent 0%, transparent 30%, white 35%, transparent 60%);
		/* background-blend-mode: screen; */
		/* z-index: -1; */
	}

	@keyframes scale {
		0% {
			transform: scale(1);
		}
		50% {
			transform: scale(1.1);
		}
		100% {
			transform: scale(1);
		}
	}

	@keyframes rotate {
		0% {
			transform: rotate(0deg);
		}
		100% {
			transform: rotate(360deg);
		}
	}
</style>
