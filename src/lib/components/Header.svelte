<script>
	import { page } from '$app/stores';
	import { goto } from '$app/navigation';

	import { AppStates, getAppState } from '$lib/appState.svelte';

	let button1Text = 'Button 1';
	let button3Text = 'Button 3';

	const appState = getAppState();

	function handleClick(buttonText) {
		console.log(`Clicked ${buttonText}`);
	}

	function enterGame() {
		appState.state = AppStates.Title;
	}

	function toggleEdit(event) {
		if (event.target.checked) {
			appState.state = AppStates.Edit;
		} else {
			appState.state = AppStates.Title;
		}

		console.log(appState.state);
	}
</script>

<header>
	<button class="left" onclick={() => handleClick(button1Text)}>{button1Text}</button>
	<h1 onclick={enterGame}>Goblin Gate</h1>
	<!-- <button class="right" onclick={() => handleClick(button3Text)}>{button3Text}</button> -->
	<!-- <input class='right' type="checkbox" /> -->
	<div class="right">
		<label for="input">EDIT</label>
		<input type="checkbox" onchange={toggleEdit} />
	</div>
</header>

<style>
	header {
		width: 100%;
		background-color: #8b5288;
		padding: 20px;
		display: grid;
		grid-template-columns: 1fr auto 1fr;
		align-items: center;
		justify-content: space-between;
		grid-area: header;
		color: white;
		font-family: 'Machine Gunk';
	}

	h1 {
		margin: 0;
		/* background-color: teal; */
		cursor: pointer;
	}

	button {
		margin-left: 10px;
	}

	.left {
		justify-self: start;
	}

	.right {
		justify-self: end;
	}
</style>
