<script>
	import { getPlayer } from '$lib/classes/player.svelte';
	import { WeaponTypes } from '$lib/classes/weapons.svelte';

	const player = getPlayer();

	function handleWeaponClick(weapon) {
		player.changeWeapon(weapon);
	}

	function formatNumber(range) {
		if (range === Infinity || range === 0) {
			return null;
		} else {
			return range;
		}
	}

	const fullCharge = $derived(player.currentCharge === player.maxCharge);
</script>

<div class="weapons">
	{#each player.unlockedWeapons as weaponType}
		<button
			class="weapon"
			class:active={weaponType === player.currentWeapon}
			class:disabled={player.currentSpell || (weaponType === WeaponTypes.Magiblade && !fullCharge)}
			onclick={() => handleWeaponClick(weaponType)}
			style={`background-image: url(${weaponType.source})`}
		>
			{#if formatNumber(weaponType.range)}
				<div class="bubble left bottom">
					<div class="range">{formatNumber(weaponType.range)}</div>
				</div>
			{/if}
			{#if formatNumber(weaponType.targets)}
				<div class="bubble right bottom">
					<div class="range">{formatNumber(weaponType.targets)}</div>
				</div>
			{/if}
			{#if formatNumber(weaponType.damage)}
				<div class="bubble left top">
					<div class="range">{formatNumber(weaponType.damage)}</div>
				</div>
			{/if}
			{#if formatNumber(weaponType.ammo)}
				<div class="bubble right top">
					<div class="range">{formatNumber(weaponType.ammo)}</div>
				</div>
			{/if}
		</button>
	{/each}
</div>

<style>
	.weapons {
		place-self: start;
		grid-area: weapons;
		display: flex;
		gap: 1rem;
	}

	.weapon {
		position: relative;
		width: 60px;
		aspect-ratio: 1 / 1;
		border-radius: 50%;
		background-size: cover;
		border: solid 4px brown;
		transition: 0.05s linear scale;
		/* padding: 0; */
	}

	.weapon:hover {
		scale: 1.1;
	}

	.active {
		outline: solid yellow 3px;
	}

	.disabled {
		opacity: 0.5;
		pointer-events: none;
	}

	.bubble {
		position: absolute;
		display: grid;
		place-items: center;
		width: 1rem;
		height: 1rem;
		font-size: smaller;
		font-weight: 800;
		line-height: 1rem;
		text-align: center;
		background-color: white;
		border-radius: 50%;
		outline: solid red 3px;
	}

	.left {
		left: 0;
	}

	.right {
		right: 0;
	}

	.top {
		top: 0;
	}

	.bottom {
		bottom: 0;
	}
</style>
