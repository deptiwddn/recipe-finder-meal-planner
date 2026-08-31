<script lang="ts">
	import { onMount } from 'svelte';
	import ErrorMessage from '$lib/components/ErrorMessage.svelte';
	import LoadingSpinner from '$lib/components/LoadingSpinner.svelte';
	import RecipeCard from '$lib/components/RecipeCard.svelte';
	import { findRecipes } from '$lib/services/recipeService';
	import { customRecipesStore } from '$lib/stores/customRecipes';
	import { favoritesStore } from '$lib/stores/favorites';
	import type { DayOfWeek } from '$lib/models/meal-plan';
	import type { RecipeSummary } from '$lib/models/recipe';

	type SelectedRecipe = {
		recipe: RecipeSummary;
		isCustomRecipe: boolean;
	};

	let { day, onSelect, onClose }: { day: DayOfWeek; onSelect: (selection: SelectedRecipe) => void; onClose: () => void } = $props();
	let dialog: HTMLDivElement;
	let searchTerm = $state('');
	let apiRecipes = $state<RecipeSummary[]>([]);
	let loading = $state(false);
	let error = $state('');
	let customRecipeIds = $derived(new Set($customRecipesStore.map((recipe) => recipe.id)));

	onMount(() => dialog.focus());

	async function searchRecipes(): Promise<void> {
		const term = searchTerm.trim();
		if (!term) { error = 'Enter a recipe name to search TheMealDB.'; apiRecipes = []; return; }

		loading = true;
		error = '';
		try { apiRecipes = await findRecipes(term, '', ''); }
		catch { error = 'Could not find recipes. Please try again.'; }
		finally { loading = false; }
	}

	function handleKeydown(event: KeyboardEvent): void { if (event.key === 'Escape') onClose(); }
	function choose(recipe: RecipeSummary, isCustomRecipe: boolean): void { onSelect({ recipe, isCustomRecipe }); }
</script>

<div class="backdrop" role="presentation" onclick={(event) => { if (event.target === event.currentTarget) onClose(); }}>
	<div bind:this={dialog} class="modal" role="dialog" aria-modal="true" aria-labelledby="selector-title" tabindex="-1" onkeydown={handleKeydown}>
		<div class="heading"><h2 id="selector-title">Select a recipe for {day}</h2><button type="button" class="close" onclick={onClose} aria-label="Close recipe selector">Close</button></div>
		<form onsubmit={(event) => { event.preventDefault(); searchRecipes(); }}><label for="meal-search">Search API recipes</label><div class="search"><input id="meal-search" bind:value={searchTerm} placeholder="For example, pasta" /><button type="submit">Search</button></div></form>

		{#if loading}<LoadingSpinner />{:else if error}<ErrorMessage message={error} onRetry={searchRecipes} />{:else if apiRecipes.length}<section aria-labelledby="api-recipes"><h3 id="api-recipes">API recipes</h3><div class="recipes">{#each apiRecipes as recipe}<div class="recipe"><RecipeCard {recipe} /><button type="button" onclick={() => choose(recipe, false)}>Select recipe</button></div>{/each}</div></section>{/if}
		{#if $favoritesStore.length}<section aria-labelledby="favorites"><h3 id="favorites">Favorites</h3><div class="recipes">{#each $favoritesStore as recipe}<div class="recipe"><RecipeCard {recipe} /><button type="button" onclick={() => choose(recipe, customRecipeIds.has(recipe.id))}>Select recipe</button></div>{/each}</div></section>{/if}
		{#if $customRecipesStore.length}<section aria-labelledby="custom-recipes"><h3 id="custom-recipes">Custom recipes</h3><div class="recipes">{#each $customRecipesStore as recipe}<div class="recipe"><RecipeCard {recipe} /><button type="button" onclick={() => choose(recipe, true)}>Select recipe</button></div>{/each}</div></section>{/if}
	</div>
</div>

<style>
	.backdrop { position: fixed; z-index: 10; inset: 0; overflow-y: auto; padding: 1rem; background: #0008; } .modal { max-width: 52rem; margin: 2rem auto; padding: 1.25rem; border-radius: .75rem; background: white; } .heading, .search { display: flex; gap: .75rem; align-items: center; justify-content: space-between; } h2, h3 { margin: 0; } h3 { margin-top: 1.5rem; } form { margin-top: 1rem; } label { display: block; margin-bottom: .4rem; font-weight: 700; } input { flex: 1; min-width: 0; padding: .65rem; border: 1px solid #d1d5db; border-radius: .35rem; font: inherit; } button { padding: .6rem .8rem; border: 0; border-radius: .35rem; background: #c2410c; color: white; font: inherit; cursor: pointer; } .close { background: #6b7280; } .recipes { display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: .75rem; margin-top: .75rem; } .recipe { display: grid; gap: .5rem; } .recipe > button { width: 100%; } @media (max-width: 600px) { .modal { margin: 0; } .recipes { grid-template-columns: 1fr; } }
</style>
