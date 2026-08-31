import { browser } from '$app/environment';

export function saveToStorage<T>(key: string, data: T): void {
	if (!browser) return;

	try {
		window.localStorage.setItem(key, JSON.stringify(data));
	} catch {
		console.error('Could not save data.');
	}
}

export function loadFromStorage<T>(key: string): T | null {
	if (!browser) return null;

	try {
		const value = window.localStorage.getItem(key);
		return value === null ? null : (JSON.parse(value) as T);
	} catch {
		console.error('Could not load data.');
		return null;
	}
}

export function removeFromStorage(key: string): void {
	if (!browser) return;

	try {
		window.localStorage.removeItem(key);
	} catch {
		console.error('Could not remove data.');
	}
}
