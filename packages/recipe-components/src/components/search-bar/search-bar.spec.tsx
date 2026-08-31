import { newSpecPage } from '@stencil/core/testing';
import { SearchBar } from './search-bar';

describe('search-bar', () => {
  it('renders its value and placeholder', async () => {
    const page = await newSpecPage({ components: [SearchBar], html: '<search-bar value="pasta" placeholder="Find food"></search-bar>' });
    const input = page.root?.shadowRoot?.querySelector<HTMLInputElement>('input');
    expect(input?.value).toBe('pasta'); expect(input?.placeholder).toBe('Find food');
  });

  it('emits change and submit events', async () => {
    const page = await newSpecPage({ components: [SearchBar], html: '<search-bar></search-bar>' });
    const changed = jest.fn(); const submitted = jest.fn(); page.root?.addEventListener('searchChanged', changed); page.root?.addEventListener('searchSubmitted', submitted);
    const input = page.root?.shadowRoot?.querySelector<HTMLInputElement>('input');
    if (!input) throw new Error('Input was not rendered'); input.value = 'cake'; input.dispatchEvent(new Event('input', { bubbles: true }));
    page.root?.shadowRoot?.querySelector('form')?.dispatchEvent(new Event('submit', { bubbles: true, cancelable: true }));
    expect(changed).toHaveBeenCalledWith(expect.objectContaining({ detail: 'cake' })); expect(submitted).toHaveBeenCalledWith(expect.objectContaining({ detail: 'cake' }));
  });
});
