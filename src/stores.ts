import { derived, writable, type Readable } from 'svelte/store';
import { getFlowers } from './api';

export const flowersFilter = writable<FlowersFilter>({ colors: [], maxPrice: 1000, minPrice: 0 });
export const user = writable<User | undefined>(undefined);
export const error = writable<string | undefined>(undefined);
export const flowers = derived<[Readable<FlowersFilter>, Readable<User | undefined>], Flower[]>(
	[flowersFilter, user],
	([filter, user], set) => {
		if (filter) {
			getFlowers(filter, user)
				.then(set)
				.catch((e) => {
					error.set(e.message);
					set([]);
				});
		}
	},
	[]
);

export type User = {
	token: string;
};

export enum FlowerColor {
	red,
	green,
	blue
}

export type FlowersFilter = {
	colors: FlowerColor[];
	minPrice: number;
	maxPrice: number;
};

export type Flower = {
	name: string;
	description: string;
	price: number;
	imgUrl: string;
	leftInStock: number;
};
