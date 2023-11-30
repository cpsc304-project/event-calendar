import { ComponentProps } from "react";
import { twMerge } from "tailwind-merge";

export default function Button({
	fill,
	className,
	children,
	...props
}: ComponentProps<"button"> & { fill?: boolean }) {
	return (
		<button
			{...props}
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
