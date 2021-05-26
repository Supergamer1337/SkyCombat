import { writable, derived } from 'svelte/store';
export const playerBoosts = writable(0);

export const enemyBoosts = writable(0);

export const nextPlayerBoosts = writable(0);

export const nextEnemyBoosts = writable(0);

export const nextPlayerSetbacks = writable(0);

export const nextEnemySetbacks = writable(0);

export const currentTurnSetbacks = writable(0);

export const currentTurnBoosts = writable(0);

export const currentlyActive = writable({ boosts: 0, setbacks: 0 });
