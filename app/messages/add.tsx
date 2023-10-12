import { addMessage } from "@/actions/messages";
import SubmitButton from "./submit";
import { useRef } from "react";

interface Props {
	onAdd: (formData: FormData) => void;
}

export default function Add({ onAdd }: Props) {
	const form = useRef<HTMLFormElement>(null);

	return (
		<form
			ref={form}
			action={async (formData) => {
				onAdd(formData);
				await addMessage(formData);
				form.current?.reset();
			}}
			className="space-y-4 rounded bg-slate-600 p-4"
		>
			<label>
				Title
				<input
					type="text"
					name="title"
					required
					className="w-full rounded bg-slate-800 p-1 text-white"
				/>
			</label>
			<label>
				Content
				<input
					type="text"
					name="content"
					required
					className="w-full rounded bg-slate-800 p-1 text-white"
				/>
			</label>
			<SubmitButton />
		</form>
	);
}
