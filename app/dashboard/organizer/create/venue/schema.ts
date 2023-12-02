import { formData, minLength, minValue, string, toNumber } from "@/lib/form";

export const createVenueSchema = formData({
	name: [string(), minLength(1)],
	description: [string(), minLength(50)],
	seats: [string(), toNumber(), minValue(1)],
	venue_type_name: [string(), minLength(1)],

	street_address: string(),
	city: string(),
	province: string(),
	postal_code: string(),
	country: string(),
});
