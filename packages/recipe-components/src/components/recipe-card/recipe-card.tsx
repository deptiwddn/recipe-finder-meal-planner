import { Component, Event, EventEmitter, Host, Prop } from '@stencil/core';

export interface RecipeCardEvent { recipeId: string; }

@Component({ tag: 'recipe-card', styleUrl: 'recipe-card.css', shadow: true })
export class RecipeCard {
  /** Identifier returned with card events. */
  @Prop() recipeId = '';
  /** Public HTML attribute remains `title`; the internal name avoids HTMLElement.title collisions. */
  @Prop({ attribute: 'title' }) recipeTitle = '';
  @Prop() image = '';
  @Prop() category = '';
  @Prop() area = '';
  @Prop() isFavorite = false;

  @Event() recipeSelected!: EventEmitter<RecipeCardEvent>;
  @Event() favoriteToggled!: EventEmitter<RecipeCardEvent & { isFavorite: boolean }>;

  private selectRecipe = (event: MouseEvent) => {
    if ((event.target as HTMLElement).closest('button, a, [data-card-action]')) return;
    this.recipeSelected.emit({ recipeId: this.recipeId });
  };

  private toggleFavorite = (event: MouseEvent) => {
    event.stopPropagation();
    this.favoriteToggled.emit({ recipeId: this.recipeId, isFavorite: !this.isFavorite });
  };

  render() {
    return <Host>
      <article class="card" onClick={this.selectRecipe}>
        {this.image ? <img src={this.image} alt={`${this.recipeTitle} recipe`} /> : <div class="image-placeholder" aria-hidden="true">🍽️</div>}
        <div class="content">
          <div class="heading-row">
            <h2>{this.recipeTitle}</h2>
            <button class="favorite" type="button" aria-label={this.isFavorite ? 'Remove from favorites' : 'Add to favorites'} aria-pressed={this.isFavorite} onClick={this.toggleFavorite}>{this.isFavorite ? '♥' : '♡'}</button>
          </div>
          <p class="meta">{[this.category, this.area].filter(Boolean).join(' · ')}</p>
          <div class="actions" data-card-action><slot name="actions" /></div>
        </div>
      </article>
    </Host>;
  }
}
