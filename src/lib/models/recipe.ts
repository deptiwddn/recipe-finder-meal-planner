export type Ingredient = {
	name: string;
	measure: string;
};

export type Recipe = {
	id: string;
	title: string;
	image: string;
	category: string;
	area: string;
	instructions: string;
	ingredients: Ingredient[];
	tags: string[];
	youtubeUrl: string;
	isCustom: boolean;
	createdAt: string;
	updatedAt: string;
};

export type RecipeSummary = {
	id: string;
	title: string;
	image: string;
	category: string;
	area: string;
};

export type RecipeDetails = Recipe;

export type MealApi = {
	idMeal: string;
	strMeal: string;
	strMealThumb: string;
	strCategory: string | null;
	strArea: string | null;
	strInstructions: string | null;
	strTags: string | null;
	strYoutube: string | null;
	[key: string]: string | null;
};

export type MealsApiResponse = {
	meals: MealApi[] | null;
};

export type CustomRecipeInput = Omit<Recipe, 'id' | 'isCustom' | 'createdAt' | 'updatedAt'>;
