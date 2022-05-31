<script context="module" lang="ts">
	export const prerender = true;
</script>

<script lang="ts">
	import {
		favorites,
		flowers,
		flowersFilter,
		flowersLoading,
		shoppingCart,
		type Flower
	} from '../stores';
	import Card, {
		Content,
		PrimaryAction,
		Media,
		MediaContent,
		Actions,
		ActionButtons,
		ActionIcons
	} from '@smui/card';
	import LayoutGrid, { Cell } from '@smui/layout-grid';
	import Button, { Label } from '@smui/button';
	import IconButton, { Icon } from '@smui/icon-button';
	import LinearProgress from '@smui/linear-progress';
	import Slider from '@smui/slider';
	import TextField from '@smui/textfield';

	const addToCart = (flower: Flower) => {
		shoppingCart.update((cart) => {
			if (!cart) return { items: [{ flowerId: flower.name, quantity: 1 }] };
			const cartFlower = cart.items.find((item) => item.flowerId === flower.name);
			if (!cartFlower) cart.items.push({ quantity: 1, flowerId: flower.name });
			else cartFlower.quantity++;
			return cart;
		});
	};

	const toggleFavorites = (flower: Flower) => {
		favorites.update((favorites) => {
			if (!favorites) return [flower];
			if (favorites.some((f) => f.flowerId === flower.flowerId)) {
				return favorites.filter((f) => f.flowerId !== flower.flowerId);
			} else {
				return [...favorites, flower];
			}
		});
	};
</script>

<svelte:head>
	<title>Floristai</title>
	<meta name="description" content="Floristai flower shop" />
</svelte:head>

<div class="root">
	<div>
		<h1>Title</h1>
		<p>something</p>
		<p>maybe some image</p>
		<p>filters for types of flowers (recommended, exotic, on sale, new)</p>
	</div>
	<div class="content">
		<div class="side-content">
			<div class="filter">
				<h3>Price</h3>
				<div style="display: flex">
					<TextField
						variant="outlined"
						type="number"
						bind:value={$flowersFilter.minPrice}
						label="Min"
						style="margin-right: 20px; width: 96px;"
						invalid={false}
						input$min="0"
						input$max="10"
						input$step="0.1"
					/>
					<TextField
						variant="outlined"
						type="number"
						bind:value={$flowersFilter.maxPrice}
						label="Max"
						style="width: 96px;"
						invalid={false}
						input$min="0"
						input$max="10"
						input$step="0.1"
					/>
				</div>
				<Slider
					range
					bind:start={$flowersFilter.minPrice}
					bind:end={$flowersFilter.maxPrice}
					min={0}
					max={10}
					step={0.1}
					style="margin: 0px;"
				/>
			</div>
		</div>

		<div class="main-content">
			<div class="loading-bar-wrapper">
				<div>
					{#if $flowersLoading === true}
						<LinearProgress indeterminate />
					{/if}
				</div>
			</div>
			<LayoutGrid fixedColumnWidth={true}>
				{#each $flowers as flower, i}
					<Cell span={3}>
						<Card padded={false} variant="outlined">
							<!-- open flower page/dialog on click -->
							<PrimaryAction on:click={() => undefined}>
								<Media aspectRatio="square">
									<MediaContent>
										<div class="flower-image-wrapper">
											<img
												class="flower-image"
												src={flower.imageUrl ??
													'https://m.media-amazon.com/images/I/51rYKzn7ciL.jpg'}
												alt="Flower"
											/>
										</div>
									</MediaContent>
								</Media>
								<Content>
									<div class="flower-card-text-content">
										<h2>{flower.name}</h2>
										<p>{flower.description}</p>
									</div>
								</Content>
							</PrimaryAction>
							<Actions>
								<ActionIcons>
									<IconButton
										class="material-icons"
										on:click={() => toggleFavorites(flower)}
										title="Favorite"
										>{$favorites?.some((f) => f.flowerId === flower.flowerId)
											? 'favorite'
											: 'favorite_border'}</IconButton
									>
									<IconButton
										class="material-icons"
										on:click={() => addToCart(flower)}
										title="Add to cart">shopping_cart</IconButton
									>
								</ActionIcons>
							</Actions>
						</Card>
					</Cell>
				{:else}
					{#if $flowersLoading}
						<div />
					{:else}
						<div>No flowers found</div>
					{/if}
				{/each}
			</LayoutGrid>
		</div>
		<div class="side-content" />
	</div>
</div>

<style>
	.root {
		display: flex;
		flex-direction: column;
	}

	.content {
		display: flex;
		justify-content: center;
	}

	.side-content {
		display: flex;
		flex-direction: column;
		max-width: 300px;
		width: 300px;
	}

	.loading-bar-wrapper {
		width: 100%;
		padding: 0 var(--mdc-layout-grid-margin-desktop, 24px);
	}

	.loading-bar-wrapper > div {
		position: relative;
		width: 100%;
	}

	:global(.loading-bar-wrapper > div > .mdc-linear-progress) {
		position: absolute;
	}

	.main-content {
		display: flex;
		max-width: fit-content;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		flex: 1;
	}

	.flower-card-text-content > * {
		margin: 5px 0;
	}

	.flower-image-wrapper {
		max-height: 100%;
		max-width: 100%;
		overflow: hidden;
		display: flex;
		align-items: center;
	}

	.flower-image {
		max-width: 100%;
		max-height: 100%;
	}
</style>
