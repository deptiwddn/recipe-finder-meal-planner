<script lang="ts">
	import EmptyState from '$lib/components/EmptyState.svelte';
	import RecipeCard from '$lib/components/RecipeCard.svelte';
	import DeleteConfirmationModal from '$lib/components/DeleteConfirmationModal.svelte';
	import { customRecipesStore } from '$lib/stores/customRecipes';
	let deleteId = $state('');
	let message = $state('');
	function deleteRecipe(): void { customRecipesStore.deleteRecipe(deleteId); deleteId = ''; message = 'Recipe deleted.'; }
</script>
<svelte:head><title>My Recipes | Recipe Finder</title></svelte:head>
<div class="heading"><div><h1>My Recipes</h1><p>Recipes you have created.</p></div><a href="/my-recipes/create">Create recipe</a></div>
{#if message}<p role="status">{message}</p>{/if}
{#if $customRecipesStore.length}<div class="grid">{#each $customRecipesStore as recipe}<div><RecipeCard recipe={recipe} /><div class="actions"><a href={`/my-recipes/edit/${recipe.id}`}>Edit</a><button onclick={() => deleteId = recipe.id}>Delete</button></div></div>{/each}</div>{:else}<EmptyState message="You have not created any recipes yet." />{/if}
{#if deleteId}<DeleteConfirmationModal onConfirm={deleteRecipe} onCancel={() => deleteId = ''} />{/if}
<style>.heading { display: flex; justify-content: space-between; align-items: center; gap: 1rem; } a { color: #9a3412; font-weight: 700; } .heading > a { padding: .7rem; background: #c2410c; color: white; border-radius: .4rem; text-decoration: none; } .grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 1.25rem; } .actions { display: flex; gap: 1rem; padding: .75rem 0; } button { border: 0; background: none; color: #b91c1c; cursor: pointer; font: inherit; font-weight: 700; } @media (max-width: 900px) { .grid { grid-template-columns: repeat(2, 1fr); } } @media (max-width: 560px) { .heading { align-items: flex-start; flex-direction: column; } .grid { grid-template-columns: 1fr; } }</style>
