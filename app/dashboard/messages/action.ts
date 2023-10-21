"use server";

import { messages } from "@/lib/controller";
import { MessageForm } from "@/lib/schema/message";
import { Logger } from "next-axiom";
import { revalidateTag } from "next/cache";

export interface AddMessageError {
	state: "error";
	error: string;
}

export interface AddMessageSuccess {
	state: "success";
	message: string;
}

export interface AddMessageReady {
	state: "ready";
}

export type AddMessageState = AddMessageSuccess | AddMessageError | AddMessageReady;

export async function addMessage(formData: FormData): Promise<AddMessageState> {
	const logger = new Logger();
	try {
		logger.debug("Adding a new message");

		const newMessage = MessageForm.parse(formData);

		const message = await messages.add(newMessage);
		logger.debug("Message added", { messageId: message.id });

		revalidateTag("all-messages");

		return { state: "success", message: "Your message has been added" };
	} catch (error: unknown) {
		logger.error("Failed to add a new message", error as {});

		return { state: "error", error: "Failed to add your message" };
	} finally {
		void logger.flush();
	}
}
