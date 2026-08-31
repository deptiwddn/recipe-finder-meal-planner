<script lang="ts">let { onCancel, saveText = 'Save recipe' }: { onCancel: () => void; saveText?: string } = $props();</script>
<div><button type="submit">{saveText}</button><button type="button" onclick={onCancel}>Cancel</button></div>
<style>div { display: flex; gap: .75rem; margin-top: 1rem; } button { padding: .7rem 1rem; border: 0; border-radius: .4rem; cursor: pointer; background: #c2410c; color: white; } button:last-child { background: #6b7280; }</style>
