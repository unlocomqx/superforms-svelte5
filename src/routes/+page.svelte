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
	<table>
		<thead>
		<tr>
			<th>Label</th>
		</tr>
		</thead>
		<tbody>
		{#each $form.options as option, index (option.id)}
			<tr>
				<td>
					<input name="label" type="text" bind:value="{$form.options[index].label}">
				</td>
			</tr>
		{/each}
		</tbody>
	</table>
	<button type="submit">Save</button>
</form>

<hr>

<form action="?/create" method="post">
	<button type="submit">Add</button>
</form>