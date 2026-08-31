<script lang="ts">
	import type { Ingredient, Recipe } from '$lib/models/recipe';
	import IngredientInput from '$lib/components/IngredientInput.svelte';
	import RecipeActions from '$lib/components/RecipeActions.svelte';
	import { recipeSchema, type RecipeFormData } from '$lib/utils/recipeValidation';

	let { recipe, onSave, onCancel }: { recipe?: Recipe; onSave: (data: RecipeFormData) => void; onCancel: () => void } = $props();
	let form = $state<RecipeFormData>(emptyForm());
	let errors = $state<Record<string, string>>({});

	$effect(() => {
		form = recipe ? recipeToForm(recipe) : emptyForm();
	});

	function emptyForm(): RecipeFormData {
		return { title: '', category: '', area: '', image: '', instructions: '', ingredients: [{ name: '', measure: '' }] };
	}

	function recipeToForm(value: Recipe): RecipeFormData {
		return { title: value.title, category: value.category, area: value.area, image: value.image, instructions: value.instructions, ingredients: value.ingredients.length ? [...value.ingredients] : [{ name: '', measure: '' }] };
	}

	function addIngredient(): void { form.ingredients = [...form.ingredients, { name: '', measure: '' }]; }
	function changeIngredient(index: number, ingredient: Ingredient): void { form.ingredients[index] = ingredient; form.ingredients = [...form.ingredients]; }
	function removeIngredient(index: number): void { form.ingredients = form.ingredients.filter((_, itemIndex) => itemIndex !== index); }
	function save(): void {
		errors = {};
		const result = recipeSchema.safeParse(form);
		if (!result.success) { result.error.issues.forEach((issue) => { errors[issue.path[0]?.toString() ?? 'form'] = issue.message; }); return; }
		onSave(result.data);
	}
</script>

<form onsubmit={(event) => { event.preventDefault(); save(); }} novalidate>
	<label for="title">Recipe Name</label><input id="title" bind:value={form.title} aria-invalid={!!errors.title} aria-describedby={errors.title ? 'title-error' : undefined} />{#if errors.title}<p id="title-error" class="error" role="alert">{errors.title}</p>{/if}
	<label for="category">Category</label><input id="category" bind:value={form.category} aria-invalid={!!errors.category} aria-describedby={errors.category ? 'category-error' : undefined} />{#if errors.category}<p id="category-error" class="error" role="alert">{errors.category}</p>{/if}
	<label for="area">Area / Cuisine</label><input id="area" bind:value={form.area} />
	<label for="image">Image URL</label><input id="image" type="url" bind:value={form.image} aria-invalid={!!errors.image} aria-describedby={errors.image ? 'image-error' : undefined} />{#if errors.image}<p id="image-error" class="error" role="alert">{errors.image}</p>{/if}
	<fieldset><legend>Ingredients</legend>{#each form.ingredients as ingredient, index}<IngredientInput {ingredient} onChange={(value) => changeIngredient(index, value)} onRemove={() => removeIngredient(index)} />{/each}<button type="button" onclick={addIngredient}>Add ingredient</button>{#if errors.ingredients}<p class="error" role="alert">{errors.ingredients}</p>{/if}</fieldset>
	<label for="instructions">Instructions</label><textarea id="instructions" rows="8" bind:value={form.instructions} aria-invalid={!!errors.instructions} aria-describedby={errors.instructions ? 'instructions-error' : undefined}></textarea>{#if errors.instructions}<p id="instructions-error" class="error" role="alert">{errors.instructions}</p>{/if}
	<RecipeActions {onCancel} saveText={recipe ? 'Save changes' : 'Save recipe'} />
</form>

<style>form { max-width: 40rem; display: grid; gap: .4rem; } label, legend { margin-top: .75rem; font-weight: 700; } input, textarea { width: 100%; padding: .65rem; border: 1px solid #d1d5db; border-radius: .35rem; font: inherit; } fieldset { margin: .75rem 0; padding: 1rem; border: 1px solid #e5e7eb; border-radius: .5rem; } fieldset > button { padding: .55rem; } .error { margin: 0; color: #b91c1c; font-size: .9rem; }
</style>
