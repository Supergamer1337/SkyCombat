<script>
	import Fa from 'svelte-fa';
	import { faPlus } from '@fortawesome/free-solid-svg-icons/faPlus';
	import CharacterCard from './components/CharacterCard.svelte';
	import InputBox from './components/InputBox.svelte';
	import AddPlayer from './components/AddPlayer.svelte';
	import { players } from '../stores/CharacterStore.js';

	let menuOpen = false;

	function openMenu() {
		menuOpen = !menuOpen;
	}
</script>

<div class="card a">
	<div class="header-container">
		<p class="section-header">Players</p>
		<div on:click={openMenu}>
			<Fa on:click={openMenu} icon={faPlus} />
		</div>
	</div>

	<div class="char-container">
		{#each $players as player, id}
			<CharacterCard
				player
				name={player.name}
				woundThreshold={player.woundThreshold}
				wounds={player.wound}
				boostDice={player.boost}
				setbackDice={player.setback}
			/>
		{/each}
	</div>

	<div class="header-container" style="margin-top: 2em;">
		<p class="section-header">Enemies</p>
		<Fa icon={faPlus} />
	</div>

	<div class="char-container">
		<CharacterCard
			enemy
			name="Bandit Group 1"
			woundThreshold={9}
			wounds={0}
			boostDice={0}
			setbackDice={1}
		/>

		<CharacterCard
			enemy
			name="Bandit Group 2"
			woundThreshold={9}
			wounds={3}
			boostDice={2}
			setbackDice={0}
		/>
	</div>
</div>

{#if menuOpen}
	<InputBox closeMenu={openMenu}>
		<AddPlayer closeMenu={openMenu} />
	</InputBox>
{/if}

<style>
	.card {
		background-color: var(--secondary-background);
		color: var(--primary-text);
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

	.char-container {
		margin-top: 1em;
		display: flex;
		flex-wrap: wrap;
		gap: 2em;
	}
</style>
