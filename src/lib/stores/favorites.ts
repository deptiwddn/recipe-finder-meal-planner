import { writable } from 'svelte/store';
import type { RecipeSummary } from '$lib/models/recipe';
import { loadFromStorage, saveToStorage } from '$lib/utils/localStorage';

const savedFavorites = loadFromStorage<RecipeSummary[]>('recipe-favorites') ?? [];
const { subscribe, update, set } = writable<RecipeSummary[]>(savedFavorites);

subscribe((favorites) => saveToStorage('recipe-favorites', favorites));

export const favoritesStore = {
	subscribe,
	addFavorite(recipe: RecipeSummary): void {
		update((favorites) => favorites.some((item) => item.id === recipe.id) ? favorites : [...favorites, recipe]);
	},
	removeFavorite(id: string): void { update((favorites) => favorites.filter((item) => item.id !== id)); },
	toggleFavorite(recipe: RecipeSummary): void {
		update((favorites) => favorites.some((item) => item.id === recipe.id)
			? favorites.filter((item) => item.id !== recipe.id)
			: [...favorites, recipe]);
	},
	isFavorite(id: string): boolean {
		let answer = false;
		const unsubscribe = subscribe((favorites) => { answer = favorites.some((item) => item.id === id); });
		unsubscribe();
		return answer;
	},
	clearFavorites(): void { set([]); }
};
