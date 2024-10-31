<script>
	import { getPlayer } from '$lib/classes/player.svelte';

	const player = getPlayer();

	function handleSpellClick(spell) {
		player.changeSpell(spell);
	}

	function handleExitClick(event) {
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
</script>

<div class="spells">
	{#each player.unlockedSpells as spellType}
		<button
			class="spell"
			class:active={spellType === player.currentSpell}
			class:disabled={(player.currentSpell && spellType !== player.currentSpell) ||
				spellType.cost > player.currentMana}
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

<style>
	.spells {
		place-self: end;
		grid-area: spells;
		display: flex;
		gap: 1rem;
	}

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
