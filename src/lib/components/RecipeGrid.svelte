<script lang="ts">
	import RecipeCard from '$lib/components/RecipeCard.svelte';
	import type { RecipeSummary } from '$lib/models/recipe';
	let { recipes }: { recipes: RecipeSummary[] } = $props();
</script>
<div class="grid">{#each recipes as recipe}<RecipeCard {recipe} />{/each}</div>
<style>.grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 1.25rem; } @media (max-width: 900px) { .grid { grid-template-columns: repeat(2, 1fr); } } @media (max-width: 560px) { .grid { grid-template-columns: 1fr; } }</style>
