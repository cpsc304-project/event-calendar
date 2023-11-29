"use server";

import { Action, formAction } from "@/lib/form/server";
import { personForm } from "./schema";

export const action: Action<void> = async (state, formData) => {
	return formAction(personForm, formData, async ({ name, age }) => {
		console.log(name, age);
	});
};
