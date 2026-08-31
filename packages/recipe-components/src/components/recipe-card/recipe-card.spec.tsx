import { newSpecPage } from '@stencil/core/testing';
import { RecipeCard } from './recipe-card';

describe('recipe-card', () => {
  it('renders recipe props and an actions slot', async () => {
    const page = await newSpecPage({ components: [RecipeCard], html: '<recipe-card recipe-id="1" title="Curry" category="Main" area="Indian"><span slot="actions">Open</span></recipe-card>' });
    expect(page.root?.shadowRoot?.textContent).toContain('Curry');
    expect(page.root?.shadowRoot?.querySelector('img')).toBeNull();
    expect(page.root?.querySelector('[slot="actions"]')?.textContent).toBe('Open');
  });

  it('emits recipeSelected and favoriteToggled', async () => {
    const page = await newSpecPage({ components: [RecipeCard], html: '<recipe-card recipe-id="42" title="Soup"></recipe-card>' });
    const selected = jest.fn(); const favorite = jest.fn();
    page.root?.addEventListener('recipeSelected', selected); page.root?.addEventListener('favoriteToggled', favorite);
    page.root?.shadowRoot?.querySelector('article')?.dispatchEvent(new MouseEvent('click', { bubbles: true }));
    page.root?.shadowRoot?.querySelector<HTMLButtonElement>('.favorite')?.click();
    expect(selected).toHaveBeenCalled(); expect(favorite).toHaveBeenCalled();
  });
});
