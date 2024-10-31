<script>
	let { children, isScrollable } = $props();
</script>

<div class="frame" class:scrollable={isScrollable}>
	<div class="content-container">
		{@render children()}
	</div>
</div>

<style>
	.frame {
		display: flex;
		flex-direction: row;
		place-items: center;
		max-height: 100%;

		background-color: hsla(96, 53%, 58%, 0.3);
		border: solid hsla(96, 53%, 58%) 2px;
		border-radius: 1.5rem;
		backdrop-filter: blur(0.25rem);

		pointer-events: all;
	}

	.scrollable {
		overflow-y: scroll;
	}

	.content-container {
		display: flex;
		flex-direction: column;
		gap: 1rem;
		padding: 1rem;
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
