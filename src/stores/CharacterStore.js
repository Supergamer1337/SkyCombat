import { writable } from 'svelte/store';

export const players = writable([]);

export const enemies = writable([]);

export const uid = writable(0);
