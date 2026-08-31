import { newSpecPage } from '@stencil/core/testing';
import { MealPlanCard } from './meal-plan-card';

describe('meal-plan-card', () => {
  it('renders props and footer slot', async () => {
    const page = await newSpecPage({ components: [MealPlanCard], html: '<meal-plan-card day="Monday" recipe-title="Tacos"><span slot="footer">Extra</span></meal-plan-card>' });
    expect(page.root?.shadowRoot?.textContent).toContain('Monday'); expect(page.root?.shadowRoot?.textContent).toContain('Tacos'); expect(page.root?.querySelector('[slot="footer"]')?.textContent).toBe('Extra');
  });

  it('emits view, edit, and remove events', async () => {
    const page = await newSpecPage({ components: [MealPlanCard], html: '<meal-plan-card day="Tuesday" recipe-title="Rice"></meal-plan-card>' });
    const view = jest.fn(); const edit = jest.fn(); const remove = jest.fn(); page.root?.addEventListener('viewMeal', view); page.root?.addEventListener('editMeal', edit); page.root?.addEventListener('removeMeal', remove);
    const buttons = page.root?.shadowRoot?.querySelectorAll('button'); buttons?.[0].dispatchEvent(new MouseEvent('click', { bubbles: true })); buttons?.[1].click(); buttons?.[2].click();
    expect(view).toHaveBeenCalledWith(expect.objectContaining({ detail: { day: 'Tuesday' } })); expect(edit).toHaveBeenCalled(); expect(remove).toHaveBeenCalled();
  });
});
