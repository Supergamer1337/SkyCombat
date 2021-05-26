<script>
	import { faPlus } from '@fortawesome/free-solid-svg-icons/faPlus';
	import { faMinus } from '@fortawesome/free-solid-svg-icons/faMinus';
	import Fa from 'svelte-fa';
	import Button from './Button.svelte';
	import BoostIcon from './BoostIcon.svelte';
	import SetbackIcon from './SetbackIcon.svelte';
	import { players, enemies } from '../../stores/CharacterStore.js';
	import {
		currentTurn,
		allTurns,
		currentTurnNumber,
		currentRound
	} from '../../stores/TurnStore.js';
	import { currentlyActive } from '../../stores/BoostStore.js';

	export let id = undefined;
	export let name = '';
	export let woundThreshold = 10;
	export let wounds = 0;
	export let boostDice = 0;
	export let setbackDice = 0;

	export let player = false;
	export let enemy = false;

	let activeDisable = false;

	$: disableActive($currentTurn);

	function addBoost(e) {
		if (e.ctrlKey) {
			if (player) {
				players.update(playerArray => {
					let newPlayerArray = playerArray;
					newPlayerArray[id].boost -= 1;
					return [...newPlayerArray];
				});
			}
			if (enemy) {
				enemies.update(enemyArray => {
					let newEnemyArray = enemyArray;
					newEnemyArray[id].boost -= 1;
					return [...newEnemyArray];
				});
			}
			return;
		}

		if (player) {
			players.update(playerArray => {
				let newPlayerArray = playerArray;
				newPlayerArray[id].boost += 1;
				return [...newPlayerArray];
			});
		}
		if (enemy) {
			enemies.update(enemyArray => {
				let newEnemyArray = enemyArray;
				newEnemyArray[id].boost += 1;
				return [...newEnemyArray];
			});
		}
	}

	function addSetback(e) {
		if (e.ctrlKey) {
			if (player) {
				players.update(playerArray => {
					let newPlayerArray = playerArray;
					newPlayerArray[id].setback -= 1;
					return [...newPlayerArray];
				});
			}
			if (enemy) {
				enemies.update(enemyArray => {
					let newEnemyArray = enemyArray;
					newEnemyArray[id].setback -= 1;
					return [...newEnemyArray];
				});
			}
			return;
		}

		if (player) {
			players.update(playerArray => {
				let newPlayerArray = playerArray;
				newPlayerArray[id].setback += 1;
				return [...newPlayerArray];
			});
		}
		if (enemy) {
			enemies.update(enemyArray => {
				let newEnemyArray = enemyArray;
				newEnemyArray[id].setback += 1;
				return [...newEnemyArray];
			});
		}
	}

	function increaseWounds() {
		if (player) {
			players.update(playerArray => {
				let newPlayerArray = playerArray;
				newPlayerArray[id].wound += 1;
				return [...newPlayerArray];
			});
		}
		if (enemy) {
			enemies.update(enemyArray => {
				let newEnemyArray = enemyArray;
				newEnemyArray[id].wound += 1;
				return [...newEnemyArray];
			});
		}
	}

	function decreaseWounds() {
		if (player) {
			players.update(playerArray => {
				let newPlayerArray = playerArray;
				newPlayerArray[id].wound -= 1;
				if (newPlayerArray[id].wound < 0) {
					newPlayerArray.splice(id, 1);
					if ($currentTurnNumber === $allTurns.length) {
						currentTurnNumber.set(1);
						currentRound.update(n => n + 1);
					}
				}
				return [...newPlayerArray];
			});
		}
		if (enemy) {
			enemies.update(enemyArray => {
				let newEnemyArray = enemyArray;
				newEnemyArray[id].wound -= 1;
				if (newEnemyArray[id].wound < 0) {
					newEnemyArray.splice(id, 1);
					if ($currentTurnNumber === $allTurns.length) {
						currentTurnNumber.set(1);
						currentRound.update(n => n + 1);
					}
				}
				return [...newEnemyArray];
			});
		}
	}

	function disableActive(currentTurn) {
		if (currentTurn.type === 'player' && enemy) {
			activeDisable = true;
		}
		if (currentTurn.type === 'player' && player) {
			activeDisable = false;
		}
		if (currentTurn.type === 'enemy' && player) {
			activeDisable = true;
		}
		if (currentTurn.type === 'enemy' && enemy) {
			activeDisable = false;
		}
	}

	function makeActive() {
		if (
			(player && $currentTurn.type === 'player') ||
			(enemy && $currentTurn.type === 'enemy')
		) {
			if ($currentlyActive.id === id) {
				currentlyActive.set({ boosts: 0, setbacks: 0, id: undefined });
				return;
			}
			currentlyActive.set({
				boosts: boostDice,
				setbacks: setbackDice,
				id: id
			});
		}
	}
</script>

<div class:player class:enemy class="card">
	<div style="margin-top: 0;" class="row-container">
		<p class="main-text">{name}</p>
		<div class="wounds-container">
			<div class="icon-container">
				<div on:click={decreaseWounds}>
					<Fa icon={faMinus} />
				</div>
				<div on:click={increaseWounds}>
					<Fa icon={faPlus} />
				</div>
			</div>
			<p class="main-text">{wounds}/{woundThreshold}</p>
		</div>
	</div>

	<div class="row-container">
		<Button
			on:click={makeActive}
			{activeDisable}
			small
			color="var(--other-action-color)"
			label={((player && $currentTurn.type === 'player') ||
				(enemy && $currentTurn.type === 'enemy')) &&
			$currentlyActive.id === id
				? 'Active'
				: 'Activate'}
		/>
		<Button
			on:click={addSetback}
			small
			color="var(--setback-color)"
			label="+Setback"
		/>
		<Button
			on:click={addBoost}
			small
			color="var(--boost-color)"
			label="+Boost"
		/>
	</div>

	<div class="row-container">
		<p class="secondary-text">Current Dice:</p>
		<div class="dice-container">
			{#if !boostDice && !setbackDice}
				<p>None</p>
			{/if}
			{#if boostDice > 0}
				<div style="display: flex; align-items: center;">
					{boostDice}x<BoostIcon />
				</div>
			{/if}

			{#if setbackDice > 0}
				<div style="display: flex; align-items: center;">
					{setbackDice}x<SetbackIcon />
				</div>
			{/if}
		</div>
	</div>
</div>

<style>
	.card {
		width: 23em;
		padding: 1em;
		border-radius: var(--primary-rounding);
		user-select: none;
	}

	.row-container {
		display: flex;
		align-items: center;
		justify-content: space-between;
		margin-top: 1em;
	}

	.wounds-container {
		display: flex;
	}

	.icon-container {
		display: flex;
		gap: 0.3em;
		margin-right: 0.5em;
		font-size: 1.2rem;
	}

	.wounds-container div :global(svg) {
		cursor: pointer;
	}

	.dice-container {
		display: flex;
		gap: 0.5em;
	}

	.main-text {
		font-size: 1.2rem;
		font-weight: 600;
	}

	.secondary-text {
		font-size: 1.2rem;
	}

	/* Conditional Rendering */
	.player {
		background-color: var(--player-color);
	}

	.enemy {
		background-color: var(--enemy-color);
	}
</style>
