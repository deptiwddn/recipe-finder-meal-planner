<script lang="ts">
	import { onMount } from 'svelte';
	import AreaFilter from '$lib/components/AreaFilter.svelte';
	import CategoryFilter from '$lib/components/CategoryFilter.svelte';
	import EmptyState from '$lib/components/EmptyState.svelte';
	import ErrorMessage from '$lib/components/ErrorMessage.svelte';
	import LoadingSpinner from '$lib/components/LoadingSpinner.svelte';
	import RecipeGrid from '$lib/components/RecipeGrid.svelte';
	import SearchBar from '$lib/components/SearchBar.svelte';
	import { filterStore } from '$lib/stores/filters';
	import { recipesStore } from '$lib/stores/recipes';
	import { searchStore } from '$lib/stores/search';

	let controller: AbortController | undefined;

	onMount(async () => {
		await Promise.all([filterStore.loadCategories(), filterStore.loadAreas()]);
	});

	function loadRecipes(): void {
		controller?.abort();
		controller = new AbortController();
		recipesStore.searchRecipes($searchStore, $filterStore.selectedCategory, $filterStore.selectedArea, controller.signal);
	}

	function search(value: string): void {
		searchStore.setSearchTerm(value);
		loadRecipes();
	}

	function clearAll(): void {
		searchStore.clearSearch();
		filterStore.clearFilters();
		recipesStore.resetStore();
	}

	function changeCategory(value: string): void { filterStore.setCategory(value); loadRecipes(); }
	function changeArea(value: string): void { filterStore.setArea(value); loadRecipes(); }
</script>

<svelte:head><title>Recipes | Recipe Finder</title></svelte:head>

<h1>Find recipes</h1>
<p>Search by recipe name, category, or cuisine.</p>

<section class="filters">
	<SearchBar onSearch={search} onClear={clearAll} />
	<div class="selects">
		<CategoryFilter categories={$filterStore.categories} value={$filterStore.selectedCategory} onChange={changeCategory} />
		<AreaFilter areas={$filterStore.areas} value={$filterStore.selectedArea} onChange={changeArea} />
		<button type="button" onclick={clearAll}>Clear filters</button>
	</div>
</section>

{#if $recipesStore.loading || $filterStore.loading}
	<LoadingSpinner />
{:else if $recipesStore.error || $filterStore.error}
	<ErrorMessage message={$recipesStore.error || $filterStore.error} onRetry={loadRecipes} />
{:else if $recipesStore.recipes.length > 0}
	<RecipeGrid recipes={$recipesStore.recipes} />
{:else}
	<EmptyState message="Search for a recipe or choose a filter to get started." />
{/if}

<style>
	h1 { margin-bottom: .25rem; } .filters { margin: 2rem 0; padding: 1rem; background: #ffedd5; border-radius: .75rem; } .selects { display: flex; gap: .75rem; align-items: end; flex-wrap: wrap; margin-top: 1rem; } button { padding: .7rem; border: 1px solid #d1d5db; border-radius: .4rem; cursor: pointer; background: #9a3412; color: white; }
</style>
