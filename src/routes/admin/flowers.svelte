<script context="module" lang="ts">
	export const prerender = true;
</script>

<script lang="ts">
	import {
		flowers,
		flowersFilter,
		flowersLoading,
		shoppingCart,
		user,
		type Flower
	} from '../../stores';
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
	import { deleteFlower } from '../../api';
	import { goto } from '$app/navigation';

	const deleteFlowerById = async (flowerId: number) => {
		try {
			if ($user?.token) await deleteFlower(flowerId, $user.token);
			flowersFilter.update((v) => v);
		} catch (e: any) {
			alert(e);
		}
	};
</script>

<div class="root">
	<div class="content">
		<div class="side-content">
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
							<PrimaryAction on:click={() => goto(`/admin/flower?id=${flower.flowerId}`)}>
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
										on:click={() => deleteFlowerById(flower.flowerId)}
										title="Delete">delete_outline</IconButton
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
		display: flex;
		width: 100%;
		height: 100%;
		overflow: hidden;
		align-items: center;
		justify-content: center;
	}

	.flower-image {
		min-width: 100%;
		min-height: 100%;
		object-fit: cover;
	}
</style>
