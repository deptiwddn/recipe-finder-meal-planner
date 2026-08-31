import { newSpecPage } from '@stencil/core/testing';
import { LoadingSpinner } from './loading-spinner';

describe('loading-spinner', () => {
  it('renders the selected size accessibly', async () => {
    const page = await newSpecPage({ components: [LoadingSpinner], html: '<loading-spinner size="large"></loading-spinner>' });
    expect(page.root?.getAttribute('role')).toBe('status'); expect(page.root?.shadowRoot?.querySelector('.large')).not.toBeNull();
  });
});
