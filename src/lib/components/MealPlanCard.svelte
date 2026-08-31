<script lang="ts">
  import { goto } from '$app/navigation';
  import type { MealPlan } from '$lib/models/meal-plan';

  let { meal, onEdit, onRemove }: { meal: MealPlan; onEdit?: () => void; onRemove?: () => void } = $props();
  function viewMeal(): void { void goto(`/recipes/${meal.recipeId}`); }
  function editMeal(): void { onEdit?.(); }
  function removeMeal(): void { onRemove?.(); }
</script>

<meal-plan-card day={meal.dayOfWeek} recipe-title={meal.recipeTitle} recipe-image={meal.recipeImage} onviewMeal={viewMeal} oneditMeal={editMeal} onremoveMeal={removeMeal}>
  <a slot="footer" href={`/recipes/${meal.recipeId}`}>View details</a>
</meal-plan-card>

