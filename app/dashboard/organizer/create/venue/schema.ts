import { formData, maxLength, minLength, minValue, string, toNumber } from "@/lib/form";

export const createVenueSchema = formData({
	name: [string(), minLength(1), maxLength(100)],
	description: [string(), minLength(1)],
	seats: [string(), toNumber(), minValue(1)],
	venue_type_name: [string(), minLength(1), maxLength(100)],

	street_address: [string(), minLength(1)],
	city: [string(), minLength(1)],
	province: [string(), minLength(1)],
	postal_code: [string(), minLength(1)],
	country: [string(), minLength(1), maxLength(100)],
});
