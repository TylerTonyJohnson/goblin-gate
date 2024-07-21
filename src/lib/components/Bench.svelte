<script>
	import { TokenTypes } from '../enums';
	import Token from './Token.svelte';

	const hearts = 4;
	const mana = 4;
</script>

<div class="frame">
	<div class="bench-contents">
		<div class="attack-container">
            <!-- <Token type={TokenTypes.Attack}/> -->
        </div>
		<div class="spells-container">
            <!-- <Token type={TokenTypes.Scroll}/> -->
        </div>
		<div class="hearts-container">
			<!-- {#each Array(hearts) as heartToken}
				<Token type={TokenTypes.Heart}/>
			{/each} -->
		</div>
		<div class="mana-container">
			<!-- {#each Array(mana) as manaToken}
				<Token type={TokenTypes.Mana}/>
			{/each} -->
		</div>
	</div>
</div>

<style>
	.frame {
		grid-area: bench;
		background-color: #00f8;
		border-radius: 2rem;
	}

	.bench-contents {
		display: grid;
		grid-template-columns: repeat(2, auto);
		grid-template-rows: repeat(2, auto);
        grid-template-areas: 
            "attack hearts"
            "spells mana";
		gap: 1rem;
		padding: 1rem;
		place-items: start;
		/* border-radius: 1rem; */
	}

    .attack-container {
        grid-area: attack;
    }

    .spells-container {
        grid-area: spells;
    }

    .hearts-container {
        grid-area: hearts;
        display: flex;
        gap: 0.25rem;
    }

    .mana-container {
        grid-area: mana;
        display: flex;
        gap: 0.25rem;
    }
</style>
