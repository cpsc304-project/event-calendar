import { ComponentProps } from "react";
import { twMerge } from "tailwind-merge";

export default function Button(props: ComponentProps<"button">) {
	return (
		<button
			{...props}
			className={twMerge(
				"cursor-pointer rounded-md bg-gray-800 px-6 py-1 font-semibold text-white hover:bg-gray-900",
				props.className,
			)}
		>
			{props.children}
		</button>
	);
}
