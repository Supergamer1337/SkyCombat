<script>
	import Button from './components/Button.svelte';
	import { playerBoosts, enemyBoosts } from '../stores/BoostStore.js';

	function addToBoostStore() {
		playerBoosts.update(n => n + 1);
	}

	function removeFromBoostStore() {
		playerBoosts.update(n => {
			if (n <= 0) {
				return n - 1;
			}
			return n;
		});
	}
</script>

<div class="card b">
	<p class="title">Next Ally/Enemy</p>

	<div class="button-container">
		<Button color="var(--boost-color)" label="+Boost" />
		<Button color="var(--setback-color)" label="+Setback" />
	</div>

	<p class="title" style="margin-top: 1em;">Anyone's Turn</p>
	<div class="button-container">
		<Button
			on:click={addToBoostStore}
			color="var(--boost-color)"
			label="+Boost"
		/>
	</div>
</div>

<style>
	.card {
		background-color: var(--secondary-background);
		color: var(--primary-text);
		padding: 2em;
		border-radius: var(--primary-rounding);
	}

	.title {
		font-size: 1.2rem;
		font-weight: 600;
	}

	.button-container {
		display: flex;
		flex-wrap: wrap;
		justify-content: space-between;
		margin-top: 0.5em;
	}
</style>
