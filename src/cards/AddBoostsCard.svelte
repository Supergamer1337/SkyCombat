<script>
	import Button from './components/Button.svelte';
	import {
		playerBoosts,
		enemyBoosts,
		nextPlayerBoosts,
		nextEnemyBoosts,
		nextPlayerSetbacks,
		nextEnemySetbacks,
		playerSetbacks,
		enemySetbacks
	} from '../stores/BoostStore.js';
	import { currentTurn } from './../stores/TurnStore';
	import BoostIcon from './components/BoostIcon.svelte';
	import SetbackIcon from './components/SetbackIcon.svelte';

	function addToBoostStore() {
		if ($currentTurn.type === 'player') {
			playerBoosts.update(n => n + 1);
		}
		if ($currentTurn.type === 'enemy') {
			enemyBoosts.update(n => n + 1);
		}
	}

	function removeFromBoostStore() {
		if ($currentTurn.type === 'player') {
			playerBoosts.update(n => removeDice(n));
		}
		if ($currentTurn.type === 'enemy') {
			enemyBoosts.update(n => removeDice(n));
		}
	}

	function addToSetbackStore() {
		if ($currentTurn.type === 'player') {
			playerSetbacks.update(n => n + 1);
		}
		if ($currentTurn.type === 'enemy') {
			enemySetbacks.update(n => n + 1);
		}
	}

	function removeFromSetbackStore() {
		if ($currentTurn.type === 'player') {
			playerSetbacks.update(n => removeDice(n));
		}
		if ($currentTurn.type === 'enemy') {
			enemySetbacks.update(n => removeDice(n));
		}
	}

	function addNextBoost() {
		if ($currentTurn.type === 'player') {
			nextPlayerBoosts.update(n => n + 1);
		}
		if ($currentTurn.type === 'enemy') {
			nextEnemyBoosts.update(n => n + 1);
		}
	}

	function removeNextBoost() {
		if ($currentTurn.type === 'player') {
			nextPlayerBoosts.update(n => removeDice(n));
		}
		if ($currentTurn.type === 'enemy') {
			nextEnemyBoosts.update(n => removeDice(n));
		}
		return;
	}

	function addNextSetback() {
		if ($currentTurn.type === 'player') {
			nextPlayerSetbacks.update(n => n + 1);
		}
		if ($currentTurn.type === 'enemy') {
			nextEnemySetbacks.update(n => n + 1);
		}
	}

	function removeNextSetback() {
		if ($currentTurn.type === 'player') {
			nextPlayerSetbacks.update(n => removeDice(n));
		}
		if ($currentTurn.type === 'enemy') {
			nextEnemySetbacks.update(n => removeDice(n));
		}
		return;
	}

	function removeDice(currentDiceAmount) {
		if (currentDiceAmount <= 0) {
			return 0;
		} else {
			return currentDiceAmount - 1;
		}
	}
</script>

<div class="card b">
	<p class="title">Boosts & Setbacks</p>

	<div class="section">
		<p class="title">Adding New</p>
		<div class="subsection">
			<p class="title">Next Turn</p>
			<div class="horizontal">
				<div class="labeled-button-group-container">
					<div class="button-container">
						<Button
							on:click={addNextBoost}
							color="var(--boost-color)"
							label="+"
							icon
						/>
						<Button
							on:click={removeNextBoost}
							color="var(--boost-color)"
							label="-"
							icon
						/>
					</div>
					<p class="labeled-button-group-label">Boosts</p>
				</div>

				<div class="labeled-button-group-container">
					<div class="button-container">
						<Button
							on:click={addNextSetback}
							color="var(--setback-color)"
							label="+"
							icon
						/>
						<Button
							on:click={removeNextSetback}
							color="var(--setback-color)"
							label="-"
							icon
						/>
					</div>
					<p class="labeled-button-group-label">Setback</p>
				</div>
			</div>
		</div>

		<div class="subsection">
			<p class="title">Anyone's turn</p>
			<div class="horizontal">
				<div class="labeled-button-group-container">
					<div class="button-container">
						<Button
							on:click={addToBoostStore}
							color="var(--boost-color)"
							label="+"
							icon
						/>
						<Button
							on:click={removeFromBoostStore}
							color="var(--boost-color)"
							label="-"
							icon
						/>
					</div>
					<p class="labeled-button-group-label">Boosts</p>
				</div>

				<div class="labeled-button-group-container">
					<div class="button-container">
						<Button
							on:click={addToSetbackStore}
							color="var(--setback-color)"
							label="+"
							icon
						/>
						<Button
							on:click={removeFromSetbackStore}
							color="var(--setback-color)"
							label="-"
							icon
						/>
					</div>
					<p class="labeled-button-group-label">Setback</p>
				</div>
			</div>
		</div>
	</div>

	<div class="section">
		<p class="title">Existing Dice</p>
		<div class="existing-dice-row">
			<p>Player Dice:</p>
			<p class="dice-print">
				{$playerBoosts}x<BoostIcon />
			</p>
			<p class="dice-print">
				{$playerSetbacks}x<SetbackIcon />
			</p>
		</div>

		<div class="existing-dice-row">
			<p>Enemy Dice:</p>
			<p class="dice-print">
				{$enemyBoosts}x<BoostIcon />
			</p>
			<p class="dice-print">
				{$enemySetbacks}x<SetbackIcon />
			</p>
		</div>
	</div>
</div>

<style>
	.card {
		background-color: var(--secondary-background);
		color: var(--primary-text);
		padding: 2rem;
		border-radius: var(--primary-rounding);
	}

	.title {
		font-size: 2rem;
		font-weight: 600;
	}

	.button-container {
		display: flex;
		flex-wrap: wrap;
		justify-content: left;
		margin-top: 0.5rem;
		gap: 0.5rem;
	}

	.labeled-button-group-container {
		width: fit-content;
	}

	.labeled-button-group-label {
		text-align: center;
		font-size: 1.1rem;
		margin-top: 0.5rem;
	}

	.section {
		margin-top: 1rem;
	}

	.section .title {
		font-size: 1.6rem;
	}

	.subsection {
		margin-top: 0.5rem;
	}

	.subsection .title {
		font-weight: normal;
		font-size: 1.4rem;
	}

	.horizontal {
		display: flex;
		flex-direction: row;
		flex-wrap: wrap;
		gap: 1rem;
	}

	.existing-dice-row {
		display: flex;
		flex-direction: row;
		flex-wrap: wrap;
		gap: 0.5rem;
		align-items: center;
		font-size: 1.4rem;
		margin-top: 0.5rem;
	}

	.dice-print {
		display: flex;
		flex-direction: row;
		flex-wrap: wrap;
		align-items: center;
	}
</style>
