<script lang="ts">
	import MealPlanCard from '$lib/components/MealPlanCard.svelte';
	import type { DayOfWeek, MealPlan } from '$lib/models/meal-plan';

	let { day, meal, onAdd, onEdit, onRemove }: { day: DayOfWeek; meal?: MealPlan; onAdd: () => void; onEdit: () => void; onRemove: () => void } = $props();
</script>

<article class="day-card">
	<h2>{day}</h2>
	{#if meal}
		<MealPlanCard {meal} {onEdit} {onRemove} />
	{:else}
		<p class="empty">No meal planned</p>
		<button type="button" onclick={onAdd} aria-label={`Add a meal for ${day}`}>Add meal</button>
	{/if}
</article>

<style>
	.day-card { display: flex; min-height: 18rem; flex-direction: column; gap: .75rem; padding: 1rem; border-radius: .75rem; background: white; box-shadow: 0 2px 10px #0002; } h2, p { margin: 0; } h2 { font-size: 1.15rem; } .empty { flex: 1; display: grid; place-items: center; color: #6b7280; } button { padding: .6rem .8rem; border: 0; border-radius: .35rem; background: #c2410c; color: white; font: inherit; font-weight: 700; cursor: pointer; }
</style>
