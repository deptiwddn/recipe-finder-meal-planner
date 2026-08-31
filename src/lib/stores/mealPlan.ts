import { writable } from 'svelte/store';
import type { DayOfWeek, MealPlan } from '$lib/models/meal-plan';
import { loadFromStorage, saveToStorage } from '$lib/utils/localStorage';

const { subscribe, set, update } = writable<MealPlan[]>(loadFromStorage<MealPlan[]>('meal-plan') ?? []);
subscribe((meals) => saveToStorage('meal-plan', meals));

export const mealPlan = { subscribe };
export const mealPlanStore = {
  assignMeal(meal: MealPlan): void { update((meals) => [...meals.filter((item) => item.dayOfWeek !== meal.dayOfWeek), meal]); },
  removeMeal(day: DayOfWeek): void { update((meals) => meals.filter((meal) => meal.dayOfWeek !== day)); },
  clear(): void { set([]); }
};
