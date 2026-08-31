import { Component, Host, Prop } from '@stencil/core';

export type SpinnerSize = 'small' | 'medium' | 'large';

@Component({ tag: 'loading-spinner', styleUrl: 'loading-spinner.css', shadow: true })
export class LoadingSpinner {
  @Prop() size: SpinnerSize = 'medium';
  render() { return <Host role="status" aria-label="Loading"><span class={`spinner ${this.size}`} aria-hidden="true" /></Host>; }
}
