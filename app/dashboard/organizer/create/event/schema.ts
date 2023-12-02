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

const baseCreateEventSchema = formData({
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
	venue_id: [string(), toNumber()],
});

export const createEventSchema = (input: unknown) =>
	pipe(
		input,
		baseCreateEventSchema,
		basicValidation<OutputType<typeof baseCreateEventSchema>>(
			(data) => dayjs(data.end_date).isSameOrAfter(data.start_date, "day"),
			() => ({
				description: "Please correct the issues below and try again.",
				entries: {
					end_date: "Your event can't end before it starts.",
				},
			}),
		),
	);
