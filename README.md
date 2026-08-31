# Recipe Finder & Meal Planner

## Published component package

The reusable StencilJS library is prepared for publication as **[@recipe-planner/components](https://www.npmjs.com/package/@recipe-planner/components)**. Run the publishing commands below from an npm-authenticated account.

The library source and package configuration live in [packages/recipe-components](packages/recipe-components). The SvelteKit app consumes the npm package through its loader; it does not import library source files.

## Step 1: Package configuration

The package metadata is in [packages/recipe-components/package.json](packages/recipe-components/package.json). It includes semantic versioning, public scoped-package publishing, keywords, author, license, repository, ESM, CommonJS, loader, and type-definition exports.

Build it from the package directory:

```bash
cd packages/recipe-components
npm install
npm run build
```

Generated output is placed in `dist/` and includes the ESM build, loader, and TypeScript declarations.

## Step 2: Publishing process

Authenticate once:

```bash
npm login
npm whoami
```

Publish the first public scoped release:

```bash
cd packages/recipe-components
npm run build
npm publish --access public
```

Release a backward-compatible feature or bug fix:

```bash
npm version patch
npm run build
npm publish --access public
```

For a new feature release, use `npm version minor`; for a breaking API change, use `npm version major`. Never republish the same version: npm versions are immutable. A republish means incrementing the version, rebuilding, and publishing again.

Check the package before publishing:

```bash
npm pack --dry-run
```

## Step 3: Installation in SvelteKit

After publishing:

```bash
npm install @recipe-planner/components@0.1.0
```

The dependency is recorded in the root [package.json](package.json).

## Step 4: Component registration

[stencil.ts](src/lib/stencil.ts) dynamically imports the npm package loader. The root layout calls it once in `onMount`, so custom elements are registered only in the browser and do not run during SSR.

```ts
import { onMount } from 'svelte';
import { registerStencilComponents } from '$lib/stencil';

onMount(() => { void registerStencilComponents(); });
```

## Step 5: Props integration

The Svelte wrappers pass values to published custom-element attributes:

```svelte
<recipe-card recipe-id={recipe.id} title={recipe.title} image={recipe.image}
  category={recipe.category} area={recipe.area} is-favorite={isFavorite} />

<meal-plan-card day={meal.dayOfWeek} recipe-title={meal.recipeTitle}
  recipe-image={meal.recipeImage} />
```

See [RecipeCard.svelte](src/lib/components/RecipeCard.svelte) and [MealPlanCard.svelte](src/lib/components/MealPlanCard.svelte).

## Step 6: Event integration

Stencil events arrive in Svelte as `CustomEvent` values:

```svelte
<recipe-card onrecipeSelected={selectRecipe} onfavoriteToggled={toggleFavorite} />
<search-bar onsearchChanged={change} onsearchSubmitted={submit} />
<meal-plan-card oneditMeal={editMeal} onremoveMeal={removeMeal} onviewMeal={viewMeal} />
```

Payloads are: `recipeSelected` → `{ recipeId }`, `favoriteToggled` → `{ recipeId, isFavorite }`, search events → string, and meal events → `{ day }`.

## Step 7: Slot integration

```svelte
<recipe-card ...>
  <a slot="actions" href={`/recipes/${recipe.id}`}>View Details</a>
</recipe-card>

<meal-plan-card ...>
  <a slot="footer" href={`/recipes/${meal.recipeId}`}>View details</a>
</meal-plan-card>

<app-button variant="secondary">Clear</app-button>
```

The first two examples use named slots; the button uses its default slot.

## Step 8: Verification checklist

- [ ] npm package installation succeeds
- [ ] ESM, loader, and type definitions exist in `dist/`
- [ ] Components render and receive props
- [ ] Events transfer from Stencil to Svelte
- [ ] Named and default slots render
- [ ] Browser refresh works after loader registration
- [ ] `npm run check` passes
- [ ] `npm run build` passes
- [ ] Stencil unit tests pass

## Step 9: Local development

```bash
npm install
npm run check
npm run build

cd packages/recipe-components
npm install
npm test
npm run build
```
