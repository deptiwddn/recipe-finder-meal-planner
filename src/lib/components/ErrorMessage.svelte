<script lang="ts">let { message, onRetry }: { message: string; onRetry: () => void } = $props();</script><div role="alert"><p>{message}</p><button onclick={onRetry}>Try again</button></div>
