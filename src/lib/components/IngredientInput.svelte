<script lang="ts">
	import type { Ingredient } from '$lib/models/recipe';
	let { ingredient, onChange, onRemove }: { ingredient: Ingredient; onChange: (ingredient: Ingredient) => void; onRemove: () => void } = $props();
</script>

<div class="ingredient"><input aria-label="Ingredient name" value={ingredient.name} oninput={(event) => onChange({ ...ingredient, name: event.currentTarget.value })} placeholder="Ingredient" /><input aria-label="Ingredient amount" value={ingredient.measure} oninput={(event) => onChange({ ...ingredient, measure: event.currentTarget.value })} placeholder="Amount" /><button type="button" onclick={onRemove} aria-label="Remove ingredient">Remove</button></div>
<style>.ingredient { display: flex; gap: .5rem; margin: .5rem 0; } input { flex: 1; padding: .55rem; border: 1px solid #d1d5db; border-radius: .3rem; } button { background: #6b7280; color: white; border: 0; border-radius: .3rem; padding: .5rem; } @media (max-width: 520px) { .ingredient { flex-wrap: wrap; } input { min-width: 40%; } }</style>
