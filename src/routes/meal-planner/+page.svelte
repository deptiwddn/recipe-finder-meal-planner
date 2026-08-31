<script lang="ts">
	import MealPlannerGrid from '$lib/components/MealPlannerGrid.svelte';
	import DeleteConfirmationModal from '$lib/components/DeleteConfirmationModal.svelte';
	import RecipeSelectorModal from '$lib/components/RecipeSelectorModal.svelte';
	import type { DayOfWeek } from '$lib/models/meal-plan';
	import type { RecipeSummary } from '$lib/models/recipe';
	import { mealPlan, mealPlanStore } from '$lib/stores/mealPlan';

	const days: DayOfWeek[] = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
	let selectedDay = $state<DayOfWeek>('Monday');
	let dayToRemove = $state<DayOfWeek | null>(null);
	let pickerOpen = $state(false);
	let message = $state('');

	function openPicker(day: DayOfWeek): void {
		selectedDay = day;
		pickerOpen = true;
		message = '';
	}

	function selectRecipe({ recipe, isCustomRecipe }: { recipe: RecipeSummary; isCustomRecipe: boolean }): void {
		mealPlanStore.assignMeal({
			dayOfWeek: selectedDay,
			recipeId: recipe.id,
			recipeTitle: recipe.title,
			recipeImage: recipe.image,
			recipeCategory: recipe.category,
			isCustomRecipe
		});
		pickerOpen = false;
		message = `${recipe.title} planned for ${selectedDay}.`;
	}

	function removeMeal(): void {
		if (!dayToRemove) return;
		mealPlanStore.removeMeal(dayToRemove);
		message = `Meal removed from ${dayToRemove}.`;
		dayToRemove = null;
	}
</script>

<svelte:head><title>Meal Planner | Recipe Finder</title></svelte:head>

<h1>Meal Planner</h1>
<p>Plan one recipe for each day of the week.</p>
{#if message}<p class="message" role="status">{message}</p>{/if}
<MealPlannerGrid days={days} meals={$mealPlan} onAddMeal={openPicker} onEditMeal={openPicker} onRemoveMeal={(day) => dayToRemove = day} />
{#if pickerOpen}<RecipeSelectorModal day={selectedDay} onSelect={selectRecipe} onClose={() => pickerOpen = false} />{/if}
{#if dayToRemove}<DeleteConfirmationModal title="Remove meal?" description={`The meal planned for ${dayToRemove} will be removed.`} onConfirm={removeMeal} onCancel={() => dayToRemove = null} />{/if}

<style>
	.message { margin: 1rem 0; color: #166534; font-weight: 700; }
</style>
