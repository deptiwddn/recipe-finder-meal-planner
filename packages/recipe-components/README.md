# Recipe Planner Components

Reusable, accessible StencilJS web components for the Recipe Finder & Meal Planner. The package uses Shadow DOM and has no CSS framework dependency.

## Setup

```bash
cd packages/recipe-components
npm install
npm run build
npm test
```

For a SvelteKit consumer, load the generated custom elements once from the package loader:

```ts
import { defineCustomElements } from '@recipe-planner/components/loader';
defineCustomElements();
```

## Components

### `recipe-card`

Displays an image, title, category, area, favorite button, and optional actions.

| Props | Type | Default |
| --- | --- | --- |
| `recipeId` | `string` | `''` |
| `title` | `string` | `''` |
| `image` | `string` | `''` |
| `category` | `string` | `''` |
| `area` | `string` | `''` |
| `isFavorite` | `boolean` | `false` |

Events `recipeSelected` and `favoriteToggled` emit `{ recipeId, isFavorite? }`. Slot: `actions`.

```html
<recipe-card recipe-id="42" title="Vegetable Curry" category="Main" area="Indian" image="/curry.jpg">
  <app-button slot="actions" variant="secondary">View recipe</app-button>
</recipe-card>
```

### `search-bar`

Reusable search input with a submit button and Enter-key support. Props: `placeholder: string`, `value: string`. Events: `searchChanged` emits the current string; `searchSubmitted` emits the trimmed string. No named slots.

```html
<search-bar placeholder="Search recipes" value="pasta"></search-bar>
```

### `app-button`

Accessible button with props `variant: 'primary' | 'secondary' | 'danger'`, `disabled: boolean`, and `loading: boolean`. Loading disables the button and displays a loading label. Default slot: button text.

```html
<app-button variant="danger" loading>Delete recipe</app-button>
```

### `loading-spinner`

Accessible loading indicator. Prop `size: 'small' | 'medium' | 'large'` (default `medium`).

```html
<loading-spinner size="small"></loading-spinner>
```

### `meal-plan-card`

Displays a day, assigned recipe, image, and edit/remove controls. Props: `day: string`, `recipeTitle: string`, `recipeImage: string`. Events `editMeal`, `removeMeal`, and `viewMeal` emit `{ day }`. Slot: `footer`.

```html
<meal-plan-card day="Monday" recipe-title="Tacos" recipe-image="/tacos.jpg">
  <small slot="footer">Dinner</small>
</meal-plan-card>
```

## Development

`npm run start` starts a live Stencil development server. `npm run test` runs unit tests for props, custom events, and slots. The package is ready to publish after `npm run build` and a version update.
