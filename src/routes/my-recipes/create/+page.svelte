<script lang="ts">
	import { goto } from '$app/navigation';
	import RecipeForm from '$lib/components/RecipeForm.svelte';
	import { customRecipesStore } from '$lib/stores/customRecipes';
	import type { CustomRecipeInput } from '$lib/models/recipe';
	let saved = $state(false);
	function saveRecipe(data: Omit<CustomRecipeInput, 'tags' | 'youtubeUrl'>): void { customRecipesStore.addRecipe({ ...data, tags: [], youtubeUrl: '' }); saved = true; setTimeout(() => goto('/my-recipes'), 500); }
</script>
<svelte:head><title>Create Recipe | Recipe Finder</title></svelte:head>
<h1>Create Recipe</h1>{#if saved}<p role="status">Recipe saved. Redirecting...</p>{/if}<RecipeForm onSave={saveRecipe} onCancel={() => goto('/my-recipes')} />
