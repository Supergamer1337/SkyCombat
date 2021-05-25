<script>
	import TurnCard from './TurnCard.svelte';
	import { turns } from '../../stores/TurnStore.js';

	$: console.log($turns);
</script>

<p class="section-header">Current Turn</p>

{#if $turns.length > 0}
	<TurnCard
		player={$turns[0] === 'player'}
		enemy={$turns[0] === 'enemy'}
		boost={1}
		setback={0}
	/>
{/if}

<p class="section-header">Upcoming Turns</p>

{#each $turns as turn}
	<TurnCard
		player={turn === 'player'}
		enemy={turn === 'enemy'}
		boost={1}
		setback={0}
	/>
{/each}

<style>
	.section-header {
		font-size: 1.2rem;
		font-weight: 600;
		text-align: center;
		margin-top: 1em;
	}
</style>
