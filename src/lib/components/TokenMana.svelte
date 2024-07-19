<script>
    import icon from '$lib/images/Mana.png'

</script>

<div class="frame">
	<picture>
		<source srcset={icon} type="image/png">
		<img class='profile' src={icon} alt='mana'>
	</picture>
</div>

<style>
	.frame {
		position: relative;
		width: 80px;
		height: 80px;
		background-color: red;

		border-radius: 50%;
		overflow: hidden;
		box-shadow: 4px 4px 8px #0008, inset 8px 8px 8px #FFF8, inset -8px -8px 8px #0008;

		transition: scale 0.05s linear;
	}

	.frame:hover {
		scale: 1.1;
	}

	.profile {
		width: 100%;
		height: 100%;
	}
</style>
