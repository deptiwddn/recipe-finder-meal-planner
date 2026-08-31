export function debounce(callback: () => void, delay = 500): () => void {
	let timer: ReturnType<typeof setTimeout>;

	return () => {
		clearTimeout(timer);
		timer = setTimeout(callback, delay);
	};
}
