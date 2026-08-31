export type DayOfWeek =
	| 'Monday'
	| 'Tuesday'
	| 'Wednesday'
	| 'Thursday'
	| 'Friday'
	| 'Saturday'
	| 'Sunday';

export type MealPlan = {
	dayOfWeek: DayOfWeek;
	recipeId: string;
	recipeTitle: string;
	recipeImage: string;
	recipeCategory: string;
	isCustomRecipe: boolean;
};
