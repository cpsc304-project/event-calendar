"use client";

import { experimental_useFormStatus as useFormStatus } from "react-dom";

export default function SubmitButton() {
	const { pending } = useFormStatus();

	return (
		<input
			type="submit"
			value="Add"
			disabled={pending}
			className={`min-w-8 rounded px-8 py-2 ${pending ? "bg-slate-700" : "bg-slate-500"}`}
		/>
	);
}
