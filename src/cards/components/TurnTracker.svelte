<script>
	import TurnCard from './TurnCard.svelte';
</script>

<p class="section-header">Current Turn</p>
<TurnCard player boost={1} setback={0} />

<p class="section-header">Upcoming Turns</p>
<TurnCard enemy boost={0} setback={2} />
<TurnCard player boost={2} setback={1} />
<TurnCard nextRound />

<style>
	.section-header {
		font-size: 1.2rem;
		font-weight: 600;
		text-align: center;
		margin-top: 1em;
	}
</style>
