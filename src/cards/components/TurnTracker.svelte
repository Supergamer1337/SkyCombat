<script>
	import TurnCard from './TurnCard.svelte';
	import {
		currentTurn,
		upcomingTurns,
		currentTurnDice
	} from '../../stores/TurnStore.js';
</script>

<p class="section-header">Current Turn</p>

{#if $currentTurn}
	<TurnCard
		player={$currentTurn.type === 'player'}
		enemy={$currentTurn.type === 'enemy'}
		boost={$currentTurnDice.boosts}
		setback={$currentTurnDice.setbacks}
	/>
{/if}

<p class="section-header">Upcoming Turns</p>

{#each $upcomingTurns as turn, id (id)}
	<TurnCard
		player={turn.type === 'player'}
		enemy={turn.type === 'enemy'}
		boost={turn.boosts}
		setback={turn.setbacks}
	/>
{/each}

<TurnCard nextRound />

<style>
	.section-header {
		font-size: 1.2rem;
		font-weight: 600;
		text-align: center;
		margin-top: 1em;
	}
</style>
