<script lang="ts">
	import { flowers, shoppingCart, user } from '../../stores';
	import type { Flower } from '../../stores';
	import List, { Item, Separator, Text } from '@smui/list';
	import Textfield from '@smui/textfield';
	import Button, { Label } from '@smui/button';
	import { createFlower, getFlower, getFlowers, updateFlower } from '../../api';
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';
	const flowerId = $page.url.searchParams.get('id');

	let flower: Flower | 'loading' = 'loading';
	if (flowerId) {
		getFlower(flowerId)
			.then((f) => (flower = f))
			.catch(() => typeof localStorage !== 'undefined' ? alert('failed to fetch flower') : undefined);
	} else {
		flower = {
			name: 'string',
			imageUrl: 'string',
			description: 'string',
			price: 5.2,
			quantity: 15,
			packaging: 'pot',
			occasion: 'funeral',
			version: ''
		} as Flower;
	}
	const handleSubmit = async () => {
		try {
			if(flower === "loading" || !$user?.token) return;
			if(flowerId)
				await updateFlower(flower, $user.token);
			else
				await createFlower(flower, $user.token);

			goto('/admin/flowers');
		} catch (e: any) {
			alert(e.message);
		}
	};
</script>

<div style="display: flex; justify-content: center; align-items: center">
	{#if flower === 'loading'}
		<div>Loading</div>
	{:else}
		<form
			style="display: flex; flex-direction: column; justify-content: center; align-items: center"
			on:submit|preventDefault={handleSubmit}
		>
			<Textfield bind:value={flower.name} label="Name" />
			<Textfield bind:value={flower.description} label="Description" />
			<Textfield bind:value={flower.imageUrl} label="ImageUrl" />
			<Textfield bind:value={flower.occasion} label="Occasion" />
			<Textfield bind:value={flower.packaging} label="Packaging" />
			<Textfield
				bind:value={flower.price}
				type="number"
				input$min="0"
				input$step="0.01"
				label="Price"
			/>
			<Textfield
				bind:value={flower.quantity}
				type="number"
				input$min="0"
				input$step="1"
				label="Quantity"
			/>
			<Button type="submit">
				<Label>{flowerId ? "Update" : "Create"}</Label>
			</Button>
		</form>
	{/if}
</div>
