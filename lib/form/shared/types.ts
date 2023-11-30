import type { ParseResult } from "./result";

export type Transformation<Input = any, Output extends {} = any> = (
	input: Input,
) => ParseResult<Output>;

export type Validation<Input extends {}> = Transformation<Input, Input>;

export type Schema<Output extends {}> = Transformation<unknown, Output>;

export type InputType<T extends Transformation> = T extends Transformation<infer Input, any>
	? Input
	: never;

export type OutputType<T extends Transformation> = T extends Transformation<any, infer Output>
	? Output
	: never;
