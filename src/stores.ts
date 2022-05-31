import { derived, writable, type Readable } from 'svelte/store';
import { getFlowers } from './api';

export const flowersFilter = writable<FlowersFilter>({
	occasion: [],
	packaging: [],
	maxPrice: 10,
	minPrice: 0
});

export const user = writable<(User & { token: string }) | null>(typeof localStorage !== 'undefined' ? JSON.parse(localStorage.authUser ?? "{}") : null);
user.subscribe((x) => {
	if (typeof localStorage !== 'undefined') localStorage.authUser = JSON.stringify(x);
});

export const error = writable<string | undefined>(undefined);

export const shoppingCart = writable<ShoppingCart | null>(typeof localStorage !== 'undefined' ? JSON.parse(localStorage.shoppingCart ?? "[]") : null);
shoppingCart.subscribe((x) => {
	if (typeof localStorage !== 'undefined') localStorage.shoppingCart = JSON.stringify(x);
});
export const favorites = writable<Flower[] | null>(typeof localStorage !== 'undefined' ? JSON.parse(localStorage.favorites ?? "[]") : null);
favorites.subscribe((x) => {
	if (typeof localStorage !== 'undefined') localStorage.favorites = JSON.stringify(x);
});

const flowersLoadingState = {
	timeoutId: undefined as number | undefined,
	symbol: Symbol()
};
export const flowersLoading = writable<boolean>(false);
export const flowers = derived<[Readable<FlowersFilter>, Readable<User | null>], Flower[]>(
	[flowersFilter, user],
	([filter, user], set) => {
		const currentContextSymbol = Symbol();
		const currentContextTimeoutId = setTimeout(async () => {
			flowersLoading.set(true);
			let retrievedFlowers: Flower[] = [];
			try {
				retrievedFlowers = await getFlowers(filter);
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
	userId: string;
	email: string;
	type: 'Client' | 'Administrator';
};

export enum FlowerColor {
	red,
	green,
	blue
}

export type FlowersFilter = {
	occasion: string[];
	packaging: string[];
	minPrice: number;
	maxPrice: number;
};

export type Flower = {
	flowerId: number;
	name: string;
	imageUrl: string;
	price: number;
	packaging: string;
	occasion: string;
	description: string;
	quantity: number;
	version: string;
};

export type ShoppingCart = {
	items: {
		quantity: number;
		flowerId: number;
	}[];
};

export type Order = {
	orderLines: {
		flowerId: number;
		quantity: number;
	}[];
};
