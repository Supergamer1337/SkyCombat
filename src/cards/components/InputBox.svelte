<script>
	export let closeMenu = undefined;

	/* Animation */
	import { fade, fly } from 'svelte/transition';
</script>

<div
	on:click={closeMenu}
	transition:fade={{ duration: 250 }}
	class="background"
/>
<div transition:fly={{ y: -100, duration: 250 }} class="box">
	<slot />
</div>

<style>
	.background {
		z-index: 2;
		background-color: black;
		opacity: 0.5;
		position: fixed;
		top: 0;
		left: 0;
		width: 100vw;
		height: 100vh;
	}
	.box {
		color: var(--primary-text);
		height: fit-content;
		width: 30em;
		background-color: var(--secondary-background);
		margin: 4em 0;
		padding: 2em;
		border-radius: var(--primary-rounding);
		z-index: 3;
		position: fixed;
		top: 0;
		left: 50%;
		transform: translateX(-50%);
	}
</style>
