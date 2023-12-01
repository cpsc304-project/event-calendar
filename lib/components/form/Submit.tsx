import { ComponentPropsWithoutRef, ForwardedRef, forwardRef } from "react";
import { twMerge } from "tailwind-merge";

interface Props extends ComponentPropsWithoutRef<"button"> {}

function Submit({ className, children, ...props }: Props, ref: ForwardedRef<HTMLButtonElement>) {
	return (
		<button
			{...props}
			ref={ref}
			type="submit"
			className={twMerge("rounded-md bg-slate-800 px-4 py-2 text-white", className)}
		>
			{children !== undefined ? children : "Submit"}
		</button>
	);
}

export default forwardRef(Submit);
