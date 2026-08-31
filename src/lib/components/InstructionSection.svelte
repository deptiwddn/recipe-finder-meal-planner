<script lang="ts">let { instructions }: { instructions: string } = $props();</script>
<h2>Instructions</h2><p class="instructions">{instructions || 'No instructions available.'}</p><style>.instructions { white-space: pre-line; line-height: 1.7; }</style>
