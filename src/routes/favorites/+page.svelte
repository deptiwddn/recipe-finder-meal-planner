<script lang="ts">
	import EmptyState from '$lib/components/EmptyState.svelte';
	import RecipeGrid from '$lib/components/RecipeGrid.svelte';
	import { favoritesStore } from '$lib/stores/favorites';
</script>

<svelte:head><title>Favorites | Recipe Finder</title></svelte:head>
<h1>Favorites</h1>
{#if $favoritesStore.length}<RecipeGrid recipes={$favoritesStore} />{:else}<EmptyState message="You have not saved any favorites yet." />{/if}
