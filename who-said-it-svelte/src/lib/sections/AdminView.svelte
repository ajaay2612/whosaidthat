<script>
    import Leaderboard from './Leaderboard.svelte'
    export let gameData 
    export let username , mode
    let selectedChoice = null

    let isAdminView = true


</script>

<Leaderboard
    {isAdminView}
    {username}
    bind:mode={mode}
    bind:selectedChoice={selectedChoice}
    {gameData}
/>

