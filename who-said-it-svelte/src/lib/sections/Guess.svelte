<script>
    export let selectedChoice = null
    export let gameData
</script>

<div class="text-[0.9em]">
    <div class="absolute w-[3.5em] top-[67%] -translate-y-1/2 left-[88.8%] -translate-x-1/2">
        <img class="w-full h-full" src="/qr.png" alt="">
    </div>
    <div class="absolute w-[3.5em] top-[50.7%] -translate-y-1/2 left-[8.2%] -translate-x-1/2">
        <img class="w-full h-full" src="/ql.png" alt="">
    </div>

    <div class="w-[70%] text-[1.05em] absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2">
            
        <h1 class="text-[2.3em] text-center leading-[1.1em] 
        text-[#FF7700] drop-shadow-sm shadow-quaternary">
           " {gameData.question} "
        </h1>


        <div class="flex justify-center items-center gap-1em mt-[1.2em] pb-5em">
            <div class="relative size-[12em] border-[0.5em] border-secondary">
                <img class="w-full h-full object-cover" src="{gameData.choice_one_image}" alt="">           
                <div class=" absolute left-1/2 -translate-x-1/2 bottom-[-5.3em] ">
                    <p class="orangeTextInv top-[-1.85em] absolute left-1/2 -translate-x-1/2 whitespace-nowrap text-[1.5em]">{gameData.choice_one_text}</p>
                    <div on:click class="">
                        <button on:click={()=> selectedChoice = 0} class="selectButton">
                            select
                        </button>
                    </div>
                </div>
            </div>
            <div class="text-[2.8em] w-[1.2em]">
                <p class="orangeText">or</p>
            </div>
            <div class="relative size-[12em] border-[0.5em] border-secondary">
                <img class="w-full h-full object-cover" src="{gameData.choice_two_image}" alt="">
                <div class=" absolute left-1/2 -translate-x-1/2 bottom-[-5.3em] ">
                    <p class="orangeTextInv top-[-1.85em] absolute left-1/2 -translate-x-1/2 whitespace-nowrap text-[1.5em]">{gameData.choice_two_text}</p>
                    <div on:click class="">
                        <button  on:click={()=> selectedChoice = 1} class="selectButton">
                            select
                        </button>
                    </div>
                </div>
            </div>
        </div>

    </div>

</div>