<script>
	import SpellBook from './SpellBook.svelte';
	import WeaponBelt from './WeaponBelt.svelte';
	import ManaBar from './ManaBar.svelte';
	import ChargeBar from './ChargeBar.svelte';

	import panelTexture from '$lib/images/Plastic Texture.jpg';
</script>

<div class="frame" style={`background-image: url(${panelTexture});`}>
	<div class="charge bar-container">
		<ChargeBar></ChargeBar>
	</div>
	<div class="mana bar-container">
		<ManaBar></ManaBar>
	</div>
	<div class="weapon-container">
		<WeaponBelt></WeaponBelt>
	</div>
	<div class="spell-container">
		<SpellBook></SpellBook>
	</div>
</div>

<style>
	.frame {
		position: relative;
		display: grid;
		grid-template-columns: 1fr 1fr;
		grid-template-rows: 1rem auto;
		grid-template-areas:
			'charge 	mana'
			'weapons 	spells';
		grid-area: bench;
		gap: 1rem;
		background-color: #00f8;
		border-radius: 2rem;
		padding: 1rem;
		overflow: visible;
		background-size: cover;
		/* background-color: red; */
		background-blend-mode: multiply;
		background-color: rgba(255, 157, 0, 0.83); /* Green tint */
		box-shadow:
			inset #fff8 2px 2px 5px,
			inset #0008 -2px -2px 5px,
			black 0 0 10px;
	}

	.bar-container {
		position: absolute;
		top: -300%;
		width: 100%;
		border-radius: 2.5rem;
	}

	.charge {
		grid-area: charge;
	}

	.mana {
		grid-area: mana;
	}

	.weapon-container {
		grid-area: weapons;
		box-shadow: inset black 0 0 10px;
		padding: 0.5rem;
		border-radius: 2.5rem;
		background-color: #0005;
	}

	.spell-container {
		grid-area: spells;
		box-shadow: inset black 0 0 10px;
		padding: 0.5rem;
		border-radius: 2.5rem;
		background-color: #0005;
	}
</style>
