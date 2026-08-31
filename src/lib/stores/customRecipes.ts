import { writable } from 'svelte/store';
import type { CustomRecipeInput, Recipe } from '$lib/models/recipe';
import { loadFromStorage, saveToStorage } from '$lib/utils/localStorage';

const STORAGE_KEY = 'recipe-finder:custom-recipes';
const savedRecipesValue = loadFromStorage<Recipe[]>(STORAGE_KEY);
const savedRecipes = Array.isArray(savedRecipesValue)
	? savedRecipesValue.filter(isStoredCustomRecipe)
	: [];
const { subscribe, update } = writable<Recipe[]>(savedRecipes);

subscribe((recipes) => saveToStorage(STORAGE_KEY, recipes));

function makeId(): string {
	return `${Date.now()}-${Math.random().toString(16).slice(2)}`;
}

function isStoredCustomRecipe(value: unknown): value is Recipe {
	if (!value || typeof value !== 'object') return false;

	const recipe = value as Partial<Recipe>;
	return typeof recipe.id === 'string'
		&& typeof recipe.title === 'string'
		&& typeof recipe.category === 'string'
		&& typeof recipe.area === 'string'
		&& typeof recipe.image === 'string'
		&& typeof recipe.instructions === 'string'
		&& Array.isArray(recipe.ingredients)
		&& Array.isArray(recipe.tags)
		&& typeof recipe.youtubeUrl === 'string'
		&& recipe.isCustom === true
		&& typeof recipe.createdAt === 'string'
		&& typeof recipe.updatedAt === 'string';
}

export const customRecipesStore = {
	subscribe,
	addRecipe(recipe: CustomRecipeInput): Recipe {
		const now = new Date().toISOString();
		let id = makeId();
		const existingIds = new Set(this.getAllRecipes().map((item) => item.id));
		while (existingIds.has(id)) id = makeId();

		const newRecipe: Recipe = { ...recipe, id, isCustom: true, createdAt: now, updatedAt: now };
		update((recipes) => [...recipes, newRecipe]);
		return newRecipe;
	},
	updateRecipe(id: string, changes: Partial<CustomRecipeInput>): Recipe | undefined {
		let updatedRecipe: Recipe | undefined;
		update((recipes) => recipes.map((recipe) => {
			if (recipe.id !== id || !recipe.isCustom) return recipe;
			updatedRecipe = { ...recipe, ...changes, id: recipe.id, isCustom: true, createdAt: recipe.createdAt, updatedAt: new Date().toISOString() };
			return updatedRecipe;
		}));
		return updatedRecipe;
	},
	deleteRecipe(id: string): boolean {
		const recipe = this.getRecipeById(id);
		if (!recipe?.isCustom) return false;
		update((recipes) => recipes.filter((item) => item.id !== id));
		return true;
	},
	getRecipeById(id: string): Recipe | undefined {
		let found: Recipe | undefined;
		const unsubscribe = subscribe((recipes) => { found = recipes.find((recipe) => recipe.id === id); });
		unsubscribe();
		return found;
	},
	getAllRecipes(): Recipe[] {
		let all: Recipe[] = [];
		const unsubscribe = subscribe((recipes) => { all = recipes; });
		unsubscribe();
		return all;
	}
};
