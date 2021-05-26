<script>
	import TurnCard from './TurnCard.svelte';
	import {
		currentTurn,
		upcomingTurns,
		currentTurnDice
	} from '../../stores/TurnStore.js';
</script>

<p class="section-header">Current Turn</p>
<div class="current-turn">
	{#if $currentTurn}
		<TurnCard
			player={$currentTurn.type === 'player'}
			enemy={$currentTurn.type === 'enemy'}
			boost={$currentTurnDice.boosts}
			setback={$currentTurnDice.setbacks}
		/>
	{/if}
</div>

<p class="section-header">Upcoming Turns</p>
<div class="upcoming-turns-list">
	{#each $upcomingTurns as turn, id (id)}
		<TurnCard
			player={turn.type === 'player'}
			enemy={turn.type === 'enemy'}
			boost={turn.boosts}
			setback={turn.setbacks}
		/>
	{/each}
	<TurnCard nextRound />
</div>

<style>
	.section-header {
		font-size: 1.2rem;
		font-weight: 600;
		text-align: center;
		margin-top: 1em;
	}

	.upcoming-turns-list {
		height: 16rem;
		overflow-y: auto;
	}

	.current-turn {
		height: 4rem;
		margin-top: 0.5em;
	}
</style>
