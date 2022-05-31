<script lang="ts">
	import { flowers, shoppingCart } from '../../stores';
	import List, { Item, Separator, Text } from '@smui/list';
	import Button, { Label } from '@smui/button';

	const order = () => {};
	$: shoppingCartFlowers = $shoppingCart?.items.map((item) => ({
		flower: $flowers.find((flower) => item.flowerId === flower.flowerId),
		quantity: item.quantity
	}));
	const removeFlowerQuantity = (flowerId: number | undefined) => {
		shoppingCart.update((cart) => {
			if (!cart) return null;
			const cartItemIndex = cart.items.findIndex((item) => item.flowerId === flowerId);
			if (cartItemIndex === -1) return cart;
			const cartItem = cart.items[cartItemIndex];

			if (cartItem.quantity <= 1) cart?.items.splice(cartItemIndex, 1);
			else cartItem.quantity--;
			return { ...cart };
		});
	};
	const addFlowerQuantity = (flowerId: number | undefined) => {
		shoppingCart.update((cart) => {
			if (!cart) return null;
			const cartItemIndex = cart.items.findIndex((item) => item.flowerId === flowerId);
			if (cartItemIndex === -1) return cart;
			const cartItem = cart.items[cartItemIndex];

			cartItem.quantity++;
			return cart;
		});
	};
</script>

<div style="display: flex; align-items: center; justify-content: center; height: 100%; width: 100%">
	<div style="display: flex; flex-direction: column; width: 650px;">
		<List>
			{#each shoppingCartFlowers ?? [] as item}
				<Item style="display: flex; height: 75px">
					<div style="display: flex; height: 75px; width: 75px; overflow: hidden; justify-content: center;">
						<img
							src={item?.flower?.imageUrl ?? 'https://m.media-amazon.com/images/I/51rYKzn7ciL.jpg'}
							alt="Flower"
						/>
					</div>
					<Text>{item?.flower?.name}</Text>
					<Text>{item?.quantity}</Text>
					<Button style="margin-left: auto" on:click={() => addFlowerQuantity(item?.flower?.flowerId)}>
						<Label>Add</Label>
					</Button>
					<Button on:click={() => removeFlowerQuantity(item?.flower?.flowerId)}>
						<Label>Remove</Label>
					</Button>
				</Item>
			{/each}
		</List>
		<Button on:click={order}>
			<Label>Buy</Label>
		</Button>
	</div>
</div>
