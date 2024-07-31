<script>
	import { fly } from 'svelte/transition';

	let { battleParameters = $bindable(), seed, resetBattle, createBattle } = $props();

</script>

<div class="frame" transition:fly={{ x: -200 }}>
	<div class="button-container">
		<button class="button green" onclick={resetBattle}>RESET</button>
		<button class="button red" onclick={createBattle}>CREATE</button>
		<!-- <button class="button blue">SAVE</button> -->
	</div>
	<div class="seed-container">
		<textarea class="seed">{seed}</textarea>
	</div>
	<div class="slider-container">
		<div class="monster-weights">
			{#each battleParameters.monsters as monsterWeight, index}
				<div class="slider">
					<label for="name1">{monsterWeight.type.name} {monsterWeight.weight}</label>
					<input
						type="range"
						id="name1"
						min="0"
						max="1"
						bind:value={monsterWeight.weight}
						step="0.1"
					/>
				</div>
			{/each}
		</div>
	</div>
</div>

<style>
	.frame {
		display: flex;
		flex-direction: column;
		height: 100%;
		/* width: 100%; */
		grid-area: right;
		background-color: blue;
		place-self: end end;
		justify-content: start;
		border-radius: 1.5rem;
		place-self: center start;
		gap: 1rem;
		padding: 1rem;
	}

	.button-container {
		display: flex;
		grid-template-columns: 1fr 1fr;
		justify-content: space-between;
		/* padding: 1rem; */
		gap: 1rem;
	}

	.button {
		width: 100%;
		aspect-ratio: 1 / 1;
		border-radius: 0.5rem;
		color: white;
	}

	.green {
		background-color: hsl(120, 40%, 40%);
	}

	.red {
		background-color: hsl(0, 40%, 40%);
	}

	.seed-container {
		width: 100%;
		display: grid;
		place-content: center;
		background-color: white;
		padding: 0.25rem;
	}

	.seed {
		width: 100%;
		background-color: white;
		color: brown;
		resize: none;
		/* padding: 1rem; */
		/* border-radius: 0.5rem; */
	}

	.slider {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		border: solid 1px black;
        color: white;
	}
</style>
