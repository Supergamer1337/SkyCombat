<script>
	import { faPlus } from '@fortawesome/free-solid-svg-icons/faPlus';
	import { faMinus } from '@fortawesome/free-solid-svg-icons/faMinus';
	import Fa from 'svelte-fa';
	import Button from './Button.svelte';
	import BoostIcon from './BoostIcon.svelte';
	import SetbackIcon from './SetbackIcon.svelte';

	export let name = '';
	export let woundThreshold = 10;
	export let wounds = 0;
	export let boostDice = 0;
	export let setbackDice = 0;

	export let player = false;
	export let enemy = false;
</script>

<div class:player class:enemy class="card">
	<div style="margin-top: 0;" class="row-container">
		<p class="main-text">{name}</p>
		<div class="wounds-container">
			<div class="icon-container">
				<Fa icon={faMinus} />
				<Fa icon={faPlus} />
			</div>
			<p class="main-text">{wounds}/{woundThreshold}</p>
		</div>
	</div>

	<div class="row-container">
		<Button small color="var(--other-action-color)" label="Ativate" />
		<Button small color="var(--setback-color)" label="+Setback" />
		<Button small color="var(--boost-color)" label="+Boost" />
	</div>

	<div class="row-container">
		<p class="secondary-text">Current Dice:</p>
		<div class="dice-container">
			{#if !boostDice && !setbackDice}
				<p>None</p>
			{/if}
			{#if boostDice > 0}
				<div style="display: flex; align-items: center;">
					{boostDice}x<BoostIcon />
				</div>
			{/if}

			{#if setbackDice > 0}
				<div style="display: flex; align-items: center;">
					{setbackDice}x<SetbackIcon />
				</div>
			{/if}
		</div>
	</div>
</div>

<style>
	.card {
		width: 23em;
		padding: 1em;
		border-radius: var(--primary-rounding);
	}

	.row-container {
		display: flex;
		align-items: center;
		justify-content: space-between;
		margin-top: 1em;
	}

	.wounds-container {
		display: flex;
	}

	.wounds-container div {
		margin-right: 0.5em;
		font-size: 1.2rem;
	}

	.wounds-container div :global(svg) {
		cursor: pointer;
	}

	.dice-container {
		display: flex;
		gap: 0.5em;
	}

	.main-text {
		font-size: 1.2rem;
		font-weight: 600;
	}

	.secondary-text {
		font-size: 1.2rem;
	}

	/* Conditional Rendering */
	.player {
		background-color: var(--player-color);
	}

	.enemy {
		background-color: var(--enemy-color);
	}
</style>
