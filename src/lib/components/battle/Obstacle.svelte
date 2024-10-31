<script>
	let { obstacleData } = $props();
</script>

<div class="frame">
	<div
		class="background"
		style={`
    		background-image: url(${obstacleData.type.source});
		`}
	></div>
</div>

<style>
	.frame {
		position: relative;
		width: 100%;
		height: 100%;
		/* z-index: inherit; */
	}

	.background {
		position: absolute;
		width: 100%;
		height: 100%;
		left: 0;
		bottom: 0;
		background-size: cover;
		background-position: top;
		/* z-index: inherit; */
	}
</style>
