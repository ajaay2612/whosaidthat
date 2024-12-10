<script>
	import { on } from 'svelte/events';
    import Guess from './Guess.svelte'
    import Leaderboard from './Leaderboard.svelte'
	import { onMount } from 'svelte';

    import ShowLoader from '../stores/ShowLoader';
 

    export let gameData , mode
    let selectedChoice = null
    let guessStep = 0;

    onMount(() => {
        if(gameData.answered !== null){
            guessStep = 1
            selectedChoice = gameData.answered
        }
    });


    // function handleSubmission(event) {
    //     // submit the selected choice and get the data 
    //     guessStep = 1
    // }

    function handleSubmission() {
        $ShowLoader = true
        window.parent.postMessage({
            type: 'submitChoice',
            data: { selectedChoice }
        }, '*');

        gameData = {
            ...gameData,
            choiceOutcome: {
                ...gameData.choiceOutcome,
                [selectedChoice]: gameData.choiceOutcome[selectedChoice] + 1
            }
        }


        setTimeout(() => {
            guessStep = 1
            $ShowLoader = false
        }, 890);
    }


</script>


{#if guessStep == 0}

    <div class="z-[10] absolute bg-[#FAFE41] text-[0.6em] px-[1.4em] py-[0.4em] border-[0.2em] border-black top-[1em] left-[1em] font-secondary ">
        <h2>good luck!!</h2>
    </div>

    <div class="text-[0.8em]">
        <Guess {gameData} on:click={handleSubmission} bind:selectedChoice={selectedChoice}/>
    </div>

{:else if guessStep == 1}

    <Leaderboard
    bind:mode={mode}
    bind:selectedChoice={selectedChoice}
    bind:gameData={gameData}

    />
{/if}

