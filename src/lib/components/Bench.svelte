<script>
	import { getPlayer } from '$lib/classes/player.svelte';
	import { WeaponTypes } from '$lib/classes/weapons.svelte';

	const player = getPlayer();

	function handleWeaponClick(weapon) {
		player.changeWeapon(weapon);
	}

	function handleSpellClick(spell) {
		player.changeSpell(spell);
	}

	function handleExitClick(event) {
		// event.preventDefault();
		event.stopPropagation();
		console.log('exit');
		player.changeSpell(null);
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

<div class="frame">
	<div class="charge-container">
		<div class="charge" style={`width: ${(player.currentCharge / player.maxCharge) * 100}%`}></div>
	</div>
	<div class="mana-container">
		<div class="mana" style={`width: ${(player.currentMana / player.maxMana) * 100}%`}></div>
	</div>
	<div class="weapons">
		{#each player.unlockedWeapons as weaponType}
			<button
				class="weapon"
				class:active={weaponType === player.currentWeapon}
				class:disabled={player.currentSpell ||
					(weaponType === WeaponTypes.Magiblade && !fullCharge)}
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
	<div class="spells">
		{#each player.unlockedSpells as spellType}
			<button
				class="spell"
				class:active={spellType === player.currentSpell}
				onclick={() => handleSpellClick(spellType)}
				style={`background-image: url(${spellType.source})`}
			>
				{#if formatNumber(spellType.range)}
					<div class="bubble left bottom">
						<div class="range">{formatNumber(spellType.range)}</div>
					</div>
				{/if}
				{#if formatNumber(spellType.targets)}
					<div class="bubble right bottom">
						<div class="range">{formatNumber(spellType.targets)}</div>
					</div>
				{/if}
				{#if formatNumber(spellType.damage)}
					<div class="bubble left top">
						<div class="range">{formatNumber(spellType.damage)}</div>
					</div>
				{/if}
				{#if spellType === player.currentSpell}
					<button class="bubble right top" onclick={handleExitClick}>
						<div class="label">x</div>
					</button>
				{/if}
			</button>
		{/each}
	</div>
</div>

<style>
	.frame {
		display: grid;
		grid-template-columns: 1fr 1fr;
		grid-template-rows: auto auto;
		grid-template-areas:
			'charge 	mana'
			'weapons 	spells';
		grid-area: bench;
		gap: 1rem;
		background-color: #00f8;
		border-radius: 2rem;
		padding: 1rem;
	}

	.charge-container,
	.mana-container {
		display: grid;
		height: 1rem;
		width: 100%;
	}

	.charge-container {
		place-items: start;
		grid-area: charge;
		border: solid yellow 2px;
		border-radius: 1rem 0 0 1rem;
	}

	.charge {
		height: 100%;
		/* width: 50%; */
		background-color: yellow;
	}

	.mana-container {
		place-items: end;
		grid-area: mana;
		border: solid purple 2px;
		border-radius: 0 1rem 1rem 0;
	}

	.mana {
		height: 100%;
		/* width: 50%; */
		background-color: purple;
	}

	.weapons {
		place-self: start;
		grid-area: weapons;
		display: flex;
		gap: 1rem;
	}

	.spells {
		place-self: end;
		grid-area: spells;
		display: flex;
		gap: 1rem;
	}

	.weapon,
	.spell {
		position: relative;
		width: 60px;
		aspect-ratio: 1 / 1;
		border-radius: 50%;
		background-size: cover;
		border: solid 4px brown;
		transition: 0.05s linear scale;
		/* padding: 0; */
	}

	.weapon:hover,
	.spell:hover {
		scale: 1.1;
	}

	.active {
		outline: solid yellow 3px;
	}

	.disabled {
		opacity: 0.5;
		pointer-events: none;
	}

	.exit {
		position: absolute;
		height: 50%;
		aspect-ratio: 1 / 1;
		right: -20%;
		top: -20%;
		border-radius: 50%;
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

	.label {
		height: 100%;
		line-height: 100%;
		text-align: center;
	}
</style>
