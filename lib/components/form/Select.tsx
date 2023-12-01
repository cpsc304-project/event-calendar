import { InputArgs } from "@/lib/form/client";
import {
	ComponentPropsWithoutRef,
	ForwardedRef,
	PropsWithoutRef,
	ReactNode,
	forwardRef,
} from "react";
import { twMerge } from "tailwind-merge";

declare module "react" {
	function forwardRef<T, P = {}>(
		render: (props: P, ref: ForwardedRef<T>) => ReactNode,
	): (props: PropsWithoutRef<P> & RefAttributes<T>) => ReactNode;
}

interface Props<T> extends Omit<ComponentPropsWithoutRef<"select">, "children"> {
	args: InputArgs;
	options: T[];
	label: ReactNode;
	getName: (option: T) => string;
}

function Select<T>(
	{ className, args, options, label, getName, ...props }: Props<T>,
	ref: ForwardedRef<HTMLSelectElement>,
) {
	return (
		<div>
			<label htmlFor={props.id} className="mb-1 block font-semibold">
				{label}
			</label>
			<select
				{...props}
				{...args.props}
				ref={ref}
				required
				className={twMerge(
					"w-full rounded-md border bg-gray-50 p-1 shadow-inner",
					className,
					(args.invalid || args.error) && "border-red-400",
				)}
			>
				<option value="">Select a value</option>
				{options.map((option) => {
					const name = getName(option);
					return (
						<option key={name} value={name}>
							{name}
						</option>
					);
				})}
			</select>
			{args.error && <p>{args.error}</p>}
			{args.invalid && <p>{args.invalid}</p>}
		</div>
	);
}

export default forwardRef(Select);
