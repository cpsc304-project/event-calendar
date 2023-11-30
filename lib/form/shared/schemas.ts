import { basicObjectLikeSchema, basicSchema } from "./helpers";
import { PipeOutput, pipe } from "./pipe";
import { Schema, Transformation } from "./types";

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

const isArray = <T, U extends readonly unknown[]>(value: Exclude<T, unknown[]> | U): value is U =>
	Array.isArray(value);

type ArrayOutput<Value extends Schema<any> | readonly [Schema<any>, ...Transformation[]]> =
	Value extends readonly [Schema<any>, ...Transformation[]]
		? PipeOutput<unknown, Value>
		: Value extends Schema<infer Output>
		  ? Output
		  : never;

export const array = <Value extends Schema<any> | readonly [Schema<any>, ...Transformation[]]>(
	schema: Value,
) =>
	basicSchema(
		(value) => {
			if (!Array.isArray(value)) {
				const result = isArray<Schema<any>, readonly [Schema<any>, ...Transformation[]]>(schema)
					? pipe(value, ...schema)
					: schema(value);
				if (result.state !== "success") return undefined;
				return [result.result] as ArrayOutput<Value>[];
			}

			const results: ArrayOutput<Value>[] = [];
			for (const item of value) {
				const result = isArray<Schema<any>, readonly [Schema<any>, ...Transformation[]]>(schema)
					? pipe(item, ...schema)
					: schema(item);
				if (result.state !== "success") return undefined;
				results.push(result.result);
			}
			return results;
		},
		(value) => {
			if (!Array.isArray(value)) return `Expected an array, got ${typeof value}.`;
			for (const item of value) {
				const result = isArray<Schema<any>, readonly [Schema<any>, ...Transformation[]]>(schema)
					? pipe(item, ...schema)
					: schema(item);
				if (result.state !== "success") return result.issue;
			}
			throw new Error("Invariant: array schema failed to parse, but no issue was returned.");
		},
	);

const isStringArray = (value: unknown[]): value is string[] =>
	value.every((x) => typeof x === "string");

export const formData = basicObjectLikeSchema<FormData, string | string[]>(
	(value) => (value instanceof FormData ? value : undefined),
	(form, key) => {
		const values = form.getAll(key);
		if (values.length === 0) return undefined;
		if (!isStringArray(values)) return undefined;
		if (values.length === 1) return values[0];
		return values;
	},
	(value) => `Expected FormData, got ${typeof value}.`,
);
