import { writable, derived } from 'svelte/store';
import { players, enemies } from './CharacterStore.js';
import {
	nextPlayerBoosts,
	nextEnemyBoosts,
	nextPlayerSetbacks,
	nextEnemySetbacks
} from './BoostStore';

export const allTurns = derived(
	[players, enemies],
	([$players, $enemies], set) => {
		let turns = [];
		$players.forEach(player =>
			turns.push({ ...player.initiative, type: 'player' })
		);
		$enemies.forEach(enemy =>
			turns.push({ ...enemy.initiative, type: 'enemy' })
		);

		turns.sort(sortTurns);
		turns = turns.map(turn => {
			return { type: turn.type, boosts: 0, setbacks: 0 };
		});

		set(turns);
	}
);

export const currentTurnNumber = writable(1);

const turnsLeft = derived(
	[allTurns, currentTurnNumber],
	([$allTurns, $currentTurnNumber], set) => {
		let turnsLeft = [...$allTurns];
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
