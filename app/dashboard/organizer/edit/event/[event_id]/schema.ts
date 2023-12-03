import {
	toNumber,
	minValue,
	toDate,
	formData,
	string,
	minLength,
	array,
	pipe,
	basicValidation,
	OutputType,
	Validation,
	Issue,
	maxValue,
	maxLength,
} from "@/lib/form";
import dayjs, { OpUnitType } from "dayjs";
import isSameOrAfter from "dayjs/plugin/isSameOrAfter";

dayjs.extend(isSameOrAfter);

const sameOrAfter = (
	date: Date,
	granularity?: OpUnitType,
	error?: (value: Date) => Issue,
): Validation<Date> =>
	basicValidation(
		(value) => dayjs(value).isSameOrAfter(date, granularity),
		(value) =>
			error?.(value) ?? `${dayjs(value).format()} (${value}) is before ${dayjs(date).format()}.`,
	);

const baseEditEventSchema = formData({
	event_id: [string(), toNumber()],
	name: [string(), minLength(1, () => "Your event must have a name.")],
	description: [string(), minLength(1, () => "Your event must have a description.")],
	ticket_count: [
		string(),
		toNumber(),
		minValue(1, () => "Your event must have at least 1 ticket."),
	],
	ticket_cost: [
		string(),
		toNumber(),
		minValue(0, () => "Your tickets can't have a negative cost."),
	],
	start_date: [
		string(),
		toDate(),
		sameOrAfter(new Date(), "day", () => "Your event can't start in the past."),
	],
	end_date: [string(), toDate()],
	category_names: [
		array(string()),
		minLength(1, () => "Your event must have at least 1 category."),
	],
});

export const editEventSchema = (input: unknown) =>
	pipe(
		input,
		baseEditEventSchema,
		basicValidation<OutputType<typeof baseEditEventSchema>>(
			(data) => dayjs(data.end_date).isSameOrAfter(data.start_date, "day"),
			() => ({
				description: "Please correct the issues below and try again.",
				entries: {
					end_date: "Your event can't end before it starts.",
				},
			}),
		),
	);

// ticket_id UUID,
// event_id INTEGER,
// discount NUMERIC(3) NOT NULL,
// promo_code TEXT NOT NULL,
// PRIMARY KEY (ticket_id, event_id),
// FOREIGN KEY (ticket_id, event_id)
// 		REFERENCES ticket(ticket_id, event_id)
// 		ON UPDATE CASCADE
// 		ON DELETE CASCADE

export const createDiscountSchema = formData({
	discount: [
		string(),
		toNumber(),
		minValue(0, () => "Discount must be a number 0-100"),
		maxValue(100, () => "Discount must be a number 0-100"),
	],
	promo_code: [
		string(),
		minLength(1, () => "Promos code must be at least 1 character long"),
		maxLength(20, () => "Promo code must be 20 characters or less."),
	],
	amountToDiscount: [
		string(),
		toNumber(),
		minValue(1, () => "Amount of tickets to add discounts to must be at least 1"),
	],
});
