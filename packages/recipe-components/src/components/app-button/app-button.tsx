import { Component, Host, Prop } from '@stencil/core';

export type ButtonVariant = 'primary' | 'secondary' | 'danger';

@Component({ tag: 'app-button', styleUrl: 'app-button.css', shadow: true })
export class AppButton {
  @Prop() variant: ButtonVariant = 'primary';
  @Prop() disabled = false;
  @Prop() loading = false;
  render() { return <Host><button class={this.variant} type="button" disabled={this.disabled || this.loading} aria-busy={this.loading}><span class={{ 'button-content': true, hidden: this.loading }}><slot /></span>{this.loading && <span class="loading-label">Loading…</span>}</button></Host>; }
}
