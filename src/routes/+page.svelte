<script lang="ts">
	import { superForm } from 'sveltekit-superforms';
	import type { PageData } from './$types';

	let { data }: {
		data: PageData
	} = $props();

	const { form, enhance } = superForm(data.form, {
		dataType: 'json'
	});

	$inspect($form).with(console.trace);
	$inspect(data);
</script>

<form action="?/save" method="post" use:enhance>
	<input type="text" bind:value={$form.label}>
	<button type="submit">Save</button>
</form>