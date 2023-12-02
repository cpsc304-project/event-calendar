"use server";

import { Action } from "@/lib/form";
import { FormError, formAction } from "@/lib/form/server";
import { createVenueSchema } from "./schema";
import { db } from "@/lib/db";
import { VenueWithArea } from "@/lib/schema";

export const createVenueAction: Action<VenueWithArea> = async (state, formData) => {
	return formAction(createVenueSchema, formData, async (data) => {
		// TODO: Don't separate street number and name, just use street_address
		const { street_address, postal_code, ...rest } = data;

		const street_number = Number(street_address.split(" ")[0]);
		const street_name = street_address.split(" ").slice(1).join(" ");

		let normalizedPostalCode: string;
		if (postal_code.length === 6) {
			normalizedPostalCode = postal_code;
		} else if (postal_code.length === 7) {
			normalizedPostalCode = postal_code.replace(" ", "");
		} else {
			throw new FormError("A postal code must be 6 or 7 characters long.", "postal_code");
		}

		const venue = await db.venues.createWithArea({
			...rest,
			street_number,
			street_name,
			postal_code: normalizedPostalCode,
		});

		// TODO: add caching to db.venues.getAll and revalidateTag here

		return venue;
	});
};
