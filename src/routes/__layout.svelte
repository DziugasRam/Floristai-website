<script lang="ts">
	import TopAppBar, { Row, Section, Title } from '@smui/top-app-bar';
	import IconButton from '@smui/icon-button';
	import Checkbox from '@smui/checkbox';
	import '../app.css';
</script>

<header>
	<div class="top-app-bar-container flexor">
		<TopAppBar variant="static" color={'primary'}>
			<Row>
				<Section>
					<Title>Floristai</Title>
				</Section>
				<Section align="end" toolbar>
					<IconButton class="material-icons" aria-label="Profile">person</IconButton>
					<IconButton class="material-icons" aria-label="Shopping Cart">shopping_cart</IconButton>
				</Section>
			</Row>
		</TopAppBar>
	</div>
</header>

<main>
	<slot />
</main>

<footer>
</footer>

<style>
	main {
		flex: 1;
		display: flex;
		flex-direction: column;
		padding: 1rem;
		width: 100%;
		margin: 0 auto;
	}

	footer {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		padding: 40px;
	}

	@media (min-width: 480px) {
		footer {
			padding: 40px 0;
		}
	}

	.top-app-bar-container {
		width: 100%;
		background-color: var(--mdc-theme-background, #fff);

		display: inline-block;
	}

	.flexor {
		display: inline-flex;
		flex-direction: column;
	}
</style>
