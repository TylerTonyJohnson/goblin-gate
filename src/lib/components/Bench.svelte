<script>
	import { getPlayer } from '$lib/classes/player.svelte';

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
</script>

<div class="frame">
	<div class="weapons">
		{#each player.unlockedWeapons as weapon}
			<button
				class="weapon"
				class:active={weapon === player.currentWeapon}
				class:disabled={player.currentSpell}
				onclick={() => handleWeaponClick(weapon)}
				style={`background-image: url(${weapon.source})`}
			></button>
		{/each}
	</div>
	<div class="spells">
		{#each player.unlockedSpells as spell}
			<button
				class="spell"
				class:active={spell === player.currentSpell}
				onclick={() => handleSpellClick(spell)}
				style={`background-image: url(${spell.source})`}
			>
			{#if spell === player.currentSpell}
				<button class='exit' onclick={handleExitClick}>X</button>
			{/if}
		</button>
		{/each}
	</div>
</div>

<style>
	.frame {
		display: grid;
		grid-template-columns: 1fr 1fr;
		grid-area: bench;
		background-color: #00f8;
		border-radius: 2rem;
		padding: 1rem;
	}

	.weapons,
	.spells {
		display: flex;
		gap: 1rem;
	}

	.weapons {
		place-self: start;
	}

	.spells {
		place-self: end;
	}

	.weapon,
	.spell {
		position: relative;
		width: 80px;
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
</style>
