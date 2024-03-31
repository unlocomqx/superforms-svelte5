import type { Actions, PageServerLoad } from './$types';
import { superValidate } from 'sveltekit-superforms';
import { z } from 'zod';
import { zod } from 'sveltekit-superforms/adapters';
import { fail } from '@sveltejs/kit';

let option_rows = [{ id: 1, label: 'A' }];

const OptionSchema = z.object({
	id: z.number(),
	label: z.string()
});

const OptionsSchema = z.object({
	options: z.array(OptionSchema)
});

export const actions = {
	create: async (event) => {
		option_rows = [...option_rows, { id: option_rows.length + 1, label: 'New' }];

		return { success: true };
	},
	save: async ({ request }) => {
		const form = await superValidate(request, zod(OptionsSchema));

		if (!form.valid) {
			return fail(400, { form });
		}

		option_rows = [...form.data.options];

		return { form };
	}
} satisfies Actions;

export const load = (async (event) => {
	console.log(option_rows);
	const form = await superValidate({ options: option_rows }, zod(OptionsSchema));

	return {
		form
	};
}) satisfies PageServerLoad;
