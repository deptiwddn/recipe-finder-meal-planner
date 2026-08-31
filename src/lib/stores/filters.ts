import { writable } from 'svelte/store';
import type { MealArea } from '$lib/models/area';
import type { Category } from '$lib/models/category';
import { findAreas, findCategories } from '$lib/services/recipeService';

type FilterState = {
	categories: Category[];
	areas: MealArea[];
	selectedCategory: string;
	selectedArea: string;
	loading: boolean;
	error: string;
};

const { subscribe, update } = writable<FilterState>({ categories: [], areas: [], selectedCategory: '', selectedArea: '', loading: false, error: '' });

export const filterStore = {
	subscribe,
	async loadCategories(): Promise<void> {
		try {
			const categories = await findCategories();
			update((state) => ({ ...state, categories }));
		}
		catch { update((state) => ({ ...state, error: 'Could not load categories.' })); }
	},
	async loadAreas(): Promise<void> {
		try {
			const areas = await findAreas();
			update((state) => ({ ...state, areas }));
		}
		catch { update((state) => ({ ...state, error: 'Could not load areas.' })); }
	},
	setCategory(category: string): void { update((state) => ({ ...state, selectedCategory: category })); },
	setArea(area: string): void { update((state) => ({ ...state, selectedArea: area })); },
	clearFilters(): void { update((state) => ({ ...state, selectedCategory: '', selectedArea: '' })); }
};
