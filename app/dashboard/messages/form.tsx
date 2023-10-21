"use client";

import { AddMessageState, addMessage } from "./action";
import {
	experimental_useFormState as useFormState,
	experimental_useFormStatus as useFormStatus,
} from "react-dom";
import { useRef } from "react";

function SubmitButton({ disabled }: { disabled?: boolean | undefined }) {
	const { pending } = useFormStatus();

	return (
		<input
			type="submit"
			value="Add"
			disabled={pending || disabled}
			className="cursor-pointer rounded-md bg-gray-800 px-6 py-1 font-semibold text-white hover:bg-gray-900"
		/>
	);
}

interface Props {
	onSubmit?: (formData: FormData) => void;
	disabled?: boolean | undefined;
}

const initialState: AddMessageState = { state: "ready" };

export default function Add({ onSubmit, disabled }: Props) {
	const formRef = useRef<HTMLFormElement>(null);

	async function action(_state: AddMessageState, formData: FormData): Promise<AddMessageState> {
		onSubmit?.(formData);
		formRef.current?.reset();
		return addMessage(formData);
	}

	const [state, formAction] = useFormState(action, initialState);

	return (
		<form ref={formRef} action={formAction}>
			<label htmlFor="title" className="mb-1 block font-semibold">
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
			<label htmlFor="content" className="mb-1 block font-semibold">
				Content
			</label>
			<textarea
				id="content"
				name="content"
				required
				disabled={disabled}
				className="mb-4 h-24 w-full resize-none rounded-md border bg-gray-50 p-1 shadow-inner"
			/>
			<span className="flex items-center gap-4">
				<SubmitButton disabled={disabled} />
				{state.state === "error" && <p className="text-red-500">{state.error}</p>}
			</span>
		</form>
	);
}
