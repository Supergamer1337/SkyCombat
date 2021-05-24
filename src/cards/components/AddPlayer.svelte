<script>
	import Button from './Button.svelte';

	export let closeMenu = undefined;
</script>

<form>
	<p class="title">Add New Player</p>
	<input
		placeholder="Character Name"
		class="text-input"
		type="text"
		name="Name"
	/>
	<input
		placeholder="Wounds"
		class="number-input"
		type="number"
		name="WoundThreshold"
	/>

	<div class="button-container">
		<Button label="Add" color="var(--player-color)" />
		<Button
			on:click={closeMenu}
			type="button"
			small
			label="Cancel"
			color="var(--other-action-color)"
		/>
	</div>
</form>

<style>
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
		border: var(--player-color) 0.2em solid;
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

	.button-container {
		margin-top: 1em;
		display: flex;
		justify-content: center;
		gap: 1em;
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
