<script lang="ts">
	import Button, { Label } from '@smui/button';
	import { user } from '../../stores';

	const logout = () => {
        user.set(null);
        location.href = location.origin;
    }
</script>

<Button on:click={logout}>
	<Label>Log out</Label>
</Button>
