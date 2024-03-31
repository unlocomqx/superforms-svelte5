import type { Actions, PageServerLoad } from './$types';
import { superValidate } from 'sveltekit-superforms';
import { z } from 'zod';
import { zod } from 'sveltekit-superforms/adapters';
import { fail } from '@sveltejs/kit';

let option_label = 'My label';

const OptionSchema = z.object({
	label: z.string()
});

export const actions = {
	save: async ({ request }) => {
		const form = await superValidate(request, zod(OptionSchema));

		if (!form.valid) {
			return fail(400, { form });
		}

		option_label = form.data.label;

		return { form };
	}
} satisfies Actions;

export const load = (async (event) => {
	const form = await superValidate({ label: option_label }, zod(OptionSchema));

	return {
		form
	};
}) satisfies PageServerLoad;
