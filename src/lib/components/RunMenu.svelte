<script>
	import { fly } from 'svelte/transition';

	let { attackCount } = $props();
</script>

<div class="frame" transition:fly={{ x: -200 }}>
	<div class='attacks'>Attacks: {attackCount}</div>
</div>

<style>
	.frame {
		display: grid;
		grid-template-rows: auto 1fr auto;
		height: 100%;
		grid-area: left;
		background-color: blue;
		place-self: end end;
		justify-content: space-between;
		padding: 1.5rem;
		border-radius: 1.5rem;
        place-self: center end;
		/* padding: 1rem; */

		/* background-color: yellow; */
	}

	.attacks {
		color: white;
	}
</style>
