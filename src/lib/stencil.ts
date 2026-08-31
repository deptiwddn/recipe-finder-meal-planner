/** Registers the published Stencil custom elements in the browser. */
export async function registerStencilComponents(): Promise<void> {
	const { defineCustomElements } = await import('@recipe-planner/components/loader');
	await defineCustomElements(window);
}
