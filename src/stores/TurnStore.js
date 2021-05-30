import { writable, derived } from 'svelte/store';
import { players, enemies } from './CharacterStore.js';
import {
	nextPlayerBoosts,
	nextEnemyBoosts,
	nextPlayerSetbacks,
	nextEnemySetbacks,
	currentTurnBoosts,
	currentTurnSetbacks,
	currentlyActive
} from './BoostStore';

export const allTurns = derived(
	[players, enemies],
	([$players, $enemies], set) => {
		let turns = [];
		$players.forEach(player =>
			turns.push({
				...player.initiative,
				type: 'player',
				uid: player.uid,
				incapacitated: player.incapacitated
			})
		);
		$enemies.forEach(enemy =>
			turns.push({
				...enemy.initiative,
				type: 'enemy',
				uid: enemy.uid,
				incapacitated: enemy.incapacitated
			})
		);

		turns.sort(sortTurns);
		set(turns);
	}
);

export const currentTurnNumber = writable(1);
export const lastIncapacitated = writable(0); // How many was incapacitated last time

const turnsLeft = derived(
	[allTurns, currentTurnNumber, lastIncapacitated],
	([$allTurns, $currentTurnNumber, $lastIncapacitated], set) => {
		let turnsLeft = [...$allTurns];

		// Remove incapacitated characters.
		turnsLeft = turnsLeft.filter(turn => {
			if (!turn.incapacitated) {
				return turn;
			}
		});

		let allIncapacitated = $allTurns.length - turnsLeft.length;
		let newlyIncapacitated = allIncapacitated - $lastIncapacitated;

		console.log(newlyIncapacitated);

		// Check if turns have been removed due to incapacitation.
		if (newlyIncapacitated > 0 || newlyIncapacitated < 0) {
			currentTurnNumber.set($currentTurnNumber - newlyIncapacitated);
			lastIncapacitated.update(n => n + newlyIncapacitated);
		}

		turnsLeft = turnsLeft.splice($currentTurnNumber - 1); // -1 to as turn number start at 1, and index at 0.

		set(turnsLeft);
	}
);

export const currentTurn = derived(turnsLeft, ($turnsLeft, set) => {
	set($turnsLeft[0]);
});

export const upcomingTurns = derived(
	[
		turnsLeft,
		nextPlayerBoosts,
		nextEnemyBoosts,
		nextPlayerSetbacks,
		nextEnemySetbacks
	],
	(
		[
			$turnsLeft,
			$nextPlayerBoosts,
			$nextEnemyBoosts,
			$nextPlayerSetbacks,
			$nextEnemySetbacks
		],
		set
	) => {
		let upcomingTurns = [...$turnsLeft];
		upcomingTurns.shift();

		// Add boost amount to next player.
		let nextPlayer = upcomingTurns.findIndex(
			item => item.type === 'player'
		);
		if (upcomingTurns[nextPlayer]?.type === 'player') {
			upcomingTurns[nextPlayer] = {
				...upcomingTurns[nextPlayer],
				boosts: $nextPlayerBoosts,
				setbacks: $nextPlayerSetbacks
			};
		}

		// Add boost amount to next enemy
		let nextEnemy = upcomingTurns.findIndex(item => item.type === 'enemy');
		if (upcomingTurns[nextEnemy]?.type === 'enemy') {
			upcomingTurns[nextEnemy] = {
				...upcomingTurns[nextEnemy],
				boosts: $nextEnemyBoosts,
				setbacks: $nextEnemySetbacks
			};
		}

		set(upcomingTurns);
	}
);

export const currentTurnDice = derived(
	[currentTurnBoosts, currentTurnSetbacks, currentlyActive],
	([$currentTurnBoosts, $currentTurnSetbacks, $currentlyActive], set) => {
		let boosts = $currentTurnBoosts + $currentlyActive.boosts;
		let setbacks = $currentTurnSetbacks + $currentlyActive.setbacks;
		set({ boosts, setbacks });
	}
);

export const currentRound = writable(1);

/* Functions */

function sortTurns(b, a) {
	let count =
		a.success - b.success ||
		a.triumph - b.triumph ||
		a.advantage - b.advantage;

	if (count === 0) {
		if (b.type === 'player') {
			return -1;
		}
		return 0;
	}

	return count;
}
