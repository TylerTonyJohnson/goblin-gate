<script>
	import yellowGem from '$lib/images/Gem Yellow.png';
	import grayGem from '$lib/images/Gem Gray.png';

	let { maxExperience, currentExperience } = $props();
</script>

<div class="frame">
	<div class="display-container">
		<div class="display">{maxExperience}</div>
	</div>
	<div class="segment-container">
		{#each Array(maxExperience) as segment, index}
			<div class="segment" class:active={maxExperience - index <= currentExperience}>
				<!-- {#if index < currentEndurance}
                    <img src={yellowGem} class='gem' alt='gem' />
                {:else}
                    <img src={grayGem} class='gem' alt='gem' />
                {/if} -->
			</div>
		{/each}
	</div>
	<div class="display-container">
		<div class="display">{currentExperience}</div>
	</div>
</div>

<style>
	.frame {
		display: grid;
		grid-template-rows: auto 1fr auto;
		height: 100%;
		grid-area: experience;
		background-color: teal;
		place-self: start start;
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
		background-color: purple;
	}

	.segment:not(.active) {
		background-color: gray;
	}
</style>
