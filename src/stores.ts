import { derived, writable, type Readable } from 'svelte/store';
import { getFlowers } from './api';

export const flowersFilter = writable<FlowersFilter>({ colors: [], maxPrice: 10, minPrice: 0 });
export const user = writable<User | undefined>(undefined);
export const error = writable<string | undefined>(undefined);
export const shoppingCart = writable<ShoppingCart | undefined>(undefined);

const flowersLoadingState = {
	timeoutId: undefined as number | undefined,
	symbol: Symbol()
};
export const flowersLoading = writable<boolean>(false);
export const flowers = derived<[Readable<FlowersFilter>, Readable<User | undefined>], Flower[]>(
	[flowersFilter, user],
	([filter, user], set) => {
		const currentContextSymbol = Symbol();
		const currentContextTimeoutId = setTimeout(async () => {
			flowersLoading.set(true);
			let retrievedFlowers: Flower[] = [];
			try {
				retrievedFlowers = await getFlowers(filter, user);
			} catch (e: any) {
				error.set(e.message);
			} finally {
				if (flowersLoadingState.symbol === currentContextSymbol) {
					set(retrievedFlowers);
					flowersLoading.set(false);
				}
			}
		}, 500) as any;

		flowersLoadingState.symbol = currentContextSymbol;
		flowersLoadingState.timeoutId = currentContextTimeoutId;
		return () => clearTimeout(currentContextTimeoutId);
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
	imageUrl: string;
	description: string;
	price: number;
	quantity: number;
	packaging: string;
	occasion: string;
};

export type ShoppingCart = {
	items: {
		quantity: number;
		flowerId: string;
	}[];
}

export type Order = {
	orderLines: {
		flowerId: number;
		quantity: number;
	}[];
}