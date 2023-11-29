import { newParseSuccess, type ParseResult } from "./result";
import type { Transformation } from "./types";

type Cast<T, Expected> = T extends Expected ? T : never;

// https://github.com/Microsoft/TypeScript/issues/27024#issuecomment-421529650
type Equals<X, Y> = (<T>() => T extends X ? 1 : 2) extends <T>() => T extends Y ? 1 : 2
	? true
	: false;

declare const InvalidPipeDiscriminator: unique symbol;
type InvalidPipe<Reason extends string = string, Details = never> = {
	reason: Reason;
	details: Details;
} & { _type: typeof InvalidPipeDiscriminator };

export type PipeOutput<Input, TPipe extends readonly Transformation[]> = TPipe extends readonly [
	infer X,
	...infer XS,
]
	? X extends Transformation<infer InputShape, infer Output>
		? Input extends InputShape
			? PipeOutput<
					Equals<InputShape, Output> extends true ? Input : Output,
					Cast<XS, readonly Transformation[]>
			  >
			: InvalidPipe<
					"Inconsistent types in pipe",
					{
						input: Input;
						expected: InputShape;
						at: X;
					}
			  >
		: never
	: Input;

export function pipe<Input, const Pipe extends readonly Transformation[]>(
	input: Input,
	...transforms: Pipe
): ParseResult<PipeOutput<Input, Pipe>> {
	if (transforms.length === 0) {
		return newParseSuccess(input) as ParseResult<PipeOutput<Input, Pipe>>;
	} else {
		const [transform, ...rest] = transforms;
		const result = transform(input);
		if (result.state !== "success") return result as ParseResult<PipeOutput<Input, Pipe>>;
		return pipe(result.result, ...rest) as ParseResult<PipeOutput<Input, Pipe>>;
	}
}
