<script>
    import Play from '../lib/sections/Play.svelte';
    import CreateNew from '../lib/sections/CreateNew.svelte';
    import AdminView from '../lib/sections/AdminView.svelte';
	import { onMount } from 'svelte';


    import ShowLoader from '../lib/stores/ShowLoader.js';

    let username = 'guest';
    let counter = 0;
    let messageOutput = '';

    let mode = 'create';

    let mounted = false;
    // let mounted = true;



    let gameData = {
        username: "",
        question: 'I HAVE NEVER SEEN A THIN PERSON DRINKING A DIET COKE....',
        choice_one_text: 'ch 1',
        choice_two_text: 'ch 2',
        choice_one_image: '/temp/1.jpg',
        correct_choice:1,
        answered: null,
        choice_two_image: '/temp/2.jpg',
        creator_username: 'ajaay',
        is_creator: false,
        postId: null,
        choiceOutcome: {
            0: 0,
            1: 0
        },
    };


    // for posted Message
    // window.addEventListener('message', (ev) => {
    // const { type, data } = ev.data;
    // if (type === 'devvit-message') {
    //     const { message } = data;
    //     if (message.type === 'gameDataUpdated') {
    //     console.log(`Game data updated for user ${message.data.username} on post ${message.data.postId}`);
    //     // Handle the confirmation as needed
    //     }
    // }
    // });

    const handleMessage = (ev) => {
        const { type, data } = ev.data;

        if (type === 'devvit-message') {
            const { message } = data;

            // Always output full message
            // messageOutput = JSON.stringify(message, undefined, 2);

            // Load initial data
            if (message.type === 'initialData') {

                if(mounted) return;

                username = message.data.username;

                if (message.data.isGameData){
                    mode = 'play';
                    gameData = {...message.data}
                } 

                if (message.data.is_creator){
                    mode = 'adminView';
                    gameData = {...message.data}
                }

                mounted = true;

            }

    
        }
    };


    // function increaseCounter() {
    //     window.parent?.postMessage(
    //         { type: 'setCounter', data: { newCounter: Number(counter + 1) } },
    //         '*'
    //     );
    // }

    // function decreaseCounter() {
    //     window.parent?.postMessage(
    //         { type: 'setCounter', data: { newCounter: Number(counter - 1) } },
    //         '*'
    //     );
    // }

 





    // all:[
    //     'create',
    //     'play',
    //     'adminView'
    // ],

    // let gameData = {
    //     username: message.data.username,
    //     question: message.data.question,
    //     choice_one_text: message.data.choice_one_text,
    //     choice_two_text: message.data.choice_two_text,
    //     choice_one_image: message.data.choice_one_image,
    //     choice_two_image: message.data.choice_two_image,
    //     creator_username: message.data.creator_username,
    //     is_creator: message.data.is_creator,
    //     postId: message.data.postId
    // };

    // $: if(username){
    //     mounted = true
    // }




    const interval = setInterval(() => {
        if (!mounted) {
            window.parent.postMessage({
                type: 'initialData'
            }, '*');
        } else {
            clearInterval(interval); // Stop the interval once mounted is true
        }
    }, 500); 
   
</script>

<svelte:window on:message={handleMessage}/>

{#if $ShowLoader}
    <div class="flex text-[2em] orangeText justify-center items-center fixed z-[100] bg-[#00000094] left-0 top-0 w-full h-full ">
        <div class="relative translate-x-[-15%]">loading<span class="loading-dots absolute left-full ml-[0.1em]"></span></div>
    </div>
{/if}

{#if mounted}
    <div class="relative h-screen">
       
        <div class="absolute w-full h-full">
            <img class="w-full h-full object-cover" src="/bg.svg" alt="">
        </div>
        
    
        
        {#if mode == 'create'}
            <CreateNew {username}/>
        {:else if mode == 'play'}
            <Play bind:mode={mode} {gameData}/>
        {:else if mode == 'adminView'}
            <AdminView bind:mode={mode} {username} {gameData}/>
        {/if}
    
    
    
    
    
    </div>
    
    
    
    <!-- <pre class="bg-gray-200 p-0.5em rounded overflow-auto max-h-10em">
        {messageOutput}
    </pre> -->

{:else}
    <div class="text-[2em] absolute left-1/2 -translate-x-1/2 -translate-y-1/2 top-1/2">
        <div class="relative translate-x-[-15%]">loading<span class="loading-dots absolute left-full ml-[0.1em]"></span></div>
    </div>

{/if}

<!-- <div class="container mx-auto p-4 max-w-md">
    <h1 class="text-2em font-bold mb-0.5em text-center">Web View Example</h1>
    
    <div class="bg-gray-100 p-1em rounded-lg shadow-md">
    <h3 class="text-1.5em mb-0.5em">
        Your username is <span class="text-blue-600">{username}</span>
    </h3>
    
    <h3 class="text-1.5em mb-0.5em">
        Current counter is at: <span class="text-green-600">{counter}</span>
    </h3>
    
    <div class="flex justify-center space-x-1em my-1em">
        <button 
        id="btn-increase"
        on:click={increaseCounter}
        class="bg-green-500 text-white px-1em py-0.5em rounded hover:bg-green-600 transition"
        >
        Increase Counter ⬆️
        </button>
        <button 
        id="btn-decrease"
        on:click={decreaseCounter}
        class="bg-red-500 text-white px-1em py-0.5em rounded hover:bg-red-600 transition"
        >
        Decrease Counter ⬇️
        </button>
    </div>
    
    <h3 class="text-1.5em mb-0.5em">Last message from Devvit blocks:</h3>
    <pre class="bg-gray-200 p-0.5em rounded overflow-auto max-h-10em">
        {messageOutput}
    </pre>
    </div>
</div> -->
