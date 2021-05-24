<script>
	import Fa from 'svelte-fa';
	import { faPlus } from '@fortawesome/free-solid-svg-icons/faPlus';
</script>

<div class="card">
	<div class="header-container">
		<p class="section-header">Players</p>
		<Fa icon={faPlus} />
	</div>

	<div class="header-container">
		<p class="section-header">Enemies</p>
		<Fa icon={faPlus} />
	</div>
</div>

<style>
	.card {
		background-color: var(--secondary-background);
		color: var(--primary-text);
		width: 50%;
		margin: 1em auto;
		padding: 2em;
		border-radius: var(--primary-rounding);
	}

	.section-header {
		font-size: 1.4rem;
		font-weight: 600;
	}

	.header-container {
		display: flex;
		align-items: center;
	}

	.header-container :global(svg) {
		margin-left: 1em;
		cursor: pointer;
		font-size: 1.2rem;
	}
</style>
