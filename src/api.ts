import type { Flower, FlowersFilter, ShoppingCart, User } from './stores';

const BASE_URL = 'https://localhost:7155/';

export const getFlower = async (id: string) => {
	let url = `${BASE_URL}flower?$filter=FlowerId eq ${id}`;

	const result = await fetch(url, {
		method: 'GET',
		headers: {
			Accept: 'application/json'
		}
	});
	return (await result.json())[0] as Flower;
};

export const getFlowers = async (filter: FlowersFilter) => {
	let url = `${BASE_URL}flower?$filter=Price ge ${filter.minPrice} and Price le ${filter.maxPrice}`;

	if (filter.occasion.length > 0)
		url += ` and Occasion in (${filter.occasion.map((o) => `'${o}'`).join(',')})`;
	if (filter.packaging.length > 0)
		url += ` and Packaging in (${filter.packaging.map((p) => `'${p}'`).join(',')})`;

	const result = await fetch(url, {
		method: 'GET',
		headers: {
			Accept: 'application/json'
		}
	});
	return (await result.json()) as Flower[];
};

export const getCurrentUser = async (token: string) => {
	const result = await fetch(`${BASE_URL}user/current`, {
		method: 'GET',
		headers: {
			Authorization: `Bearer ${token}`
		}
	});

	if (!result.ok) throw new Error(`Get user failed with status code: ${result.status}`);

	return (await result.json()) as User;
};

export const login = async (email: string, password: string) => {
	const result = await fetch(`${BASE_URL}user/login`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify({ email, password })
	});

	if (!result.ok) throw new Error(`Login failed with status code: ${result.status}`);
	return await result.text();
};

export const register = async (email: string, password: string) => {
	const result = await fetch(`${BASE_URL}user/register`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify({ email, password })
	});

	if (!result.ok) throw new Error(`Register failed with status code: ${result.status}`);
};

export const createFlower = async (flower: Flower, token: string) => {
	const result = await fetch(`${BASE_URL}flower`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
			Authorization: `Bearer ${token}`
		},
		body: JSON.stringify(flower)
	});

	if (!result.ok) throw new Error(`Create flower failed with status code: ${result.status}`);

	return await result.json();
};

export const updateFlower = async (flower: Flower, token: string) => {
	const result = await fetch(`${BASE_URL}flower`, {
		method: 'PUT',
		headers: {
			'Content-Type': 'application/json',
			Authorization: `Bearer ${token}`
		},
		body: JSON.stringify(flower)
	});

	if (!result.ok) {
		if (result.status === 409)
			throw new Error(`Flower was updated in another page. Refresh the page and try again.`);
		throw new Error(`Update flower failed with status code: ${result.status}`);
	}

	return await result.json();
};

export const deleteFlower = async (flowerId: number, token: string) => {
	const result = await fetch(`${BASE_URL}flower`, {
		method: 'DELETE',
		headers: {
			'Content-Type': 'application/json',
			Authorization: `Bearer ${token}`
		},
		body: flowerId + ''
	});

	if (!result.ok) throw new Error(`Delete flower failed with status code: ${result.status}`);
};

export const createOrder = async (shoppingCart: ShoppingCart, token: string) => {
	const result = await fetch(`${BASE_URL}order`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
			Authorization: `Bearer ${token}`
		},
		body: JSON.stringify(shoppingCart)
	});
	if (!result.ok) {
		if (result.status === 409) throw new Error(`Not enough flowers left`);
		throw new Error(`Order failed with status code: ${result.status}`);
	}
};
