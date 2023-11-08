import { db } from "../db";
import { Message } from "../schema/message";

export async function add({ title, content }: Omit<Message, "id">): Promise<Message> {
	const [message] = await db.sql<[Message?]>`
		INSERT INTO messages
			(title, content)
		VALUES
			(${title}, ${content})
		RETURNING
			id,
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
				id,
				title,
				content
			FROM
				messages
			ORDER BY
				id DESC
		`,
	);

	return messages;
}

export async function getLatest(): Promise<Message | undefined> {
	const [message] = await db.cached(
		"latest-message",
		db.sql<[Message?]>`
			SELECT
				id,
				title,
				content
			FROM
				messages
			ORDER BY
				id DESC
			LIMIT 1
		`,
	);

	return message;
}
