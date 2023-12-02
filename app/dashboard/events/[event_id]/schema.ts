import { formData, maxValue, minLength, minValue, number, string, toNumber } from "@/lib/form";

export const createReviewSchema = formData({
	reviewText: [string(), minLength(1)],
	rating: [string(), toNumber(), minValue(1), maxValue(5)],
});
