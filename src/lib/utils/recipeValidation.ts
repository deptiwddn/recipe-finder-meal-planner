import { z } from 'zod';

export const recipeSchema = z.object({
	title: z.string().trim().min(3, 'Recipe name must be at least 3 characters.'),
	category: z.string().trim().min(1, 'Category is required.'),
	area: z.string().trim(),
	image: z.string().trim().refine((value) => value === '' || isValidUrl(value), 'Enter a valid image URL.'),
	instructions: z.string().trim().min(20, 'Instructions must be at least 20 characters.'),
	ingredients: z.array(z.object({ name: z.string().trim(), measure: z.string().trim() })).refine(
		(items) => items.some((item) => item.name.length > 0),
		'Add at least one ingredient.'
	)
});

function isValidUrl(value: string): boolean {
	try { new URL(value); return true; } catch { return false; }
}

export type RecipeFormData = z.infer<typeof recipeSchema>;
