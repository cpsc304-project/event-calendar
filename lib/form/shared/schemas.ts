import { basicObjectLikeSchema, basicSchema } from "./helpers";
import { Schema } from "./types";

export const string = (): Schema<string> =>
	basicSchema(
		(input) => (typeof input === "string" ? input : undefined),
		(input) => `Expected a string, got "${input}}".`,
	);

export const number = (): Schema<number> =>
	basicSchema(
		(input) => (typeof input === "number" ? input : undefined),
		(input) => `Expected a number, got "${input}}".`,
	);

export const object = basicObjectLikeSchema(
	(value) =>
		value === null || typeof value !== "object" || Array.isArray(value) ? undefined : value,
	(object, key) => (object as Record<string, unknown>)[key],
	(value) => `Expected an object, got ${typeof value}.`,
);

export const formData = basicObjectLikeSchema(
	(value) => (value instanceof FormData ? value : undefined),
	(form, key) => {
		const value = form.get(key);
		if (typeof value === "string") return value;
		return undefined;
	},
	(value) => `Expected FormData, got ${typeof value}.`,
);
