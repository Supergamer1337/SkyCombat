<script>
	import BoostIcon from './components/BoostIcon.svelte';

	let playerBoosts = 4;
	let enemyBoosts = 2;
</script>

<div class="card d">
	<p class="title">Available Player Boosts:</p>
	<div class="boost-container">
		{#each Array(playerBoosts) as _}
			<BoostIcon />
		{/each}
	</div>
	<p style="margin-top: 1em;" class="title">Available Enemy Boosts:</p>
	<div class="boost-container">
		{#each Array(enemyBoosts) as _}
			<BoostIcon />
		{/each}
	</div>
</div>

<style>
	.card {
		background-color: var(--secondary-background);
		color: var(--primary-text);
		padding: 2em;
		border-radius: var(--primary-rounding);
	}

	.title {
		font-size: 1.2rem;
		font-weight: 600;
	}

	.boost-container {
		display: flex;
		flex-wrap: wrap;
		gap: 0.5em;
		margin-top: 0.5em;
	}
</style>
