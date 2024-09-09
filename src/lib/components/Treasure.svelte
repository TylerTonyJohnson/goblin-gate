<script>
	let { treasureData } = $props();

</script>

<div
	class="frame"
	style={`
    	background-image: url(${treasureData.type.source});
	`}
></div>

<style>
	.frame {
		position: relative;
		width: 100%;
		height: 100%;
		background-color: red;
		background-size: cover;
	}
</style>
