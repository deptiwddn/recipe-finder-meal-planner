<script lang="ts">
	import { page } from '$app/stores';
	import { onMount } from 'svelte';
	import RecipeDetails from '$lib/components/RecipeDetails.svelte';
import LoadingSpinner from '$lib/components/LoadingSpinner.svelte';
import ErrorMessage from '$lib/components/ErrorMessage.svelte';
import EmptyState from '$lib/components/EmptyState.svelte';
	import { findRecipeById } from '$lib/services/recipeService';
	import { customRecipesStore } from '$lib/stores/customRecipes';
import type { Recipe } from '$lib/models/recipe';

	let recipe = $state<Recipe | null>(null);
	let loading = $state(true);
	let error = $state('');

	async function loadRecipe(): Promise<void> {
		loading = true; error = '';
		try {
			const id = $page.params.id ?? '';
			recipe = customRecipesStore.getRecipeById(id) ?? await findRecipeById(id);
		}
		catch { error = 'Could not load this recipe.'; }
		finally { loading = false; }
	}

	onMount(loadRecipe);
</script>

<svelte:head><title>{recipe ? `${recipe.title} | Recipe Finder` : 'Recipe Details | Recipe Finder'}</title></svelte:head>
{#if loading}<LoadingSpinner />{:else if error}<ErrorMessage message={error} onRetry={loadRecipe} />{:else if recipe}<RecipeDetails {recipe} />{:else}<EmptyState message="Recipe not found." />{/if}
