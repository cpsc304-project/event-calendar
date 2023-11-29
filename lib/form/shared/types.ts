import type { ParseResult } from "./result";

export type Transformation<Input = any, Output extends {} = any> = (
	input: Input,
) => ParseResult<Output>;

export type Validation<Input extends {}> = Transformation<Input, Input>;

export type Schema<Output extends {}> = Transformation<unknown, Output>;
