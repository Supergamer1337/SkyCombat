<script>
	import TurnTracker from './components/TurnTracker.svelte';
	import Button from './components/Button.svelte';
	import {
		currentTurnNumber,
		currentRound,
		allTurns,
		currentTurn
	} from '../stores/TurnStore.js';
	import {
		nextPlayerBoosts,
		nextEnemyBoosts,
		nextPlayerSetbacks,
		nextEnemySetbacks,
		currentTurnBoosts,
		currentTurnSetbacks
	} from '../stores/BoostStore.js';

	function endTurn() {
		// Increase turn number, and change round on final.
		if ($currentTurnNumber >= $allTurns.length) {
			currentTurnNumber.set(1);
			currentRound.update(n => n + 1);
		} else {
			currentTurnNumber.update(n => n + 1);
		}

		// Change boosts to correct value.
		if ($currentTurn.type === 'player') {
			currentTurnBoosts.set($nextPlayerBoosts);
			currentTurnSetbacks.set($nextPlayerSetbacks);
			nextPlayerBoosts.set(0);
			nextPlayerSetbacks.set(0);
		}
		if ($currentTurn.type === 'enemy') {
			currentTurnBoosts.set($nextEnemyBoosts);
			currentTurnSetbacks.set($nextEnemySetbacks);
			nextEnemyBoosts.set(0);
			nextEnemySetbacks.set(0);
		}
	}
</script>

<div class="card c">
	<p class="card-header">Current Round: {$currentRound}</p>

	<TurnTracker />

	<div class="divider" />

	<Button
		on:click={endTurn}
		big
		label="End Turn"
		color="var(--other-action-color)"
	/>
</div>

<style>
	.card {
		background-color: var(--secondary-background);
		color: var(--primary-text);
		padding: 2em;
		border-radius: var(--primary-rounding);
	}

	.card-header {
		font-size: 1.6rem;
		font-weight: 600;
	}

	.divider {
		background-color: var(--primary-text);
		width: calc(100% + 4em);
		transform: translateX(-2em);
		height: 0.1em;
		margin: 2em 0;
	}
</style>
