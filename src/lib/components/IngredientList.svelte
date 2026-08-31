<script lang="ts">import type { Ingredient } from '$lib/models/recipe'; let { ingredients }: { ingredients: Ingredient[] } = $props();</script>
<h2>Ingredients</h2><ul>{#each ingredients as ingredient}<li>{ingredient.name} {#if ingredient.measure}— {ingredient.measure}{/if}</li>{/each}</ul>
