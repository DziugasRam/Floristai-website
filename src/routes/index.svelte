<script context="module" lang="ts">
	export const prerender = true;
</script>

<script lang="ts">
	import { flowers } from '../stores';
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
</script>

<svelte:head>
	<title>Floristai</title>
	<meta name="description" content="Floristai flower shop" />
</svelte:head>

<section>
	<LayoutGrid>
		{#each $flowers as flower, i}
			<Cell>
				<Card padded={false} variant="outlined" style="min-width: 300px">
					<!-- open flower page/dialog on click -->
					<PrimaryAction on:click={() => undefined}> 
						<Media aspectRatio="square">
							<MediaContent>
								<div class="flower-image-wrapper">
									<img
										class="flower-image"
										src={flower.imgUrl ?? 'https://m.media-amazon.com/images/I/51rYKzn7ciL.jpg'}
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
							<IconButton class="material-icons" on:click={() => undefined} title="Share"
								>shopping_cart</IconButton
							>
						</ActionIcons>
					</Actions>
				</Card>
			</Cell>
		{/each}
	</LayoutGrid>
</section>

<style>
	section {
		display: flex;
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
