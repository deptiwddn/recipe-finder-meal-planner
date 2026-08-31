<script lang="ts">
	import { onMount } from 'svelte';
	let { onConfirm, onCancel, title = 'Delete recipe?', description = 'This recipe will be removed permanently.' }: { onConfirm: () => void; onCancel: () => void; title?: string; description?: string } = $props();
	let dialog: HTMLDivElement;
	onMount(() => dialog.focus());
	function handleKeydown(event: KeyboardEvent): void { if (event.key === 'Escape') onCancel(); }
</script>
<div class="backdrop" role="presentation" onclick={(event) => { if (event.target === event.currentTarget) onCancel(); }}>
	<div bind:this={dialog} class="modal" role="dialog" tabindex="-1" aria-modal="true" aria-labelledby="delete-title" aria-describedby="delete-description" onkeydown={handleKeydown}>
		<h2 id="delete-title">{title}</h2><p id="delete-description">{description}</p><button onclick={onConfirm}>Delete</button><button onclick={onCancel}>Cancel</button>
	</div>
</div>
<style>.backdrop { position: fixed; inset: 0; display: grid; place-items: center; background: #0008; } .modal { max-width: 24rem; padding: 1.5rem; background: white; border-radius: .6rem; } button { margin-right: .5rem; padding: .6rem .9rem; border: 0; border-radius: .3rem; cursor: pointer; } button:first-of-type { background: #b91c1c; color: white; }</style>
