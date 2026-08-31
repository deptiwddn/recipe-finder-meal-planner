import { Component, Event, EventEmitter, Host, Prop } from '@stencil/core';

@Component({ tag: 'search-bar', styleUrl: 'search-bar.css', shadow: true })
export class SearchBar {
  @Prop() placeholder = 'Search recipes';
  @Prop({ mutable: true }) value = '';
  @Event() searchChanged!: EventEmitter<string>;
  @Event() searchSubmitted!: EventEmitter<string>;

  private change = (event: Event) => { this.value = (event.target as HTMLInputElement).value; this.searchChanged.emit(this.value); };
  private submit = (event: Event) => { event.preventDefault(); this.searchSubmitted.emit(this.value.trim()); };

  render() { return <Host><form onSubmit={this.submit} role="search"><label htmlFor="search-input">Search recipes</label><div class="field"><input id="search-input" type="search" placeholder={this.placeholder} value={this.value} onInput={this.change} /><button type="submit" aria-label="Submit recipe search">Search</button></div></form></Host>; }
}
