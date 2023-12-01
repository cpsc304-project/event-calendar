import { InputArgs } from "@/lib/form/client";
import { ComponentPropsWithoutRef, ForwardedRef, forwardRef } from "react";
import { twMerge } from "tailwind-merge";

interface Props extends ComponentPropsWithoutRef<"input"> {
	args: InputArgs;
}

function NumberField(
	{ children, className, args, ...props }: Props,
	ref: ForwardedRef<HTMLInputElement>,
) {
	return (
		<div>
			<label htmlFor={props.id} className="mb-1 block font-semibold">
				{children}
			</label>
			<input
				{...props}
				{...args.props}
				ref={ref}
				type="number"
				required
				className={twMerge(
					"w-full rounded-md border bg-gray-50 p-1 shadow-inner",
					className,
					(args.invalid || args.error) && "border-red-400",
				)}
			/>
			{args.error && <p>{args.error}</p>}
			{args.invalid && <p>{args.invalid}</p>}
		</div>
	);
}

export default forwardRef(NumberField);
