import sql from "../db";
import { unstable_cache } from "next/cache";
import { Message } from "../schema/message";

export const add = async (fields: Omit<Message, "id">): Promise<Message> => {
	const [message] = await sql<[Message?]>`
		INSERT INTO messages
			(title, content)
		VALUES
			(${fields.title}, ${fields.content})
		RETURNING
			id, title, content
	`;

	if (!message) {
		throw new Error("Failed to add a message");
	}

	return message;
};

export const getAll = unstable_cache(
	async (): Promise<Message[]> => {
		const messages = await sql<Message[]>`
		SELECT
			id, title, content
		FROM messages
	`;

		return messages;
	},
	["all-messages"],
	{
		tags: ["all-messages"],
	},
);
