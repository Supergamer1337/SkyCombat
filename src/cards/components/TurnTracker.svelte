<script>
	import TurnCard from './TurnCard.svelte';
	import { currentTurn, upcomingTurns } from '../../stores/TurnStore.js';
</script>

<p class="section-header">Current Turn</p>

{#if $currentTurn}
	<TurnCard
		player={$currentTurn.type === 'player'}
		enemy={$currentTurn.type === 'enemy'}
		boost={1}
		setback={0}
	/>
{/if}

<p class="section-header">Upcoming Turns</p>

{#each $upcomingTurns as turn}
	<TurnCard
		player={turn.type === 'player'}
		enemy={turn.type === 'enemy'}
		boost={turn.boosts}
		setback={0}
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
