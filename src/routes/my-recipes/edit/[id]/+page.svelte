<script lang="ts">
	import { page } from '$app/stores';
	import { goto } from '$app/navigation';
	import EmptyState from '$lib/components/EmptyState.svelte';
	import RecipeForm from '$lib/components/RecipeForm.svelte';
	import { customRecipesStore } from '$lib/stores/customRecipes';
	import type { CustomRecipeInput } from '$lib/models/recipe';
	let recipe = $derived($customRecipesStore.find((item) => item.id === ($page.params.id ?? '')));
	let saved = $state(false);
	function saveRecipe(data: Omit<CustomRecipeInput, 'tags' | 'youtubeUrl'>): void { if (recipe) { customRecipesStore.updateRecipe(recipe.id, { ...data, tags: recipe.tags, youtubeUrl: recipe.youtubeUrl }); saved = true; setTimeout(() => goto('/my-recipes'), 500); } }
</script>
<svelte:head><title>Edit Recipe | Recipe Finder</title></svelte:head>
{#if recipe}<h1>Edit Recipe</h1>{#if saved}<p role="status">Changes saved. Redirecting...</p>{/if}<RecipeForm {recipe} onSave={saveRecipe} onCancel={() => goto('/my-recipes')} />{:else}<EmptyState message="Custom recipe not found." />{/if}
