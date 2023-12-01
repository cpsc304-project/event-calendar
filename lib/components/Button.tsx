import { ComponentPropsWithoutRef, ForwardedRef, forwardRef } from "react";
import { twMerge } from "tailwind-merge";

interface Props extends ComponentPropsWithoutRef<"button"> {
	fill?: boolean | undefined;
}

function Button(
	{ fill, className, children, ...props }: Props,
	ref: ForwardedRef<HTMLButtonElement>,
) {
	return (
		<button
			{...props}
			ref={ref}
			className={twMerge(
				"cursor-pointer rounded-md px-6 py-1 font-semibold",
				fill ? "bg-gray-800 text-white hover:bg-gray-900" : "border hover:bg-gray-50",
				className,
			)}
		>
			{children}
		</button>
	);
}

export default forwardRef(Button);
