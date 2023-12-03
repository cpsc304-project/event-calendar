import { basicValidation } from "./helpers";
import { Issue } from "./issues";
import type { Validation } from "./types";

export const minLength = (
	n: number,
	error?: (input: { length: number }) => Issue,
): Validation<{ length: number }> =>
	basicValidation(
		(input) => input.length >= n,
		(input) => error?.(input) ?? `Input is too short, ${input.length} < ${n}.`,
	);

export const maxLength = (
	n: number,
	error?: (input: { length: number }) => Issue,
): Validation<{ length: number }> =>
	basicValidation(
		(input) => input.length <= n,
		(input) => error?.(input) ?? `Input is too long, ${input.length} > ${n}.`,
	);

export const minValue = (n: number, error?: (input: number) => Issue): Validation<number> =>
	basicValidation(
		(num) => num >= n,
		(num) => error?.(num) ?? `Value is too low, ${num} < ${n}.`,
	);

export const maxValue = (n: number, error?: (input: number) => Issue): Validation<number> =>
	basicValidation(
		(num) => num <= n,
		(num) => error?.(num) ?? `Value is too high, ${num} > ${n}.`,
	);
