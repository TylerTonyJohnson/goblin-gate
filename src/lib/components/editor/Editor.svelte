<script>
	import BattleMenu from './BattleMenu.svelte';
	import RunMenu from './RunMenu.svelte';
	import StatMenu from './StatMenu.svelte';

	import { getPreferences } from '$lib/preferences.svelte';

	let { battle, battleParameters, seed, resetBattle, newBattle } = $props();

	const preferences = getPreferences();
</script>

<div class="frame">
	<div class="collapse-container top" class:open={preferences.editor.isTopOpen}>
		<RunMenu {resetBattle} {newBattle} />
		<button
			class="collapse-button-vertical"
			onclick={() => (preferences.editor.isTopOpen = !preferences.editor.isTopOpen)}
		>
			<span class="material-symbols-outlined" class:reversed={!preferences.editor.isTopOpen}>
				keyboard_arrow_up
			</span>
		</button>
	</div>
	<div class="collapse-container left" class:open={preferences.editor.isLeftOpen}>
		<StatMenu stats={battle.stats} pool={battle.tilePool} />
		<button
			class="collapse-button-side"
			onclick={() => (preferences.editor.isLeftOpen = !preferences.editor.isLeftOpen)}
		>
			<span class="material-symbols-outlined" class:reversed={!preferences.editor.isLeftOpen}>
				keyboard_arrow_left
			</span>
		</button>
	</div>
	<div class="collapse-container right" class:open={preferences.editor.isRightOpen}>
		<button
			class="collapse-button-side"
			onclick={() => (preferences.editor.isRightOpen = !preferences.editor.isRightOpen)}
		>
			<span class="material-symbols-outlined" class:reversed={!preferences.editor.isRightOpen}>
				keyboard_arrow_right
			</span>
		</button>
		<BattleMenu bind:battleParameters {seed} {resetBattle} />
	</div>
</div>

<style>
	.frame {
		position: absolute;
		max-height: 100%;
		min-width: 100%;
		display: grid;
		grid-template-columns: 1fr auto 1fr;
		/* grid-template-columns: auto 1fr auto; */
		grid-template-rows: 1fr auto 1fr;
		grid-template-areas:
			'left   header 	right'
			'left 	tablet 	right'
			'left   footer  right';
		/* padding: 1rem; */
		gap: 1rem;
		/* background-color: teal; */

		pointer-events: none;
	}

	.collapse-container {
		display: flex;
		position: relative;
		/* border: solid white 3px; */
		min-width: 5rem;
		min-height: 5rem;
		/* pointer-events: all; */
		transition: translate 0.5s ease-in-out;
		align-items: center;
		/* justify-self: center; */
	}

	.collapse-button-vertical {
		width: 9rem;
		height: 3rem;
		pointer-events: all;
	}

	.collapse-button-side {
		width: 3rem;
		height: 9rem;
		pointer-events: all;
	}

	.top {
		grid-area: header;
		flex-direction: column;
		place-self: start center;
		place-content: end center;
	}

	.top:not(.open) {
		translate: 0 calc(-1 * (100% - 3rem));
	}

	.right {
		grid-area: right;
		flex-direction: row;
		place-self: start end;
		place-content: space-between center;
	}

	.right:not(.open) {
		translate: calc(100% - 3rem);
	}

	.left {
		grid-area: left;
		flex-direction: row;
		place-self: start start;
		place-content: space-between center;
	}

	.left:not(.open) {
		translate: calc(-1 * (100% - 3rem));
	}

	.reversed {
		rotate: 180deg;
	}

	button > span {
		transition: rotate 0.5s ease-in-out;
	}
</style>
