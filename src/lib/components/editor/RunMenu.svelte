<script>
	import EditCard from './EditCard.svelte';

	let { resetBattle, newBattle } = $props();

	function reinit() {
		localStorage.clear();
		location.reload();
	}
</script>

<EditCard>
	<!-- Run buttons -->
	<div class="button-container">
		<button class="button green" onclick={resetBattle}>RESET</button>
		<button class="button red" onclick={newBattle}>CREATE</button>
		<button class="button gray" onclick={reinit}>LOAD</button>
	</div>
</EditCard>

<style>
	.button-container {
		display: flex;
		grid-template-columns: 1fr 1fr;
		justify-content: space-between;
		/* padding: 1rem; */
		gap: 1rem;
	}

	.button {
		width: 100%;
		/* aspect-ratio: 1 / 1; */
		border-radius: 0.5rem;
		color: white;
		padding: 0.25rem;
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
</style>
