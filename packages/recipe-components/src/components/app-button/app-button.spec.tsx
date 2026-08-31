import { newSpecPage } from '@stencil/core/testing';
import { AppButton } from './app-button';

describe('app-button', () => {
  it('renders default slot content and loading state', async () => {
    const page = await newSpecPage({ components: [AppButton], html: '<app-button variant="danger" loading>Delete</app-button>' });
    expect(page.root?.querySelector('[slot]')).toBeNull();
    expect(page.root?.textContent).toContain('Delete');
    expect(page.root?.shadowRoot?.querySelector('button')?.hasAttribute('disabled')).toBe(true);
    expect(page.root?.shadowRoot?.querySelector('.loading-label')).not.toBeNull();
  });
});
