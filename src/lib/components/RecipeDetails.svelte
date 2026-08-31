<script lang="ts">
	import FavoriteButton from '$lib/components/FavoriteButton.svelte';
	import IngredientList from '$lib/components/IngredientList.svelte';
	import InstructionSection from '$lib/components/InstructionSection.svelte';
	import type { Recipe } from '$lib/models/recipe';
	let { recipe }: { recipe: Recipe } = $props();
</script>

<div class="details"><img src={recipe.image} alt={recipe.title} /><div><h1>{recipe.title}</h1><p>{recipe.category} {recipe.area ? `· ${recipe.area}` : ''}</p><FavoriteButton recipe={recipe} />{#if recipe.tags.length}<div class="tags">{#each recipe.tags as tag}<span>{tag}</span>{/each}</div>{/if}<IngredientList ingredients={recipe.ingredients} /><InstructionSection instructions={recipe.instructions} />{#if recipe.youtubeUrl}<a class="youtube" href={recipe.youtubeUrl} target="_blank" rel="noreferrer">Watch on YouTube</a>{/if}</div></div>

<style>
	.details { display: grid; grid-template-columns: minmax(0, 1fr) minmax(0, 1fr); gap: 2rem; } img { width: 100%; border-radius: .75rem; } h1 { margin-top: 0; } .tags { display: flex; gap: .4rem; flex-wrap: wrap; margin: 1rem 0; } .tags span { padding: .25rem .5rem; border-radius: 1rem; background: #ffedd5; } .youtube { color: #b91c1c; font-weight: 700; } @media (max-width: 700px) { .details { grid-template-columns: 1fr; } }
</style>
