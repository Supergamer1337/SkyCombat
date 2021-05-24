<script>
	export let big = false;

	export let label = '';
	export let color = '';
</script>

<button on:click class:big style="background-color: {color}">
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
		transition: width 0.3s ease-in-out;
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
</style>
