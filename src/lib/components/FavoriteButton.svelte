<script lang="ts">
	import type { RecipeSummary } from '$lib/models/recipe';
	import { favoritesStore } from '$lib/stores/favorites';
	let { recipe }: { recipe: RecipeSummary } = $props();
	let favorite = $derived($favoritesStore.some((item) => item.id === recipe.id));
</script>

<button type="button" class:chosen={favorite} aria-pressed={favorite} aria-label={favorite ? `Remove ${recipe.title} from favorites` : `Add ${recipe.title} to favorites`} onclick={() => favoritesStore.toggleFavorite(recipe)}>
	{favorite ? '♥ Remove from Favorites' : '♡ Add to Favorites'}
</button>

<style>button { padding: .6rem .8rem; border: 1px solid #c2410c; border-radius: .4rem; background: white; color: #9a3412; cursor: pointer; } button.chosen { background: #c2410c; color: white; }</style>
