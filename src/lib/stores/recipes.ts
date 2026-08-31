import { writable } from 'svelte/store';
import type { RecipeSummary } from '$lib/models/recipe';
import { findRecipes } from '$lib/services/recipeService';

type RecipesState = { recipes: RecipeSummary[]; loading: boolean; error: string };
const { subscribe, set } = writable<RecipesState>({ recipes: [], loading: false, error: '' });

export const recipesStore = {
	subscribe,
	async searchRecipes(searchTerm: string, category: string, area: string, signal?: AbortSignal): Promise<void> {
		set({ recipes: [], loading: true, error: '' });
		try {
			const recipes = await findRecipes(searchTerm, category, area, signal);
			set({ recipes, loading: false, error: '' });
		} catch (error) {
			if (error instanceof DOMException && error.name === 'AbortError') return;
			set({ recipes: [], loading: false, error: 'Could not load recipes. Please try again.' });
		}
	},
	resetStore(): void { set({ recipes: [], loading: false, error: '' }); }
};
