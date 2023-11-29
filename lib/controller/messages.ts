import { db } from "../db";
import { Message } from "../schema";

export async function add({ title, content }: Omit<Message, "message_id">): Promise<Message> {
	const [message] = await db.sql<[Message?]>`
		INSERT INTO message
			(title, content)
		VALUES
			(${title}, ${content})
		RETURNING
			message_id,
			title,
			content
	`;

	if (!message) {
		throw new Error("Failed to insert message, no message returned.");
	}

	return message;
}

export async function getAll(): Promise<Message[]> {
	const messages = await db.cached(
		"all-messages",
		db.sql<Message[]>`
			SELECT
				message_id,
				title,
				content
			FROM
				message
			ORDER BY
				message_id DESC
		`,
	);

	return messages;
}

export async function getLatest(): Promise<Message | undefined> {
	const [message] = await db.cached(
		"latest-message",
		db.sql<[Message?]>`
			SELECT
				message_id,
				title,
				content
			FROM
				message
			ORDER BY
				message_id DESC
			LIMIT 1
		`,
	);

	return message;
}
