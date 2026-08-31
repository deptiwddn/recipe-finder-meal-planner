<script lang="ts">
	import type { DayOfWeek } from '$lib/models/meal-plan';
	let { day, onEdit, onRemove }: { day: DayOfWeek; onEdit: () => void; onRemove: () => void } = $props();
</script>

<div class="actions">
	<button type="button" onclick={onEdit} aria-label={`Edit meal planned for ${day}`}>Edit meal</button>
	<button type="button" class="remove" onclick={onRemove} aria-label={`Remove meal planned for ${day}`}>Remove meal</button>
</div>

<style>
	.actions { display: flex; flex-wrap: wrap; gap: .5rem; margin-top: auto; } button { padding: .55rem .7rem; border: 0; border-radius: .35rem; background: #c2410c; color: white; font: inherit; font-weight: 700; cursor: pointer; } .remove { background: #b91c1c; }
</style>
