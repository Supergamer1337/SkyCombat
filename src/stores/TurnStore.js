import { writable, derived } from 'svelte/store';
import { players, enemies } from './CharacterStore.js';

export const turns = derived(
	[players, enemies],
	([$players, $enemies], set) => {
		let turns = [];
		$players.forEach(player =>
			turns.push({ ...player.initiative, type: 'player' })
		);
		$enemies.forEach(enemy =>
			turns.push({ ...enemy.initiative, type: 'enemy' })
		);

		console.log(turns);

		turns.sort(sortTurns);
		turns = turns.map(turn => turn.type);

		set(turns);
	}
);

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
