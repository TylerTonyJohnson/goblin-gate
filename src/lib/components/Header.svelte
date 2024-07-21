<script>
	let button1Text = 'Button 1';
	let button2Text = 'Button 2';
	let button3Text = 'Button 3';

	function handleClick(buttonText) {
		console.log(`Clicked ${buttonText}`);
	}
</script>

<header>
	<h1>My Header</h1>
	<button on:click={() => handleClick(button1Text)}>{button1Text}</button>
	<button on:click={() => handleClick(button2Text)}>{button2Text}</button>
	<button on:click={() => handleClick(button3Text)}>{button3Text}</button>
</header>

<style>
	header {
        width: 100%;
		background-color: #f2f2f2;
		padding: 20px;
		display: flex;
		align-items: center;
		justify-content: space-between;
        grid-area: header;
	}

	h1 {
		margin: 0;
	}

	button {
		margin-left: 10px;
	}
</style>
