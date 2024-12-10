<script>
	import { onMount } from "svelte";
    import ShowLoader from '../stores/ShowLoader';

    export let newCreateStep 

    function sendGameData(question, choice_one_text, choice_two_text, choice_one_image, choice_two_image, correct_choice) {
        window.parent?.postMessage(
            {
                type: 'setGameData',
                data: {
                    question: question,
                    choice_one_text: choice_one_text,
                    choice_two_text: choice_two_text,
                    choice_one_image: choice_one_image,
                    choice_two_image: choice_two_image,
                    correct_choice: correct_choice
                }
            },
            '*'
        );
    }

    function addImage() {
        console.log('Adding image...');
        window.parent.postMessage({
            type: 'addImage'
        }, '*');
    }
     
    let currentChoice = 0


    const handleMessage = (ev) => {
        const { type, data } = ev.data;

        if (type === 'devvit-message') {
            const { message } = data;

            if (message.type === 'imageUploaded') {
                $ShowLoader = true

                console.log('Image uploaded:', message.data.imageUrl);
                const checkImageUrl = async () => {
                    try {
                        const response = await fetch(message.data.imageUrl);
                        if (response.status === 404) {
                            setTimeout(checkImageUrl, 500);
                        } else {

                            if (currentChoice == 0) {
                                choiceOneImageInput = message.data.imageUrl
                            }else if(currentChoice == 1) {
                                choiceTwoImageInput = message.data.imageUrl
                            }

                            $ShowLoader = false

                        }
                    } catch (error) {
                        console.error('Error checking image URL:', error);
                        setTimeout(checkImageUrl, 500);
                    }
                };

                checkImageUrl();
            }
            
        }
    };


    async function handleSendButton() {
        console.log('Sending game data...');
        $ShowLoader = true

        try {
     
            sendGameData(
                questionInput,
                choiceOneTextInput,
                choiceTwoTextInput,
                choiceOneImageInput,
                choiceTwoImageInput,
                correctChoiceInput
            );

        } catch (error) {
            console.error('Error uploading images:', error);
        } 
    }

    let questionInput = '';
    let choiceOneTextInput = '';
    let choiceTwoTextInput = '';
    let choiceOneImageInput = "/placeholder.jpeg";
    let choiceTwoImageInput = "/placeholder.jpeg";
    let correctChoiceInput = null;


    let step = 0






</script>

<svelte:window on:message={handleMessage}/>



