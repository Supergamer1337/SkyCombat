<script>
	export let big = false;
	export let small = false;

	export let label = '';
	export let color = '';
	export let type = 'button';
	export let activeDisable = false;
</script>

<button
	{type}
	class:activeDisable
	on:click
	class:small
	class:big
	style="background-color: {color}"
>
	{label}
</button>

<style>
	button {
		color: var(--primary-text);
		border: none;
		border-radius: var(--primary-rounding);
		cursor: pointer;
		overflow: hidden;
		position: relative;
		font-size: 1.2rem;
		font-weight: 500;
		width: 8em;
		height: 3em;
	}

	button:before {
		content: ' ';
		position: absolute;
		left: 0;
		top: 0;
		height: 100%;
		width: 0%;
		backdrop-filter: brightness(50%);
		border-radius: 0 25em 25em 0;
		transition: width 250ms ease-out;
	}

	button:hover::before {
		width: 125%;
	}

	.big {
		width: 100%;
		font-size: 1.6rem;
		font-weight: 600;
		padding: 1em;
	}

	.small {
		width: 5.5em;
		height: 3em;
	}

	.activeDisable {
		opacity: 0.6;
		cursor: default;
	}

	.activeDisable:focus {
		outline: none;
	}

	.activeDisable:hover::before {
		width: 0;
	}
</style>
