import { formData, minLength, minValue, string, toNumber } from "@/lib/form";

export const personForm = formData({
	name: [string(), minLength(1, () => "Please enter your name.")],
	age: [string(), toNumber(), minValue(18, () => "You must be at least 18 years old.")],
});
