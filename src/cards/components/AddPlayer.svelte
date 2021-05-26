<script>
	import Button from './Button.svelte';
	import { players, enemies } from './../../stores/CharacterStore.js';
	import { onMount } from 'svelte';
	import { slide } from 'svelte/transition';

	export let closeMenu = undefined;
	export let enemy = false;
	export let player = false;

	let name = '';
	let woundThreshold = '';
	let success = 0;
	let triumph = 0;
	let advantage = 0;
	let error = '';

	let nameInput = undefined;

	function addPlayer(e) {
		e.preventDefault();

		if (!checkEverythingExists()) {
			error = 'One or more fields are empty!';
			return;
		}

		if (player) {
			players.update(playerArray => [
				...playerArray,
				{
					name,
					woundThreshold,
					wound: 0,
					boost: 0,
					setback: 0,
					initiative: {
						success,
						triumph,
						advantage
					}
				}
			]);
		}
		if (enemy) {
			enemies.update(enemyArray => [
				...enemyArray,
				{
					name,
					woundThreshold,
					wound: 0,
					boost: 0,
					setback: 0,
					initiative: {
						success,
						triumph,
						advantage
					}
				}
			]);
		}
		closeMenu();
	}

	function checkEverythingExists() {
		if (
			!name ||
			!woundThreshold ||
			success === '' ||
			triumph === '' ||
			advantage === ''
		) {
			return false;
		}
		return true;
	}

	onMount(() => {
		nameInput.focus();
	});
</script>

<form on:submit={addPlayer}>
	<p class="title">Add New {player ? 'Player' : 'Enemy'}</p>
	<input
		class:player
		class:enemy
		bind:this={nameInput}
		placeholder="Character Name"
		class="text-input"
		type="text"
		bind:value={name}
	/>
	<input
		class:player
		class:enemy
		placeholder="Wounds"
		class="number-input"
		type="number"
		bind:value={woundThreshold}
	/>

	<div class="initiative">
		<label>
			<input
				class:player
				class:enemy
				class="initiative-input"
				type="number"
				bind:value={success}
			/>
			<p>Success</p>
		</label>
		<label>
			<input
				class:player
				class:enemy
				class="initiative-input"
				type="number"
				bind:value={triumph}
			/>
			<p>Triumph</p>
		</label>
		<label>
			<input
				class:player
				class:enemy
				class="initiative-input"
				type="number"
				bind:value={advantage}
			/>
			<p>Advantage</p>
		</label>
	</div>

	<div class="button-container">
		<Button
			type="submit"
			label="Add"
			color={player ? 'var(--player-color)' : 'var(--enemy-color)'}
		/>
		<Button
			on:click={closeMenu}
			type="button"
			small
			label="Cancel"
			color="var(--other-action-color)"
		/>
	</div>

	{#if error}
		<p transition:slide={{ duration: 350 }} class="error">
			{error}
		</p>
	{/if}
</form>

<style>
	form {
		position: relative;
	}
	.title {
		font-size: 1.4rem;
		font-weight: 600;
		text-align: center;
	}

	input {
		display: block;
		background-color: var(--primary-background);
		color: var(--primary-text);
		padding: 0.5em 1em;
		border-radius: var(--full-rounding);
		margin: 1em auto;
		font-size: 1.2rem;
		text-align: center;
		transition: all 250ms ease-in-out;
	}

	input:focus {
		outline: none;
		border: var(--other-action-color) 0.2em solid;
	}

	.text-input {
		width: 12em;
	}

	.text-input:focus {
		width: 20em;
	}

	.number-input {
		width: 8em;
		text-align: center;
	}

	.number-input:focus {
		width: 10em;
	}

	.initiative {
		display: flex;
		align-items: center;
		justify-content: space-between;
		width: 90%;
		margin: auto;
	}

	.initiative label {
		text-align: center;
		font-size: 1.2rem;
		font-weight: 500;
	}

	.initiative-input {
		width: 6em;
		margin-bottom: 0.4em;
	}

	.button-container {
		margin-top: 1em;
		display: flex;
		justify-content: center;
		gap: 1em;
	}

	.error {
		background-color: var(--error-color);
		text-align: center;
		font-size: 1.2rem;
		font-weight: bold;
		margin-top: 1em;
		padding: 1em;
		width: 100%;
	}

	/* Conditional */
	.player {
		border: var(--player-color) 0.2em solid;
	}

	.enemy {
		border: var(--enemy-color) 0.2em solid;
	}

	/* Remove arrows from number bos */
	/* Chrome, Safari, Edge, Opera */
	input::-webkit-outer-spin-button,
	input::-webkit-inner-spin-button {
		-webkit-appearance: none;
		margin: 0;
	}

	/* Firefox */
	input[type='number'] {
		-moz-appearance: textfield;
	}
</style>
