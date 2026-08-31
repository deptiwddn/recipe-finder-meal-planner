import { getData } from '$lib/api/client';
import type { AreasApiResponse } from '$lib/models/area';
import type { CategoriesApiResponse } from '$lib/models/category';
import type { MealsApiResponse } from '$lib/models/recipe';

export function searchRecipes(searchTerm: string, signal?: AbortSignal): Promise<MealsApiResponse> {
	return getData(`/search.php?s=${encodeURIComponent(searchTerm)}`, signal);
}

export function getRecipeById(id: string, signal?: AbortSignal): Promise<MealsApiResponse> {
	return getData(`/lookup.php?i=${encodeURIComponent(id)}`, signal);
}

export function getCategories(signal?: AbortSignal): Promise<CategoriesApiResponse> {
	return getData('/categories.php', signal);
}

export function getRecipesByCategory(category: string, signal?: AbortSignal): Promise<MealsApiResponse> {
	return getData(`/filter.php?c=${encodeURIComponent(category)}`, signal);
}

export function getAreas(signal?: AbortSignal): Promise<AreasApiResponse> {
	return getData('/list.php?a=list', signal);
}

export function getRecipesByArea(area: string, signal?: AbortSignal): Promise<MealsApiResponse> {
	return getData(`/filter.php?a=${encodeURIComponent(area)}`, signal);
}
