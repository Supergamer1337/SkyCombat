<script>
	export let big = false;
	export let small = false;

	export let label = '';
	export let color = '';
</script>

<button on:click class:small class:big style="background-color: {color}">
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
		transition: width 0.25s ease-in;
	}

	button:hover::before {
		width: 120%;
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
</style>
