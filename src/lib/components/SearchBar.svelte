<script lang="ts">
  let { onSearch, onClear }: { onSearch: (value: string) => void; onClear: () => void } = $props();
  let value = $state('');
  function change(event: CustomEvent<string>): void { value = event.detail; }
  function submit(event: CustomEvent<string>): void { value = event.detail; onSearch(event.detail); }
</script>

<div class="search-controls">
  <search-bar placeholder="Try chicken curry" value={value} onsearchChanged={change} onsearchSubmitted={submit}></search-bar>
  <app-button variant="secondary" role="button" tabindex="0" onclick={onClear} onkeydown={(event: KeyboardEvent) => event.key === 'Enter' && onClear()}>Clear</app-button>
</div>

<style>.search-controls { display: flex; align-items: end; gap: .75rem; flex-wrap: wrap; } search-bar { flex: 1; min-width: 14rem; }</style>
