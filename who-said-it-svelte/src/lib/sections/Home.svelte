<script>
    export let step = 0;

    let showLeaderBord = false

    let showHowToPlay = false

    let loading = true

    let leaderboardData = [ ]


    let userRank = { }

    function getLeaderboard() {
        window.parent.postMessage({
            type: 'getLeaderboard'
        }, '*');
    }

    function openLeaderBoard() {
        getLeaderboard()
        showLeaderBord = true
    }

    function closeLeaderBoard() {
        showLeaderBord = false
    }

    const handleMessage = (ev) => {
        const { type, data } = ev.data;

        if (type === 'devvit-message') {
            const { message } = data;

            if (message.type === 'getLeaderboard') {
                leaderboardData = message.data.leaderboard
                userRank = message.data.currentUser

                loading = false
            }
            
        }
    };




</script>
<svelte:window on:message={handleMessage}/>

{#if showHowToPlay}
    <!-- svelte-ignore a11y_click_events_have_key_events -->
    <!-- svelte-ignore a11y_no_static_element_interactions -->
    <div on:click|self={()=> showHowToPlay = false} class="fixed w-full flex justify-center items-center h-full z-10 left-0 top-0 ">
        <div class="relative popup flex justify-center items-center w-[90%] text-[0.75em] h-[90%] border-[0.5em] border-black text-[#FF7700] bg-[#FFFFFF]">
            
            <div on:click={()=> showHowToPlay = false} class="bg-[#FF7700] rounded-full p-[0.6em] absolute top-1em right-1em cursor-pointer w-[2em]">
                <svg viewBox="0 0 101 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M8 8L93 93" stroke="white" stroke-width="10"/>
                    <path d="M8.00002 93L93 8" stroke="white" stroke-width="10"/>
                </svg>
            </div>
            
            <div class="text-[1.8em] text-center leading-[1.2em]">
                <p>Read the quote, pick who said it from the two options.</p>
                <p>Guess right, score points!</p>
            </div>

            
        </div>
    </div>
{/if}


<!-- svelte-ignore a11y_no_static_element_interactions -->
{#if showLeaderBord}
    <!-- svelte-ignore a11y_click_events_have_key_events -->
    <div on:click|self={closeLeaderBoard} class="fixed w-full flex justify-center items-center h-full z-10 left-0 top-0 ">
        <div class="w-[90%] popup text-[0.75em] h-[90%] border-[0.5em] border-black text-[#161616] bg-[#ff7700]">
                
            <div class="text-[1.38em] font-primary flex flex-col h-full justify-between">
                <div class="">
                    <div class="flex justify-between items-center px-[1.4em]">
                        <h1 class="text-center text-[1.2em] my-[0.5em]">Leaderboard</h1>
                        <div on:click={closeLeaderBoard} class="cursor-pointer w-[1em]">
                            <svg viewBox="0 0 101 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M8 8L93 93" stroke="black" stroke-width="22"/>
                                <path d="M8.00002 93L93 8" stroke="black" stroke-width="22"/>
                            </svg>
                        </div>
                    </div>

                

                    {#if leaderboardData && leaderboardData.length > 0}
                        <div class="flex border-t-[0.38em] border-black justify-between px-[1.5em] py-[0.3em]">
                            <h2>Rank</h2>
                            <h2>Username</h2>
                            <h2>Score</h2>
                        </div>
                        {#each leaderboardData as item}
                            <div class:activeRank={item.rank == userRank.rank} class="text-[0.9em] flex justify-between px-[1.5em] py-[0.4em] border-t-[0.1em] border-black">
                                <p class="w-[2.1em] text-center">{item.rank}</p>
                                <p>{item.username}</p>
                                <p class="w-[2.1em] text-center">{item.score}</p>
                            </div>
                        {/each}
                    {:else}
                        <div class="flex border-t-[0.38em] border-black justify-between px-[1.5em] py-[0.5em]">
                            <h2 class="text-center w-full">
                                
                               
                                {#if loading}
                                    Loading...
                                {:else}
                                    No data
                                {/if}
                            
                            </h2>
                        </div>
                    {/if}
                </div>


                {#if userRank && userRank.rank > 5}
                    <div class="activeRank">
                        <div class="text-[0.9em] flex justify-between px-[1.5em] py-[0.4em] border-t-[0.2em] border-black">
                            <p class="w-[2.1em] text-center">{userRank.rank}</p>
                            <p>{userRank.username}</p>
                            <p class="w-[2.1em] text-center">{userRank.score}</p>
                        </div>
                    </div>
                {/if}
            </div>

            
        </div>
    </div>
{/if}

<div class="text-[0.9em]">
    <div class="absolute w-[3.5em] top-[67%] -translate-y-1/2 left-[84.8%] -translate-x-1/2">
        <img class="w-full h-full" src="/qr.png" alt="">
    </div>
    <div class="absolute w-[3.5em] top-[58.7%] -translate-y-1/2 left-[14.2%] -translate-x-1/2">
        <img class="w-full h-full" src="/ql.png" alt="">
    </div>

    <div class="w-[15em] text-[1.05em] absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2">
        <div class="relative w-[9.8em] mx-auto">
            <img class="w-full h-full" src="/bubble.svg" alt="">
            <h1 class="text-[3.3em] top-1/2 -translate-x-1/2 left-1/2 -translate-y-1/2
            orangeText whitespace-nowrap absolute drop-shadow-sm shadow-quaternary">WHO SAID THAT </h1>
        </div>


        <div class="space-y-[0.5em] mt-[1.7em]">
            <button on:click={()=> step = 1} class="text-[1.4em] pb-[0.5em] grad-button text-white pt-[0.4em] w-full font-secondary">
                create
            </button>
            <button on:click={openLeaderBoard} class="defButton">
                leaderboard
            </button>
            <button on:click={()=> showHowToPlay = true } class="defButton">
                how to play
            </button>
        </div>


    </div>

</div>