<script lang="ts">
	import { flowers, shoppingCart } from '../../stores';
	import List, { Item, Separator, Text } from '@smui/list';
	import Button, { Label } from '@smui/button';

	const order = () => {};
	$: shoppingCartFlowers = $shoppingCart?.items.map((item) =>
		({flower: $flowers.find((flower) => item.flowerId.toString() === flower.name), quantity: item.quantity})
	);
	const removeFlowerQuanity = (flowerId: string | undefined) => {
		shoppingCart.update((cart) => {
			if (!cart) return;
			const cartItemIndex = cart.items.findIndex((item) => item.flowerId === flowerId);
			if (cartItemIndex === -1) return cart;
			const cartItem = cart.items[cartItemIndex];

			if (cartItem.quantity <= 1) cart?.items.splice(cartItemIndex, 1);
			else cartItem.quantity--;
			return {...cart};
		});
	};
	const addFlowerQuanity = (flowerId: string | undefined) => {
		shoppingCart.update((cart) => {
			if (!cart) return;
			const cartItemIndex = cart.items.findIndex((item) => item.flowerId === flowerId);
			if (cartItemIndex === -1) return cart;
			const cartItem = cart.items[cartItemIndex];

			cartItem.quantity++;
			return cart;
		});
	};
</script>

<div style="display: flex; align-items: center; justify-content: center; height: 100%; width: 100%">
	<div style="display: flex; flex-direction: column; width: 500px;">
		<List>
			{#each shoppingCartFlowers ?? [] as item}
				<Item>
					<Text>{item?.flower?.imageUrl}</Text>
					<Text>{item?.flower?.name}</Text>
					<Text>{item?.quantity}</Text>
					<Button on:click={() => addFlowerQuanity(item?.flower?.name)}>
						<Label>Add</Label>
					</Button>
					<Button on:click={() => removeFlowerQuanity(item?.flower?.name)}>
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
