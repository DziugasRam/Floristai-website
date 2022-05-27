<script lang="ts">
	import { flowers, flowersFilter, flowersLoading, user } from '../../stores';
	import Card, {
		Content,
		PrimaryAction,
		Media,
		MediaContent,
		Actions,
		ActionIcons
	} from '@smui/card';
	import LayoutGrid, { Cell } from '@smui/layout-grid';
	import Button, { Label } from '@smui/button';
	import IconButton, { Icon } from '@smui/icon-button';
	import LinearProgress from '@smui/linear-progress';
	import Slider from '@smui/slider';
	import Textfield from '@smui/textfield';
	import { login, register } from '../../api';
	import { goto } from '$app/navigation';

	let email = '';
	let password = '';

	const handleSubmit = async () => {
		try {
			await register(email, password);
            goto("profile/login");
		} catch {
			alert('Register failed. Try again.');
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
			<Label>Register</Label>
		</Button>
	</form>
</div>

<style>
</style>
