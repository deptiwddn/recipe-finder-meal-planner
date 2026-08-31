<script lang="ts">
	import { goto } from '$app/navigation';
	import type { RecipeSummary } from '$lib/models/recipe';
	import { favoritesStore } from '$lib/stores/favorites';
	let { recipe }: { recipe: RecipeSummary } = $props();
	function selectRecipe(): void { void goto(`/recipes/${recipe.id}`); }
	function toggleFavorite(event: CustomEvent<{ recipeId: string; isFavorite: boolean }>): void {
		if (event.detail.isFavorite) favoritesStore.addFavorite(recipe); else favoritesStore.removeFavorite(recipe.id);
	}
</script>

<recipe-card recipe-id={recipe.id} title={recipe.title} image={recipe.image} category={recipe.category} area={recipe.area} is-favorite={favoritesStore.isFavorite(recipe.id)} onrecipeSelected={selectRecipe} onfavoriteToggled={toggleFavorite}>
	<a slot="actions" href={`/recipes/${recipe.id}`}>View Details</a>
</recipe-card>
