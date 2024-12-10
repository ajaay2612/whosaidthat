<script>
    import Home from './Home.svelte';
    import Create from './Create.svelte';

    export let username = '';
    let newCreateStep = 0; 
</script>

<div class="z-[10] absolute bg-[#FAFE41] text-[0.6em] px-[1.4em] py-[0.4em] border-[0.2em] border-black top-[1em] left-[1em] font-secondary ">
    <h2>Welcome {username}!!</h2>
</div>

{#if newCreateStep == 0}
    <Home bind:step={newCreateStep}/>
{:else if newCreateStep == 1}
    <Create bind:newCreateStep={newCreateStep}/>
{/if}