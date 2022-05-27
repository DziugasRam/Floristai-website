<script lang="ts">
	import { flowers, flowersFilter, flowersLoading, user } from '../../stores';
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
	import Textfield from '@smui/textfield';
	import { login } from '../../api';
	import { goto } from '$app/navigation';

	let email = '';
	let password = '';

	const handleSubmit = async () => {
		try {
			const token = await login(email, password);
			user.set({
				token
			});
			goto("/");
		} catch {
			alert('Login failed. Try again.');
		}
	};
</script>

<div style="display: flex; justify-content: center; align-items: center">
	<form
		style="display: flex; flex-direction: column; justify-content: center; align-items: center"
		on:submit|preventDefault={handleSubmit}
	>
		<Textfield bind:value={email} label="Email" />
		<Textfield bind:value={password} label="Password" />
		<Button type="submit">
			<Label>Log in</Label>
		</Button>
	</form>
</div>

<style>
</style>
