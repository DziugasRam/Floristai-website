import type { Flower, FlowersFilter, User } from './stores';

const BASE_URL = 'https://localhost:7155/';

export const getFlowers = async (filter: FlowersFilter, user: User | undefined) => {
	const result = await fetch(
		`${BASE_URL}flower/filter?$filter=Price ge ${filter.minPrice} and Price le ${filter.maxPrice}`,
		{
			method: 'GET',
			headers: {
				Accept: 'application/json',
				...(user && user.token ? { Authorization: `Bearer ${user.token}` } : {})
			}
		}
	);
	return (await result.json()) as Flower[];
};

export const login = async (email: string, password: string) => {
	const result = await fetch(`${BASE_URL}user/login`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify({ email, password })
	});

	if (!result.ok) throw new Error(`Login attempt failed with status code: ${result.status}`);
};

export const register = async (email: string, password: string) => {
	const result = await fetch(`${BASE_URL}user/register`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify({ email, password })
	});

	if (!result.ok) throw new Error(`Login attempt failed with status code: ${result.status}`);

	return await result.text();
};
