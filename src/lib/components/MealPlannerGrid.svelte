<script lang="ts">
	import DayCard from '$lib/components/DayCard.svelte';
	import type { DayOfWeek, MealPlan } from '$lib/models/meal-plan';

	let {
		days,
		meals,
		onAddMeal,
		onEditMeal,
		onRemoveMeal
	}: {
		days: DayOfWeek[];
		meals: MealPlan[];
		onAddMeal: (day: DayOfWeek) => void;
		onEditMeal: (day: DayOfWeek) => void;
		onRemoveMeal: (day: DayOfWeek) => void;
	} = $props();

	let mealsByDay = $derived(new Map(meals.map((meal) => [meal.dayOfWeek, meal])));
</script>

<section class="grid" aria-label="Weekly meal plan">
	{#each days as day}
		<DayCard {day} meal={mealsByDay.get(day)} onAdd={() => onAddMeal(day)} onEdit={() => onEditMeal(day)} onRemove={() => onRemoveMeal(day)} />
	{/each}
</section>

<style>
	.grid { display: grid; grid-template-columns: repeat(7, minmax(0, 1fr)); gap: 1rem; }
	@media (max-width: 1100px) { .grid { grid-template-columns: repeat(2, minmax(0, 1fr)); } }
	@media (max-width: 600px) { .grid { grid-template-columns: 1fr; } }
</style>
