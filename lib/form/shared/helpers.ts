import type { Issue, ObjectIssue } from "./issues";
import { PipeOutput, pipe } from "./pipe";
import { newParseFail, newParseSuccess, newParseUnrecoverable } from "./result";
import type { Schema, Transformation, Validation } from "./types";

export function basicTransformation<Input extends {}, Output extends {}>(
	transform: (input: Input) => Output | undefined,
	validation?: (result: Output) => boolean,
	error?: (input: Input) => Issue,
): Transformation<Input, Output> {
	return (input) => {
		const result = transform(input);
		if (result === undefined || (validation && !validation(result)))
			return newParseUnrecoverable(error?.(input) ?? "Transformation failed.");
		return newParseSuccess(result);
	};
}

export function basicValidation<Input extends {}>(
	validation: (input: Input) => boolean,
	error?: (input: Input) => Issue,
): Validation<Input> {
	return (input) => {
		if (!validation(input)) return newParseFail(error?.(input) ?? "Validation failed.");
		return newParseSuccess(input);
	};
}

export function basicSchema<Output extends {}>(
	guard: (input: unknown) => Output | undefined,
	error?: (input: unknown) => Issue,
): Schema<Output> {
	return (input) => {
		const result = guard(input);
		if (result === undefined) return newParseUnrecoverable(error?.(input) ?? "Parsing failed.");
		return newParseSuccess(result);
	};
}

export const basicObjectLikeSchema =
	<ObjectType extends {}, GetterValue = unknown>(
		guard: (value: unknown) => ObjectType | undefined,
		getter: (object: ObjectType, key: string) => GetterValue | undefined,
		defaultError?: (value: unknown) => Issue,
	) =>
	<const Entries extends ObjectEntries<GetterValue>>(
		entries: Entries,
		specificError?: (value: unknown) => Issue,
	): Schema<ObjectOutput<Entries, GetterValue>> =>
	(input) => {
		const object = guard(input);
		if (object === undefined)
			return newParseUnrecoverable(
				specificError?.(input) ?? defaultError?.(input) ?? "Parsing failed.",
			);

		const issue: ObjectIssue = {
			description: "Please correct the issues below and try again.",
			entries: {},
		};

		const result = {} as ObjectOutput<Entries, GetterValue>;

		for (const [key, schema] of Object.entries(entries)) {
			const rawValue = getter(object, key);
			if (rawValue === undefined) {
				issue.entries[key] = "Missing.";
				continue;
			}

			const value = isArray(schema) ? pipe(rawValue, ...schema) : schema(rawValue);
			if (value.state !== "success") {
				issue.entries[key] = value.issue;
				continue;
			}

			result[key as keyof Entries] = value.result;
		}

		return Object.keys(issue.entries).length === 0 ? newParseSuccess(result) : newParseFail(issue);
	};

const isArray = <T, U extends readonly unknown[]>(value: Exclude<T, unknown[]> | U): value is U =>
	Array.isArray(value);

export type ObjectEntries<Input = unknown> = Readonly<
	Record<
		string,
		Transformation<Input, any> | readonly [Transformation<Input, any>, ...Transformation[]]
	>
>;

export type ObjectOutput<Entries extends ObjectEntries<Input>, Input = unknown> = {
	[K in keyof Entries]: Entries[K] extends readonly [
		Transformation<Input, any>,
		...Transformation[],
	]
		? PipeOutput<Input, Entries[K]>
		: Entries[K] extends Transformation<Input, infer Output>
		  ? Output
		  : never;
};
