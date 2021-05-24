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

		turns.sort(sortTurns);
		turns = turns.map(turn => turn.type);

		set(turns);
	}
);

function sortTurns(a, b) {
	return a.success - b.success ||
		a.triumph - b.triumph ||
		a.advantage - b.advantage ||
		a.type === 'player'
		? -1
		: 1;
}
