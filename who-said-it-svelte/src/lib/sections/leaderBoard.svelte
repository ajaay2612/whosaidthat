<script>
    export let selectedChoice 
    export let gameData
    export let isAdminView
    export let username, mode

    let choiceZero = (gameData.choiceOutcome[0]/(gameData.choiceOutcome[0]+gameData.choiceOutcome[1]) *100 || 0).toFixed() 
    let choiceOne = (gameData.choiceOutcome[1]/(gameData.choiceOutcome[0]+gameData.choiceOutcome[1]) *100 || 0).toFixed()
</script>

<div class="z-[10] absolute bg-[#FAFE41] text-[0.6em] px-[1.4em] py-[0.4em] border-[0.2em] border-black top-[1em] left-[1em] font-secondary ">

    {#if isAdminView}
        <h2>Welcome {username}!!</h2>
    {:else}
        <h2>{gameData.correct_choice == selectedChoice ? "yayy!!" : "oops!!"}</h2>
    {/if}

</div>

<button on:click={()=>mode="create"} class=" absolute top-1em right-1em w-[7em] text-[0.78em] pb-[0.4em] grad-button text-white pt-[0.3em] font-secondary">
    create
</button>

<div class="text-[0.8em]">
    
    <div class="text-[0.9em]">
        <div class="absolute w-[3.5em] top-[67%] -translate-y-1/2 left-[88.8%] -translate-x-1/2">
            <img class="w-full h-full" src="/qr.png" alt="">
        </div>
        <div class="absolute w-[3.5em] top-[50.7%] -translate-y-1/2 left-[8.2%] -translate-x-1/2">
            <img class="w-full h-full" src="/ql.png" alt="">
        </div>
    
        <div class="w-[65%] text-[1.05em] absolute top-[50%] -translate-y-1/2 left-1/2 -translate-x-1/2">
    
            <h1 class="text-[6.2em] text-center leading-[1.1em]
            text-[#FF7700] drop-shadow-sm shadow-quaternary">
                {#if isAdminView}
                    your post
                {:else}
                    {gameData.correct_choice == selectedChoice ? "you win!!" : "you lose!!"}
                {/if}
            </h1>
    
    
            <div class="flex justify-between items-center gap-1em mt-[2.1em]">
                <div
                style="border-color:{gameData.correct_choice == 0 ? "#55FF66":"#FF5555" } ;"
                class="relative size-[10em] border-[0.5em] border-secondary">
                    <img class="w-full h-full object-cover" src="{gameData.choice_one_image}" alt="">
                    {#if selectedChoice == 0}
                        <div class="text-[0.75em] absolute rotate-[-18deg] w-[10em] -top-[3em] -left-[5em]">
                            <img src="/bubble.svg" alt="">
                            <p class="font-secondary text-[1.1em] leading-[1em] text-center absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2">{gameData.correct_choice == selectedChoice ? "you were right!!" : "AHAHAH!! WRONG"}</p>
                        </div>
                    {/if}
                </div>
                <div class="text-[1.4em] mt-1hem leading-[1.1em] orangeTextInv text-center">
                    <p>total votes</p>
                    <p class="text-[1.1em] font-secondary">{gameData.choiceOutcome[0] + gameData.choiceOutcome[1]}</p>
                </div>
                <div
                style="border-color:{gameData.correct_choice == 1 ? "#55FF66":"#FF5555" } ;"
                class="relative  size-[10em] border-[0.5em] border-secondary">
                    <img class="w-full h-full object-cover" src="{gameData.choice_two_image}" alt="">
                    {#if selectedChoice == 1}
                        <div class="text-[0.75em] absolute rotate-[-18deg] w-[10em] -top-[3em] -left-[5em]">
                            <img src="/bubble.svg" alt="">
                            <p class="font-secondary text-[1.1em] leading-[1em] text-center absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2">{gameData.correct_choice == selectedChoice ? "you were right!!" : "AHAHAH!! WRONG"}</p>
                        </div>
                    {/if}
                </div>
    
    
            </div>
            <div class="w-full mt-[0.9em] rounded-full h-2em relative bg-secondary flex justify-between items-center">
                <div style="width:{choiceZero}%;" class="absolute h-full bg-quaternary rounded-full">
                </div>
                <p class="relative px-1em text-[1.1em] text-white">{choiceZero}%</p>
                <p class="relative px-1em text-[1.1em] text-white">{choiceOne == 0 ? 0 : 100-choiceZero}%</p>
    
            </div>
            <div class="flex mt-[0.5em] justify-between items-center">
                <p class="orangeTextInv whitespace-nowrap text-[1.5em]">{gameData.choice_one_text}</p>
                <p class="orangeTextInv whitespace-nowrap text-[1.5em]">{gameData.choice_two_text}</p>
            </div>
    
           
    
        </div>
    
    </div>
</div>