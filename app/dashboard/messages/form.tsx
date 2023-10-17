"use client";

import { addMessage } from "./action";
import { experimental_useFormStatus as useFormStatus } from "react-dom";
import { useRef } from "react";

function SubmitButton({ disabled }: { disabled?: boolean | undefined }) {
	const { pending } = useFormStatus();

	return (
		<input
			type="submit"
			value="Add"
			disabled={pending || disabled}
			className="mb-4 cursor-pointer rounded-md bg-gray-800 px-6 py-1 font-semibold text-white hover:bg-gray-900"
		/>
	);
}

interface Props {
	onAddMessage?: (formData: FormData) => void;
	disabled?: boolean | undefined;
}

export default function Add({ onAddMessage, disabled }: Props) {
	const form = useRef<HTMLFormElement>(null);

	return (
		<form
			ref={form}
			action={async (formData) => {
				onAddMessage?.(formData);
				form.current?.reset();
				await addMessage(formData);
			}}
		>
			<label htmlFor="title" className="mb-1 inline-block font-semibold">
				Title
			</label>
			<input
				type="text"
				id="title"
				name="title"
				required
				disabled={disabled}
				className="mb-4 w-full rounded-md border bg-gray-50 p-1 shadow-inner"
			/>
			<label htmlFor="content" className="mb-1 inline-block font-semibold">
				Content
			</label>
			<textarea
				id="content"
				name="content"
				required
				disabled={disabled}
				className="mb-4 h-24 w-full resize-none rounded-md border bg-gray-50 p-1 shadow-inner"
			/>
			<SubmitButton disabled={disabled} />
		</form>
	);
}
