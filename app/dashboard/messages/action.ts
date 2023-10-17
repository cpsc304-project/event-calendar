"use server";

import { messages } from "@/lib/controller";
import { MessageForm } from "@/lib/schema/message";
import { revalidateTag } from "next/cache";

export async function addMessage(formData: FormData) {
	const newMessage = MessageForm.parse(formData);
	await messages.add(newMessage);
	revalidateTag("all-messages");
}
