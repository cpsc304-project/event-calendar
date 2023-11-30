import dayjs from "dayjs";
import { basicTransformation } from "./helpers";
import type { Transformation } from "./types";

export const toDate = (): Transformation<number | string, Date> =>
	basicTransformation(
		(input) => dayjs(input).toDate(),
		(date) => !isNaN(date.valueOf()),
		(input) => `"${input}" is not a valid date.`,
	);

export const toNumber = (): Transformation<string | Date, number> =>
	basicTransformation(
		(str) => +str,
		(num) => !isNaN(num),
		(str) => `"${str}" is not a valid number.`,
	);

export const toString = (): Transformation<{ toString(): string }, string> =>
	basicTransformation((input) => input.toString());
