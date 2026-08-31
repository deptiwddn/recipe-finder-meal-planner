# recipe-card



<!-- Auto Generated Below -->


## Properties

| Property      | Attribute     | Description                                                                                   | Type      | Default |
| ------------- | ------------- | --------------------------------------------------------------------------------------------- | --------- | ------- |
| `area`        | `area`        |                                                                                               | `string`  | `''`    |
| `category`    | `category`    |                                                                                               | `string`  | `''`    |
| `image`       | `image`       |                                                                                               | `string`  | `''`    |
| `isFavorite`  | `is-favorite` |                                                                                               | `boolean` | `false` |
| `recipeId`    | `recipe-id`   | Identifier returned with card events.                                                         | `string`  | `''`    |
| `recipeTitle` | `title`       | Public HTML attribute remains `title`; the internal name avoids HTMLElement.title collisions. | `string`  | `''`    |


## Events

| Event             | Description | Type                                                      |
| ----------------- | ----------- | --------------------------------------------------------- |
| `favoriteToggled` |             | `CustomEvent<RecipeCardEvent & { isFavorite: boolean; }>` |
| `recipeSelected`  |             | `CustomEvent<RecipeCardEvent>`                            |


## Slots

| Slot        | Description |
| ----------- | ----------- |
| `"actions"` |             |


----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
