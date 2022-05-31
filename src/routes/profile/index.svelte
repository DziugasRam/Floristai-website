<script lang="ts">
	import Button, { Label } from '@smui/button';
	import { goto } from '$app/navigation';
	import { user } from '../../stores';

	user.subscribe((u) => {
		if (u?.type === 'Administrator') goto('/admin');
		if (u?.type === 'Client') goto('/profile/logout');
	});
</script>

<Button href="profile/login">
	<Label>Log in</Label>
</Button>

<Button href="profile/register">
	<Label>Register</Label>
</Button>
