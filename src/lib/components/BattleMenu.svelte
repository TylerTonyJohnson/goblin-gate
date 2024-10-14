<script>
	import { fly } from 'svelte/transition';

	let { battleParameters = $bindable(), seed, resetBattle, newBattle } = $props();

	function reinit() {
		localStorage.clear();
		location.reload();
	}
</script>

<div class="frame" transition:fly={{ x: -200 }}>
	<!-- Scrolling content -->
	<div class="content-container">
		<!-- Run buttons -->
		<div class="button-container">
			<button class="button green" onclick={resetBattle}>RESET</button>
			<button class="button red" onclick={newBattle}>CREATE</button>
			<button class="button gray" onclick={reinit}>LOAD</button>
		</div>

		<!-- Seed -->
		<div class="seed-container">
			<textarea class="seed">{seed}</textarea>
		</div>

		<!-- Battle Size -->
		<div class="block">
			<div class="group">
				<div class="label">SIZE</div>
				<div class="size-inputs">
					<label for="num-input">x</label>
					<input
						class="num-input"
						type="number"
						onchange={resetBattle}
						bind:value={battleParameters.dimensions.x}
					/>
					<label for="num-input">y</label>
					<input
						class="num-input"
						type="number"
						onchange={resetBattle}
						bind:value={battleParameters.dimensions.y}
					/>
				</div>
			</div>
		</div>

		<!-- Monster stuff -->
		<div class="block">
			<div class="group">
				<div class="label">MONSTERS</div>
				<div class="monster-weights">
					<div class="count-container">
						<label for="monster-count">Count</label>
						<input
							class="monster-count"
							type="number"
							disabled={battleParameters.endless}
							bind:value={battleParameters.monsterCount}
						/>
						<label for="monster-count">∞</label>
						<input type="checkbox" bind:checked={battleParameters.endless} />
					</div>
					{#each battleParameters.monsterMapping as monsterWeight}
						<div class="row">
							<label for="name1">{monsterWeight.type.name} {monsterWeight.weight}</label>
							<input type="range" min="0" max="1" bind:value={monsterWeight.weight} step="0.05" />
						</div>
					{/each}
				</div>
			</div>

			<!-- Obstacles -->
			<div class="group">
				<div class="label">OBSTACLES</div>
				{#if battleParameters.obstacleMapping}
					{#each battleParameters.obstacleMapping as obstacleWeight}
						<div class="row">
							<div class="label">{obstacleWeight.type.name} {obstacleWeight.weight}</div>
							<input type="range" min="0" max="10" step="1" bind:value={obstacleWeight.weight} />
						</div>
					{/each}
				{/if}
			</div>

			<!-- Villagers -->
			<div class="group">
				<div class="label">Villagers: {battleParameters.villagerMapping}</div>
				<div class="row">
					<input
						type="range"
						min="0"
						max="10"
						bind:value={battleParameters.villagerMapping}
						step="1"
					/>
				</div>
			</div>

			<!-- Treasure -->
			<div class="group">
				<div class="label">Treasures: {battleParameters.treasureMapping}</div>
				<div class="row">
					<input
						type="range"
						min="0"
						max="10"
						bind:value={battleParameters.treasureMapping}
						step="1"
					/>
				</div>
			</div>

			<!-- Clustering -->
			<div class="group">
				<div class="label">Clustering: {battleParameters.clustering}</div>
				<div class="row">
					<input
						type="range"
						disabled
						min="-1"
						max="1"
						bind:value={battleParameters.clustering}
						step="0.05"
					/>
				</div>
			</div>
		</div>
	</div>
</div>

<style>
	.frame {
		display: flex;
		flex-direction: column;
		max-height: 100%;
		/* width: 100%; */
		grid-area: right;
		background-color: blue;
		place-self: end end;
		justify-content: start;
		border-radius: 1.5rem;
		place-self: center start;
		gap: 1rem;
		padding: 1rem;
		overflow-y: scroll;
	}

	.content-container {
		display: flex;
		flex-direction: column;
		gap: 1rem;
		/* overflow: scroll; */
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

	.gray {
		background-color: hsl(0, 20%, 20%);
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

	.block {
		display: flex;
		flex-direction: column;
		gap: 1rem;
	}

	.row {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		border: solid 1px black;
		color: white;
	}

	.label {
		/* border: solid red 1px; */
		color: white;
		text-align: center;
	}

	.count-container {
		display: flex;
		/* flex-direction: column; */
		justify-content: space-between;
		align-items: center;
		padding: 0.5rem;
		gap: 1rem;
		color: white;
		border: solid 1px black;
	}

	.monster-count {
		width: 3rem;
	}

	.size-inputs {
		display: flex;
		justify-content: end;
		/* justify-content: space-between; */
	}

	.num-input {
		width: 2rem;
	}

	::-webkit-scrollbar {
		width: 10px;
	}

	::-webkit-scrollbar-track-piece {
		background-color: transparent;
	}

	::-webkit-scrollbar-thumb {
		background-color: #cbcbcb;
		visibility: hidden;
		border-radius: 5px;
		outline: none;
		outline-offset: -2px;
		border: none;
		transition: all 0.5s linear;
	}

	.frame:hover::-webkit-scrollbar-thumb {
		visibility: visible;
	}

	/* Shrink scrollbar a bit */
	::-webkit-scrollbar-button:end:increment,
	::-webkit-scrollbar-button:start:decrement {
		height: 5%;
	}
</style>
