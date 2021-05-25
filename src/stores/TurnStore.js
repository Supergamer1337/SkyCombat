import { writable, derived } from 'svelte/store';
import { players, enemies } from './CharacterStore.js';

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
		turns = turns.map(turn => turn.type);

		set(turns);
	}
);

export const currentTurnNumber = writable(1);

const turnsLeft = derived(
	[allTurns, currentTurnNumber],
	([$allTurns, $currentTurnNumber], set) => {
		let turnsLeft = [...$allTurns];
		turnsLeft = turnsLeft.splice($currentTurnNumber - 1);

		set(turnsLeft);
	}
);

export const currentTurn = derived(turnsLeft, ($turnsLeft, set) => {
	set($turnsLeft[0]);
});

export const upcomingTurns = derived(turnsLeft, ($turnsLeft, set) => {
	let upcomingTurns = [...$turnsLeft];
	upcomingTurns.shift();
	set(upcomingTurns);
});

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