<div class="relative h-screen flex flex-col justify-center items-center">

    {#if step == 0}
        <div class="w-[50%]">
            <label for="questionInput" class="text-center block text-[2em] orangeTextInv">Enter Quote:</label>
            <input placeholder="Quote" type="text" id="" bind:value={questionInput}
                class="block text-[1.2em] w-full py-[0.3em] border-[0.25em] border-[#ff7700] focus-within:outline-none outline-none rounded-full px-[1em]  " />
        </div>

        <!-- svelte-ignore a11y_consider_explicit_label -->
        <button on:click={()=> newCreateStep = 0} class="hover:selectionShadow absolute rounded-full left-2em top-1/2 -translate-y-1/2 bg-[#ff7700] w-3em  flex justify-center items-center aspect-square">
            <div class="w-[2em] mr-[0.2em] -rotate-180">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960" fill="#e8eaed"><path d="M521.33-480.67 328-674l47.33-47.33L616-480.67 375.33-240 328-287.33l193.33-193.34Z"/></svg>
            </div>
        </button>

        {#if questionInput.trim() != "" }
            <!-- svelte-ignore a11y_consider_explicit_label -->
            <button on:click={()=> step += 1} class="hover:selectionShadow absolute rounded-full right-2em top-1/2 -translate-y-1/2 bg-[#ff7700]  w-3em flex justify-center items-center aspect-square">
                <div class="w-[2em] ml-[0.2em]">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960" fill="#e8eaed"><path d="M521.33-480.67 328-674l47.33-47.33L616-480.67 375.33-240 328-287.33l193.33-193.34Z"/></svg>
                </div>
            </button>
        {/if}
    

    {:else if step == 1}
        <div class="w-[50%]">

            <p class="block text-[2.36em] text-center orangeTextInv">enter person no: 1</p>
            <div class="flex justify-center items-center gap-1em">
                <img class="border-[0.25em] border-[#e0e0e0]  block w-[45%] object-cover aspect-square my-[0.8em] bg-[#ff77008f] rounded-[1em]" src={choiceOneImageInput} alt="">
                <div class="text-[0.7em] w-[55%] mr-[0.5em]">
                    <button on:click={()=> { currentChoice = 0, addImage()}} class="defButton">
                        add image
                    </button>
                </div>
            </div>
            <input placeholder="name" type="text" id="" bind:value={choiceOneTextInput} 
            class="block text-[1.2em] w-full py-[0.3em] border-[0.25em] border-[#ff7700] focus-within:outline-none outline-none rounded-full px-[1em]  " />
        </div>


         <!-- svelte-ignore a11y_consider_explicit_label -->
         <button on:click={()=> step -= 1} class="hover:selectionShadow absolute rounded-full left-2em top-1/2 -translate-y-1/2 bg-[#ff7700] w-3em  flex justify-center items-center aspect-square">
            <div class="w-[2em] mr-[0.2em] -rotate-180">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960" fill="#e8eaed"><path d="M521.33-480.67 328-674l47.33-47.33L616-480.67 375.33-240 328-287.33l193.33-193.34Z"/></svg>
            </div>
        </button>
        {#if choiceOneTextInput.trim() != 0 && choiceOneImageInput != "/placeholder.jpeg" && choiceOneImageInput != ""}
            <!-- svelte-ignore a11y_consider_explicit_label -->
            <button on:click={()=> step += 1} class="hover:selectionShadow absolute rounded-full right-2em top-1/2 -translate-y-1/2 bg-[#ff7700]  w-3em flex justify-center items-center aspect-square">
                <div class="w-[2em] ml-[0.2em]">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960" fill="#e8eaed"><path d="M521.33-480.67 328-674l47.33-47.33L616-480.67 375.33-240 328-287.33l193.33-193.34Z"/></svg>
                </div>
            </button>
        {/if}
    {:else if step == 2}
        <div class="w-[50%]">

            <p class="block text-[2.36em] text-center orangeTextInv">enter person no: 2</p>
                <div class="flex justify-center items-center gap-1em">
                    <img class="border-[0.25em] border-[#e0e0e0]  block w-[45%] object-cover aspect-square my-[0.8em] bg-[#ff77008f] rounded-[1em]" src={choiceTwoImageInput} alt="">
                    <div class="text-[0.7em] w-[55%] mr-[0.5em]">
                        <button on:click={()=> { currentChoice = 1, addImage()}} class="defButton">
                            add image
                        </button>
                    </div>
                </div>
            <input placeholder="name" type="text" id="" bind:value={choiceTwoTextInput} 
            class="block text-[1.2em] w-full py-[0.3em] border-[0.25em] border-[#ff7700] focus-within:outline-none outline-none rounded-full px-[1em]  " />
        </div>


         <!-- svelte-ignore a11y_consider_explicit_label -->
         <button on:click={()=> step -= 1} class="hover:selectionShadow absolute rounded-full left-2em top-1/2 -translate-y-1/2 bg-[#ff7700] w-3em  flex justify-center items-center aspect-square">
            <div class="w-[2em] mr-[0.2em] -rotate-180">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960" fill="#e8eaed"><path d="M521.33-480.67 328-674l47.33-47.33L616-480.67 375.33-240 328-287.33l193.33-193.34Z"/></svg>
            </div>
        </button>
        {#if choiceTwoTextInput.trim() != 0 && choiceTwoImageInput != "/placeholder.jpeg" && choiceTwoImageInput != ""}
            <!-- svelte-ignore a11y_consider_explicit_label -->
            <button on:click={()=> step += 1} class="hover:selectionShadow absolute rounded-full right-2em top-1/2 -translate-y-1/2 bg-[#ff7700]  w-3em flex justify-center items-center aspect-square">
                <div class="w-[2em] ml-[0.2em]">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960" fill="#e8eaed"><path d="M521.33-480.67 328-674l47.33-47.33L616-480.67 375.33-240 328-287.33l193.33-193.34Z"/></svg>
                </div>
            </button>
        {/if}
    {:else if step == 3}
        <div class="w-[70%]">
            <p class="block text-[2.5em] text-center orangeTextInv">choose the right option</p>
            
            <div class="w-[75%] mx-auto mt-[0em] flex gap-2em justify-center items-center">
                <button class:activeChoice={correctChoiceInput == 0} on:click={()=> correctChoiceInput = 0} class="cursor-pointer active:bg-[#ff7700] hover:bg-[#ff7700b5] p-[0.5em] w-1/2 rounded-[1em] hover:selectionShadow flex flex-col justify-center items-center gap-[0.2em]">
                    <img class="border-[0.25em] border-[#e0e0e0]  block w-full object-cover aspect-square  bg-[#ff77008f] rounded-[1em]" src={choiceOneImageInput} alt="">
                    <p class="text-[1em] h-[2.5em] mt-[0.3em] flex justify-center items-center text-center leading-[1.1em] font-secondary">{choiceOneTextInput}</p>
                </button>
                <button class:activeChoice={correctChoiceInput == 1} on:click={()=> correctChoiceInput = 1} class="cursor-pointer active:bg-[#ff7700] hover:bg-[#ff7700b5] p-[0.5em] w-1/2 rounded-[1em] hover:selectionShadow flex flex-col justify-center items-center gap-[0.2em]">
                    <img class="border-[0.25em] border-[#e0e0e0]  block w-full object-cover aspect-square  bg-[#ff77008f] rounded-[1em]" src={choiceTwoImageInput} alt="">
                    <p class="text-[1em] h-[2.5em] mt-[0.3em] flex justify-center items-center text-center leading-[1.1em] font-secondary">{choiceTwoTextInput}</p>
                </button>
            </div>
        
            {#if correctChoiceInput != null}
                <div class="text-center mt-[1em]">
                    <button on:click={handleSendButton} class="text-[1.2em] pb-[0.2em] grad-button text-white pt-[0.1em] w-[7em] font-secondary">
                        create post
                    </button>
                </div>
            {/if}

        </div>

        <!-- svelte-ignore a11y_consider_explicit_label -->
        <button on:click={()=> step -= 1} class="hover:selectionShadow absolute rounded-full left-2em top-1/2 -translate-y-1/2 bg-[#ff7700] w-3em  flex justify-center items-center aspect-square">
            <div class="w-[2em] mr-[0.2em] -rotate-180">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960" fill="#e8eaed"><path d="M521.33-480.67 328-674l47.33-47.33L616-480.67 375.33-240 328-287.33l193.33-193.34Z"/></svg>
            </div>
        </button>

    {/if}
    

    
</div>



<!-- <div class="w-[80%] mx-auto text-[0.8em] pt-3em relative space-y-2">
    <label for="questionInput" class="block text-[1.2e</div>m] ">Question:</label>
    <input type="text" id="questionInput" bind:value={questionInput} class="block w-full p-2 border border-gray-300 rounded-md" />

    <label for="choiceOneTextInput" class="block text-[1.2em] ">Choice One Text:</label>
    <input type="text" id="choiceOneTextInput" bind:value={choiceOneTextInput} class="block w-full p-2 border border-gray-300 rounded-md" />

    <label for="choiceTwoTextInput" class="block text-[1.2em] ">Choice Two Text:</label>
    <input type="text" id="choiceTwoTextInput" bind:value={choiceTwoTextInput} class="block w-full p-2 border border-gray-300 rounded-md" />

    <label for="choiceOneImageInput" class="block text-[1.2em] ">Choice One Image:</label>
    <input type="file" id="choiceOneImageInput" accept=".jpg, .jpeg, .png" bind:this={choiceOneImageInput} class="block w-full p-2 border border-gray-300 rounded-md" />

    <button on:click={addImage}> addimage</button>

    <img width="100px" src="{imageUrl}" alt="">
    <pre>{imageUrl}</pre>

    <label for="choiceTwoImageInput" class="block text-[1.2em] ">Choice Two Image:</label>
    <input type="file" id="choiceTwoImageInput" accept=".jpg, .jpeg, .png" bind:this={choiceTwoImageInput} class="block w-full p-2 border border-gray-300 rounded-md" />

    <label for="correctChoiceInput" class="block text-[1.2em] ">Correct Choice:</label>
    <input type="text" id="correctChoiceInput" bind:value={correctChoiceInput} class="block w-full p-2 border border-gray-300 rounded-md" />

    <button on:click={handleSendButton} class="mt-4 w-full py-2 bg-blue-500 text-white font-medium rounded-md hover:bg-blue-600">Send</button>
</div> -->
