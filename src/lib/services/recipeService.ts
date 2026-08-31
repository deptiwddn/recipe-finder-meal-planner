import * as recipeApi from '$lib/api/recipes';
import type { MealArea } from '$lib/models/area';
import type { Category } from '$lib/models/category';
import type { Recipe, RecipeSummary } from '$lib/models/recipe';
import { mapArea, mapCategory, mapMealToRecipe, mapMealToRecipeSummary } from '$lib/utils/mapper';

export async function findRecipes(
	searchTerm: string,
	category: string,
	area: string,
	signal?: AbortSignal
): Promise<RecipeSummary[]> {
	let meals;

	if (searchTerm) {
		meals = (await recipeApi.searchRecipes(searchTerm, signal)).meals;
	} else if (category && area) {
		const categoryMeals = (await recipeApi.getRecipesByCategory(category, signal)).meals ?? [];
		const recipeRequests = categoryMeals.map((meal) => recipeApi.getRecipeById(meal.idMeal, signal));
		const recipeResponses = await Promise.all(recipeRequests);
		const recipes = recipeResponses
			.flatMap((response) => response.meals ?? [])
			.map(mapMealToRecipeSummary);

		return recipes.filter((recipe) => recipe.area === area);
	} else if (category) {
		meals = (await recipeApi.getRecipesByCategory(category, signal)).meals;
	} else if (area) {
		meals = (await recipeApi.getRecipesByArea(area, signal)).meals;
	} else {
		return [];
	}

	const recipes = (meals ?? []).map(mapMealToRecipeSummary).map((recipe) => ({
		...recipe,
		category: recipe.category || category,
		area: recipe.area || area
	}));
	return recipes.filter((recipe) => {
		const categoryMatches = !category || recipe.category === category;
		const areaMatches = !area || recipe.area === area;
		return categoryMatches && areaMatches;
	});
}

export async function findRecipeById(id: string, signal?: AbortSignal): Promise<Recipe | null> {
	const meals = (await recipeApi.getRecipeById(id, signal)).meals;
	return meals?.[0] ? mapMealToRecipe(meals[0]) : null;
}

export async function findCategories(signal?: AbortSignal): Promise<Category[]> {
	const categories = await recipeApi.getCategories(signal);
	return categories.categories.map(mapCategory);
}

export async function findAreas(signal?: AbortSignal): Promise<MealArea[]> {
	const areas = await recipeApi.getAreas(signal);
	return (areas.meals ?? []).map((area) => mapArea(area.strArea));
}
