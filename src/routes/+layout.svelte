<script lang="ts">
	import { onMount } from 'svelte';
	import { page } from '$app/stores';
	import { QueryClientProvider } from '@tanstack/svelte-query';
	import favicon from '$lib/assets/favicon.svg';
	import { FAVORITES, HOME, MEAL_PLANNER, MY_RECIPES, RECIPES } from '$lib/constants/routes';
	import { queryClient } from '$lib/query/client';
	import { registerStencilComponents } from '$lib/stencil';

	let { children } = $props();
	onMount(() => { void registerStencilComponents(); });
	const navigation = [
		{ label: 'Home', href: HOME }, { label: 'Recipes', href: RECIPES },
		{ label: 'Favorites', href: FAVORITES }, { label: 'Meal Planner', href: MEAL_PLANNER },
		{ label: 'My Recipes', href: MY_RECIPES }
	] as const;
	function isActive(href: string): boolean { return href === HOME ? $page.url.pathname === href : $page.url.pathname.startsWith(href); }
</script>

<svelte:head><link rel="icon" href={favicon} /><meta name="description" content="Find recipes and plan your meals." /></svelte:head>

<QueryClientProvider client={queryClient}>
	<div class="app-shell">
		<header class="site-header">
			<a class="brand" href={HOME} aria-label="Recipe Finder home">Recipe Finder</a>
			<nav aria-label="Primary navigation">
				{#each navigation as item}
					<a href={item.href} class:active={isActive(item.href)} aria-current={isActive(item.href) ? 'page' : undefined}>{item.label}</a>
				{/each}
			</nav>
		</header>
		<main>{@render children()}</main>
	</div>
</QueryClientProvider>

<style>
	:global(*) { box-sizing: border-box; }
	:global(body) { margin: 0; min-width: 320px; color: #1f2937; background: #fffaf5; font-family: Inter, ui-sans-serif, system-ui, sans-serif; }
	.app-shell { min-height: 100vh; }
	.site-header { display: flex; align-items: center; justify-content: space-between; gap: 1rem; max-width: 72rem; margin: 0 auto; padding: 1rem 1.5rem; }
	.brand { color: #9a3412; font-size: 1.2rem; font-weight: 750; text-decoration: none; white-space: nowrap; }
	nav { display: flex; flex-wrap: wrap; justify-content: flex-end; gap: 0.25rem; }
	nav a { border-radius: 0.5rem; color: #4b5563; padding: 0.5rem 0.65rem; text-decoration: none; }
	nav a:hover, nav a.active { color: #9a3412; background: #ffedd5; }
	main { max-width: 72rem; margin: 0 auto; padding: 2.5rem 1.5rem; }
	@media (max-width: 640px) { .site-header { align-items: flex-start; flex-direction: column; } nav { justify-content: flex-start; } main { padding-top: 1.75rem; } }
</style>
