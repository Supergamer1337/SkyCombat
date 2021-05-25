<script>
	import TurnCard from './TurnCard.svelte';
	import { currentTurn, upcomingTurns } from '../../stores/TurnStore.js';
</script>

<p class="section-header">Current Turn</p>

{#if $currentTurn}
	<TurnCard
		player={$currentTurn === 'player'}
		enemy={$currentTurn === 'enemy'}
		boost={1}
		setback={0}
	/>
{/if}

<p class="section-header">Upcoming Turns</p>

{#each $upcomingTurns as turn}
	<TurnCard
		player={turn === 'player'}
		enemy={turn === 'enemy'}
		boost={1}
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
