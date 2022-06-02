<script lang="ts">
	import { flowers, shoppingCart, user } from '../../stores';
	import List, { Item, Separator, Text } from '@smui/list';
	import Button, { Label } from '@smui/button';
	import IconButton, { Icon } from '@smui/icon-button';
	import { createOrder } from '../../api';
	import { goto } from '$app/navigation';
	import TextField from '@smui/textfield';

	$: shoppingCartFlowers = $shoppingCart?.orderLines.map((orderLine) => ({
		flower: $flowers.find((flower) => orderLine.flowerId === flower.flowerId),
		quantity: orderLine.quantity
	}));
	const removeFlowerQuantity = (flowerId: number | undefined) => {
		shoppingCart.update((cart) => {
			if (!cart) return null;
			const cartItemIndex = cart.orderLines.findIndex(
				(orderLine) => orderLine.flowerId === flowerId
			);
			if (cartItemIndex === -1) return cart;
			const cartItem = cart.orderLines[cartItemIndex];

			if (cartItem.quantity <= 1) cart?.orderLines.splice(cartItemIndex, 1);
			else cartItem.quantity--;
			return { ...cart };
		});
	};
	const addFlowerQuantity = (flowerId: number | undefined) => {
		shoppingCart.update((cart) => {
			if (!cart) return null;
			const cartItemIndex = cart.orderLines.findIndex(
				(orderLine) => orderLine.flowerId === flowerId
			);
			const flower = $flowers.find((f) => f.flowerId === flowerId);
			if (cartItemIndex === -1 || !flower) return cart;
			const cartItem = cart.orderLines[cartItemIndex];

			if (flower.quantity <= cartItem.quantity) {
				alert('Maximum quantity reached');
			} else {
				cartItem.quantity++;
			}
			return cart;
		});
	};
	const order = async () => {
		if (!$user?.token) {
			goto('/profile');
			return;
		}
		if (!$shoppingCart?.orderLines.length) {
			alert('Shopping cart is empty');
			return;
		}
		if (!$shoppingCart?.deliveryAddress) {
			alert('Enter a delivery address');
			return;
		}
		try {
			await createOrder($shoppingCart, $user.token);
			shoppingCart.update((c) => ({ ...c, orderLines: [] } as any));
			goto('/');
		} catch (e: any) {
			alert(e.message);
		}
	};
</script>

<div style="display: flex; align-items: center; justify-content: center; height: 100%; width: 100%">
	<div style="display: flex; flex-direction: column; width: 650px;">
		<List>
			{#each shoppingCartFlowers ?? [] as item}
				<Item style="display: flex; height: 75px; margin: 15px">
					<div
						style="display: flex; height: 75px; width: 75px; overflow: hidden; justify-content: center;"
					>
						<img
							style="min-height: 100%; object-fit: cover; min-width: 100%;"
							src={item?.flower?.imageUrl ?? 'https://m.media-amazon.com/images/I/51rYKzn7ciL.jpg'}
							alt="Flower"
						/>
					</div>
					<div style="display: flex; flex-direction: column; padding: 10px">
						<Text style="padding: 5px">{item?.flower?.name}</Text>
						<Text style="padding: 5px">{item?.flower?.price} €</Text>
					</div>
					<IconButton style="margin-left: auto; color: inherit" disabled
						>{item?.quantity}</IconButton
					>
					<IconButton
						class="material-icons"
						on:click={() => addFlowerQuantity(item?.flower?.flowerId)}
						title="Add">add</IconButton
					>
					<IconButton
						class="material-icons"
						on:click={() => removeFlowerQuantity(item?.flower?.flowerId)}
						title="Remove">remove</IconButton
					>
				</Item>
			{/each}
		</List>
		{#if $shoppingCart}
			<Text style="margin-left: auto">
				Total price: {shoppingCartFlowers?.reduce(
					(acc, curr) => acc + curr.quantity * (curr.flower?.price ?? 0),
					0
				)} €
			</Text>
			<TextField
				variant="outlined"
				bind:value={$shoppingCart.deliveryAddress}
				label="Delivery address"
				placeholder="Delivery address"
				style="margin-top: 15px"
			/>
			<Button on:click={order}>
				<Label>Order</Label>
			</Button>
		{/if}
	</div>
</div>
