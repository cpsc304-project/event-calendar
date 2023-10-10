import sql from "@/lib/db";
import { revalidatePath } from "next/cache";

async function addMessage(formData: FormData) {
	"use server";

	const title = formData.get("title") as string | null;
	const content = formData.get("content") as string | null;

	if (!title || !content) {
		throw new Error("Missing required fields in addMessage action");
	}

	await sql`
		INSERT INTO messages
			(title, content)
		VALUES
			(${title}, ${content})
	`;

	revalidatePath("/messages");
}

export default function Add() {
	return (
		<form action={addMessage} className="space-y-4 rounded bg-slate-600 p-4">
			<label>
				Title
				<input type="text" name="title" className="w-full rounded bg-slate-800 p-1 text-white" />
			</label>
			<label>
				Content
				<input type="text" name="content" className="w-full rounded bg-slate-800 p-1 text-white" />
			</label>
			<input type="submit" value="Add" className="min-w-8 rounded bg-slate-700 px-8 py-2" />
		</form>
	);
}
