<script>
    import yellowGem from '$lib/images/Gem Yellow.png';
    import grayGem from '$lib/images/Gem Gray.png';

    let maxEndurance = 10;
    let currentEndurance = 7;

</script>

<div class='frame'>
    {#each Array(maxEndurance) as segment, index}
        <div class='segment'>
            {#if index < currentEndurance}
                <img src={yellowGem} class='gem' alt='gem' />
            {:else}
                <img src={grayGem} class='gem' alt='gem' />
            {/if}
        </div>
    {/each}

</div>

<style>
    .frame {
        /* width: 280px;
        height: 280px; */
        grid-area: endurance;

        /* background-color: yellow; */
    }
</style>