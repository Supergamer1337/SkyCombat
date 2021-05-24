<script>
	import RoundCard from './cards/RoundCard.svelte';
	import BoostsCard from './cards/BoostsCard.svelte';
	import AddBoostsCard from './cards/AddBoostsCard.svelte';
	import CombatantsCard from './cards/CombatantsCard.svelte';
</script>

<div class="container">
	<CombatantsCard />
	<AddBoostsCard />
	<BoostsCard />
	<RoundCard />
</div>

<style>
	.container {
		display: grid;
		grid-template-areas:
			'a a b c'
			'a a d c';
		grid-template-rows: 1fr 1fr;
		grid-template-columns: 1fr 1fr 1fr 1fr;
		grid-gap: 2em;

		margin: 2em;
	}

	@media only screen and (max-width: 1778px) {
		.container {
			grid-template-areas:
				'a b c'
				'a d c';

			grid-template-columns: 1fr 1fr 1fr;
		}
	}

	/* Template areas */
	.container :global(.a) {
		grid-area: a;
	}
	.container :global(.b) {
		grid-area: b;
	}
	.container :global(.c) {
		grid-area: c;
	}
	.container :global(.d) {
		grid-area: d;
	}
</style>
