import type { MealArea } from '$lib/models/area';
import type { Category, CategoryApi } from '$lib/models/category';
import type { Ingredient, MealApi, Recipe, RecipeSummary } from '$lib/models/recipe';

export function extractIngredients(meal: MealApi): Ingredient[] {
	const ingredients: Ingredient[] = [];

	for (let number = 1; number <= 20; number += 1) {
		const name = meal[`strIngredient${number}`]?.trim() ?? '';
		const measure = meal[`strMeasure${number}`]?.trim() ?? '';

		if (name) ingredients.push({ name, measure });
	}

	return ingredients;
}

export function mapMealToRecipe(meal: MealApi): Recipe {
	return {
		id: meal.idMeal,
		title: meal.strMeal,
		image: meal.strMealThumb,
		category: meal.strCategory ?? '',
		area: meal.strArea ?? '',
		instructions: meal.strInstructions ?? '',
		ingredients: extractIngredients(meal),
		tags: meal.strTags ? meal.strTags.split(',').map((tag) => tag.trim()).filter(Boolean) : [],
		youtubeUrl: meal.strYoutube ?? '',
		isCustom: false,
		createdAt: '',
		updatedAt: ''
	};
}

export function mapMealToRecipeSummary(meal: MealApi): RecipeSummary {
	return {
		id: meal.idMeal,
		title: meal.strMeal,
		image: meal.strMealThumb,
		category: meal.strCategory ?? '',
		area: meal.strArea ?? ''
	};
}

export function mapCategory(category: CategoryApi): Category {
	return {
		name: category.strCategory,
		image: category.strCategoryThumb,
		description: category.strCategoryDescription
	};
}

export function mapArea(name: string): MealArea {
	return { name };
}
