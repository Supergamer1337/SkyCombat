<script>
	import TurnTracker from './components/TurnTracker.svelte';
	import Button from './components/Button.svelte';
</script>

<div class="card">
	<p class="card-header">Current Round: 1</p>

	<TurnTracker />

	<div class="divider" />

	<Button on:click big label="End Turn" color="var(--other-action-color)" />
</div>

<style>
	.card {
		background-color: var(--secondary-background);
		color: var(--primary-text);
		padding: 2em;

		width: 24em;
		margin: 1em auto;
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
