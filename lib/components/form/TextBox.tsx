import { InputArgs } from "@/lib/form/client";
import { ComponentPropsWithoutRef, ForwardedRef, forwardRef } from "react";
import { twMerge } from "tailwind-merge";

interface Props extends ComponentPropsWithoutRef<"textarea"> {
	args: InputArgs;
}

function TextBox(
	{ children, className, args, ...props }: Props,
	ref: ForwardedRef<HTMLTextAreaElement>,
) {
	return (
		<div>
			<label htmlFor={props.id} className="mb-1 block font-semibold">
				{children}
			</label>
			<textarea
				{...props}
				{...args.props}
				ref={ref}
				required
				className={twMerge(
					"h-24 w-full resize-none rounded-md border bg-gray-50 p-1 shadow-inner",
					className,
					(args.invalid || args.error) && "border-red-400",
				)}
			/>
			{args.error && <p>{args.error}</p>}
			{args.invalid && <p>{args.invalid}</p>}
		</div>
	);
}

export default forwardRef(TextBox);
