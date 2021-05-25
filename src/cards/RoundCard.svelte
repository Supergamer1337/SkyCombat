<script>
	import TurnTracker from './components/TurnTracker.svelte';
	import Button from './components/Button.svelte';
	import {
		currentTurnNumber,
		currentRound,
		allTurns
	} from '.././stores/TurnStore.js';

	function endTurn() {
		if ($currentTurnNumber >= $allTurns.length) {
			currentTurnNumber.set(1);
			currentRound.update(n => n + 1);
		} else {
			currentTurnNumber.update(n => n + 1);
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
