<script>
	import RoundCard from './cards/RoundCard.svelte';
	import BoostsCard from './cards/BoostsCard.svelte';
	import AddBoostsCard from './cards/AddBoostsCard.svelte';
	import CombatantsCard from './cards/CombatantsCard.svelte';
	import IssuesOrFeaturesCard from './cards/IssuesOrFeaturesCard.svelte';
</script>

<div class="container">
	<CombatantsCard />
	<AddBoostsCard />
	<RoundCard />
</div>

<IssuesOrFeaturesCard />

<style>
	.container {
		display: grid;
		grid-template-areas:
			'a a b c'
			'a a b c';
		grid-template-rows: auto 1fr;
		grid-template-columns: 1fr 1fr 1fr 1fr;
		grid-gap: 2em;

		margin: 2em;
	}

	@media only screen and (max-width: 1778px) {
		.container {
			grid-template-areas:
				'a b c'
				'a b c';

			grid-template-columns: 1.5fr 25rem 1fr;
		}
	}

	@media only screen and (max-width: 1330px) {
		.container {
			grid-template-areas:
				'b c'
				'b c'
				'a a';

			grid-template-columns: 1fr 1fr;
			grid-template-rows: auto auto auto;
		}
	}

	@media only screen and (max-width: 920px) {
		.container {
			grid-template-areas:
				'c'
				'c'
				'b'
				'b'
				'a';

			grid-template-columns: 1fr;
			grid-template-rows: auto auto auto auto auto auto;
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
</style>
