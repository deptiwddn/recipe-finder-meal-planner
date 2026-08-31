import { writable } from 'svelte/store';

const { subscribe, set } = writable('');

export const searchStore = {
	subscribe,
	setSearchTerm(value: string): void { set(value); },
	clearSearch(): void { set(''); }
};
