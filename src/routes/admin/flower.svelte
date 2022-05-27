<script lang="ts">
	import { flowers, shoppingCart } from '../../stores';
	import type { Flower } from '../../stores';
	import List, { Item, Separator, Text } from '@smui/list';
	import Textfield from '@smui/textfield';
	import Button, { Label } from '@smui/button';
	import { createFlower } from '../../api';
	import { goto } from '$app/navigation';

	let flower: Flower = {
		name: 'string',
		imageUrl: 'string',
		description: 'string',
		price: 5.2,
		quantity: 15,
		packaging: 'pot',
		occasion: 'funeral'
	};

	const handleSubmit = async () => {
		try {
			await createFlower(flower);
			goto('admin/flowers');
		} catch {
			alert('Failed to create flower');
		}
	};
</script>

<div style="display: flex; justify-content: center; align-items: center">
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
			<Label>Create</Label>
		</Button>
	</form>
</div>
