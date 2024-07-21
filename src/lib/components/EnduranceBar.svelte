<script>
	import yellowGem from '$lib/images/Gem Yellow.png';
	import grayGem from '$lib/images/Gem Gray.png';

	let { maxEndurance, currentEndurance } = $props();
</script>

<div class="frame">
	<div class="segment-container">
		{#each Array(maxEndurance) as segment, index}
			<div class="segment" class:active={(maxEndurance - index) <= currentEndurance}>
				<!-- {#if index < currentEndurance}
                    <img src={yellowGem} class='gem' alt='gem' />
                {:else}
                    <img src={grayGem} class='gem' alt='gem' />
                {/if} -->
			</div>
		{/each}
	</div>
	<div class="display-container">
		<div class="display">{currentEndurance}</div>
	</div>
</div>

<style>
	.frame {
		display: grid;
		grid-template-rows: 1fr auto;
		height: 100%;
		grid-area: endurance;
		background-color: blue;
		place-self: end end;
		justify-content: space-between;
		padding: 1.5rem 0;
		border-radius: 1.5rem;
		/* padding: 1rem; */

		/* background-color: yellow; */
	}

	.segment-container {
		display: grid;
		/* gap: 0.25rem; */
		gap: 1px;
		padding: 1px;
		background-color: black;
	}

	.segment {
		/* width: 32px; */
		/* height: 32px; */
		background-color: yellow;
		/* border: solid 1px black; */
	}

	.display-container {
		display: grid;
		place-content: center;
	}

	.display {
		font-size: 2rem;
		text-align: center;
		width: 3rem;
		color: white;
		background-color: green;
	}

	.active {
		background-color: yellow;
	}

	.segment:not(.active) {
		background-color: gray;
	}
</style>
