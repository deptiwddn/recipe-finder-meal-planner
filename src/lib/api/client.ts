import { PUBLIC_API_BASE_URL } from '$env/static/public';

export async function getData<T>(path: string, signal?: AbortSignal): Promise<T> {
	const response = await fetch(`${PUBLIC_API_BASE_URL}${path}`, { signal });

	if (!response.ok) {
		throw new Error(`Recipe service has following error: ${response.status}`);
	}

	return response.json() as Promise<T>;
}
