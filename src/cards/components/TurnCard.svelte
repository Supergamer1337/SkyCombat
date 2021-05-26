<script>
	import BoostIcon from './BoostIcon.svelte';
	import SetbackIcon from './SetbackIcon.svelte';

	export let player = false;
	export let enemy = false;
	export let setback = 0;
	export let boost = 0;

	export let nextRound = false;
</script>

{#if nextRound}
	<div class="card next-round"><p>Next Round</p></div>
{:else}
	<div class:player class:enemy class="card">
		<p class="name">{player ? 'Player' : 'Enemy'}</p>
		<div class="extra-dice">
			{#if boost}
				<p class="dice-container">{boost}x<BoostIcon /></p>
			{/if}

			{#if setback}
				<p class="dice-container">{setback}x<SetbackIcon /></p>
			{/if}
		</div>
	</div>
{/if}

<style>
	.card {
		padding: 0 0.5em;
		height: 4rem;
		border-radius: var(--primary-rounding);
		margin-top: 0.5em;
		display: flex;
		justify-content: space-between;
		align-items: center;
		user-select: none;
	}

	.name {
		font-size: 1.2rem;
		font-weight: 500;
	}

	.extra-dice {
		display: flex;
	}

	.dice-container {
		margin-left: 0.5em;
		display: flex;
		align-items: center;
	}

	/* Conditional Classes */
	.player {
		background-color: var(--player-color);
	}

	.enemy {
		background-color: var(--enemy-color);
	}

	.next-round {
		background-color: var(--primary-text);
		color: #000;
		font-weight: 600;
		font-size: 1.2rem;
		justify-content: center;
	}
</style>
