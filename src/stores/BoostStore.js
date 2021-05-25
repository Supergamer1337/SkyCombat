import { writable } from 'svelte/store';

export const playerBoosts = writable(0);

export const enemyBoosts = writable(0);

export const nextPlayerBoosts = writable(0);

export const nextEnemyBoosts = writable(0);

export const currentTurnBoosts = writable(0);
